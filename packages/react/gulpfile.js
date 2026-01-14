const {
  src, dest, series, parallel
} = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');
const run = require('gulp-run-command').default;
const ts = require('gulp-typescript');
const replace = require('gulp-replace');
const { prependText } = require('gulp-append-prepend');
const { exec } = require('child_process');
const fs = require('fs');

function clean() {
  return del(['dist', 'types']);
}

function styles() {
  return src(['./src/components/**/*.scss', '!src/components/**/Icon/**'])
    .pipe(rename((p) => {
      const splitPath = p.dirname.split('/');
      // eslint-disable-next-line no-param-reassign
      p.dirname = splitPath[splitPath.length - 1];
    }))
    .pipe(dest('dist'));
}

function ensureAssetsDir(cb) {
  const assetsDir = './src/components/base/Icon/assets';
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }
  cb();
}

function copyIconsFromAssets() {
  return src(['./node_modules/@massds/mayflower-assets/static/images/icons/**/*.svg'], { base: './node_modules/@massds/mayflower-assets/static/images/icons' })
    .pipe(rename((path) => {
      // Handle bold icons differently
      if (path.dirname === 'bold') {
        // For bold icons, keep the --bold suffix and put in bold subdirectory
        path.dirname = 'bold';
        path.basename = `icon-${path.basename}`;
      } else {
        // For regular icons, add "icon-" prefix and put in root
        path.dirname = '';
        path.basename = `icon-${path.basename}`;
      }
    }))
    .pipe(dest('./src/components/base/Icon/assets'));
}

function generateIconKnobOptions() {
  const fs = require('fs');
  const path = require('path');
  
  const assetsDir = './src/components/base/Icon/assets';
  const outputFile = './src/components/base/Icon/Icon.knob.options.js';
  
  // Read all SVG files from assets directory
  if (!fs.existsSync(assetsDir)) {
    console.warn('Assets directory does not exist:', assetsDir);
    return Promise.resolve();
  }
  
  const svgFiles = fs.readdirSync(assetsDir)
    .filter(file => file.endsWith('.svg') && !file.includes('--bold')) // Only regular icons
    .map(file => {
      // Remove 'icon-' prefix and '.svg' extension
      let iconName = path.basename(file, '.svg');
      if (iconName.startsWith('icon-')) {
        iconName = iconName.substring(5);
      }
      // Convert kebab-case to PascalCase
      const pascalCaseName = iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
    
      return pascalCaseName;
    })
    .sort(); // Sort alphabetically
  
  // Generate the assets object
  const assetsEntries = svgFiles.map(iconName => `  ${iconName}: '${iconName}'`);
  
  // Generate the file content
  const fileContent = `export const assets = {
${assetsEntries.join(',\n')}
};

export const svgOptions = {
  choose: '',
  ...assets
};

// For Storybook controls
export const boldOptions = {
  'Bold (default)': true,
  'Regular': false
};
`;
  
  // Write the file
  fs.writeFileSync(outputFile, fileContent);
  console.log(`Generated ${outputFile} with ${svgFiles.length} icons`);
  
  return Promise.resolve();
}

function transpileES5Icons() {
  return src('./dist/Icon/*.mjs')
    .pipe(rename((p) => {
      const splitPath = p.dirname.split('/');
      // eslint-disable-next-line no-param-reassign
      p.dirname = splitPath[splitPath.length - 1];
    }))
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: 'commonjs'
          }
        ],
        [
          '@babel/preset-react',
          {
            development: false
          }
        ],
        [
          'babel-preset-proposals',
          {
            loose: true,
            decorators: true,
            classProperties: true,
            exportDefaultFrom: true,
            exportNamespaceFrom: true,
            absolutePaths: true
          }
        ]
      ],
      plugins: [
        [
          'module-resolver',
          {
            resolvePath,
            alias: aliases,
            isES5: true
          }
        ],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'wrap'
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            useESModules: false,
            helpers: false
          }
        ],
        'babel-plugin-add-module-exports'
      ]
    }))
    .pipe(dest('dist/Icon'));
}

function transpileES6Icons() {
  return src('./dist/Icon/*.mjs', '!./dist/Icon/index.mjs')
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
            exclude: [
              'transform-block-scoping',
              'transform-arrow-functions',
              'transform-function-name'
            ]
          }
        ],
        [
          '@babel/preset-react',
          {
            development: false,
          }
        ],
      ],
      plugins: [
        [
          'module-resolver',
          {
            resolvePath,
            alias: aliases,
            isES5: false
          }
        ],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'wrap'
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            useESModules: true,
            helpers: false
          }
        ]
      ]
    }))
    .pipe(rename((p) => {
      const splitPath = p.dirname.split('/');
      // eslint-disable-next-line no-param-reassign
      p.dirname = splitPath[splitPath.length - 1];
      // eslint-disable-next-line no-param-reassign
      p.extname = '.mjs';
    }))
    .pipe(dest('dist/Icon'));
}


async function buildDualVariantIcons() {
  const fs = require('fs');
  const path = require('path');
  
  const iconsDir = './src/components/base/Icon/assets';
  const srcOutputDir = './src/components/base/Icon';
  const distOutputDir = './dist/Icon';
  
  // Ensure dist directory exists
  if (!fs.existsSync(distOutputDir)) {
    fs.mkdirSync(distOutputDir, { recursive: true });
  }
  
  // Get all regular icons (ignore bold variants in main directory)
  const regularIcons = fs.readdirSync(iconsDir)
    .filter(file => file.endsWith('.svg') && !file.includes('--bold'))
    .map(file => path.basename(file, '.svg').replace(/^icon-/, ''));
  
  regularIcons.forEach(iconName => {
    const pascalName = iconName.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const componentName = `Icon${pascalName}`;
    const regularPath = path.join(iconsDir, `icon-${iconName}.svg`);
    const boldPath = path.join(iconsDir, 'bold', `icon-${iconName}--bold.svg`);
    
    // Read regular SVG
    const regularSvg = fs.readFileSync(regularPath, 'utf8');
    
    // Read bold SVG if it exists, otherwise use regular as fallback
    let boldSvg = regularSvg;
    if (fs.existsSync(boldPath)) {
      boldSvg = fs.readFileSync(boldPath, 'utf8');
    }
    
    // Clean SVG for JSX
    const cleanSvgForJsx = (svgString) => {
      return svgString.trim()
        .replace(/<svg([^>]*)>/, '<svg$1 {...props}>')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin');
    };
    
    const cleanRegularSvg = cleanSvgForJsx(regularSvg);
    const cleanBoldSvg = cleanSvgForJsx(boldSvg);
    
    // Generate component code
    const componentCode = `import React from 'react';
    import PropTypes from 'prop-types';

    const ${componentName} = (props) => {
      const { 
        bold = true, 
        width = "24px", 
        height = "24px", 
        ...restProps 
      } = props;
      
      if (bold) {
        return (
          ${cleanBoldSvg.replace('{...props}', 'width = {width} height={height} {...restProps}')}
        );
      }
      
      return (
        ${cleanRegularSvg.replace('{...props}', 'width = {width} height={height} {...restProps}')}
      );
    };

    ${componentName}.propTypes = {
      bold: PropTypes.bool,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      className: PropTypes.string,
      fill: PropTypes.string,
      'aria-hidden': PropTypes.bool,
      'aria-label': PropTypes.string,
    };

    export default ${componentName};
    `;

    // Write to src/
    fs.writeFileSync(path.join(srcOutputDir, `${componentName}.js`), componentCode);
    
    // Write to dist/ (with .mjs extension)
    const distCode = componentCode.replace('export default', `export { ${componentName} as default };`);
    fs.writeFileSync(path.join(distOutputDir, `${componentName}.mjs`), distCode);
    
    const variantInfo = fs.existsSync(boldPath) ? 'bold + regular' : 'regular only';
    console.log(`Generated ${componentName} with ${variantInfo} variants`);
  });
  
  return Promise.resolve();
}

const aliases = {
  'MayflowerReactGenTeaser/(.*)$': './\\1',
  'MayflowerReactComponents/(.*)$': './\\1',
  'MayflowerReactAtoms/(.*)$': './\\1',
  'MayflowerReactAnimations/(.*)$': './\\1',
  'MayflowerReactButtons/(.*)$': './\\1',
  'MayflowerReactContact/(.*)$': './\\1',
  'MayflowerReactDivider/(.*)$': './\\1',
  'MayflowerReactHeadings/(.*)$': './\\1',
  'MayflowerReactLinks/(.*)$': './\\1',
  'MayflowerReactLists/(.*)$': './\\1',
  'MayflowerReactMedia/(.*)$': './\\1',
  'MayflowerReactPlaceholder/(.*)$': './\\1',
  'MayflowerReactTable/(.*)$': './\\1',
  'MayflowerReactText/(.*)$': './\\1',
  'MayflowerReactBase/(.*)$': './\\1',
  'MayflowerReactDataviz/(.*)$': './\\1',
  'MayflowerReactForms/(.*)$': './\\1',
  'MayflowerReactMolecules/(.*)$': './\\1',
  'MayflowerReactOrganisms/(.*)$': './\\1',
  'MayflowerReactPages/(.*)$': './\\1',
  'MayflowerReactTemplates/(.*)$': './\\1',
  'MayflowerReactUtilities/(.*)$': './\\1',
  'MayflowerReactHooks/(.*)$': './\\1'
};

const sources = [
  'src/**/*.js',
  'src/**/utility-items.js',
  'src/**/main-nav.js',
  '!src/**/*.stories.js',
  '!src/**/*.knobs.options.js',
  '!src/**/*.knob.options.js',
  '!src/**/Colors/**',
  '!src/**/Icon/**',
  '!src/**/main-nav.data.js'
];

function resolvePath(sourcePath, currentFile, opts) {
  const entryPoint = path.resolve(__dirname, './src/index.js');
  const rootPath = currentFile === entryPoint ? './' : '../';
  let resolvedPath = null;
  Object.keys(opts.alias).forEach((alias) => {
    const check = new RegExp(alias);
    if (check.test(sourcePath)) {
      const matches = check.exec(sourcePath);
      resolvedPath = `${rootPath}${matches[1]}`;
      const ext = (opts.hasOwnProperty('isES5') && opts.isES5 === true) ? 'js' : 'mjs';
      // List of exports that are files and not directories.
      const excludes = [
        'Input/error',
        'Input/context',
        'Input/utility',
        'Input/validate',
        'TabContainer/tab',
        'TabContainer/tab-body',
        'TabContainer/context',
        'utilities/componentPropTypeCheck',
        'utilities/getFallbackComponent',
        'utilities/focusTrapping',
        'Breadcrumb/item',
        'GenTeaser/utils',
        'Base/Icon/',
        'HamburgerNav/hooks',
        'HeaderNav/hooks',
        'Header/utility-items',
        'HeaderNav/main-nav',
        'hooks/use-script',
        'hooks/use-event-listener',
        'hooks/use-window-width'
      ];
      // If the current path is a file and not a directory...
      if (excludes.some((rule) => sourcePath.includes(rule))) {
        // Add the extension.
        resolvedPath = `${resolvedPath}.${ext}`;
      } else {
        // Else, add the path to the index file.
        resolvedPath = `${resolvedPath}/index.${ext}`;
      }
    }
  });
  return resolvedPath || sourcePath;
}

function transpileES5() {
  return src(sources)
    .pipe(rename((p) => {
      const splitPath = p.dirname.split('/');
      // eslint-disable-next-line no-param-reassign
      p.dirname = splitPath[splitPath.length - 1];
    }))
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: 'commonjs'
          }
        ],
        [
          '@babel/preset-react',
          {
            development: false
          }
        ],
        [
          'babel-preset-proposals',
          {
            loose: true,
            decorators: true,
            classProperties: true,
            exportDefaultFrom: true,
            exportNamespaceFrom: true,
            absolutePaths: true
          }
        ]
      ],
      plugins: [
        [
          'module-resolver',
          {
            resolvePath,
            alias: aliases,
            isES5: true
          }
        ],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'wrap'
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            useESModules: false,
            helpers: false
          }
        ],
        'babel-plugin-add-module-exports'
      ]
    }))
    .pipe(dest('dist'));
}
function transpileES6() {
  return src(sources)
    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            modules: false,
            exclude: [
              'transform-block-scoping',
              'transform-arrow-functions',
              'transform-function-name'
            ]
          }
        ],
        [
          '@babel/preset-react',
          {
            development: false
          }
        ],
        [
          'babel-preset-proposals',
          {
            loose: true,
            decorators: true,
            classProperties: true,
            exportDefaultFrom: true,
            exportNamespaceFrom: true,
            absolutePaths: true
          }
        ]
      ],
      plugins: [
        [
          'module-resolver',
          {
            resolvePath,
            alias: aliases,
            isES5: false
          }
        ],
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        [
          'babel-plugin-transform-react-remove-prop-types',
          {
            mode: 'wrap'
          }
        ],
        [
          '@babel/plugin-transform-runtime',
          {
            absoluteRuntime: false,
            useESModules: true,
            helpers: false
          }
        ]
      ]
    }))
    .pipe(rename((p) => {
      const splitPath = p.dirname.split('/');
      // eslint-disable-next-line no-param-reassign
      p.dirname = splitPath[splitPath.length - 1];
      // eslint-disable-next-line no-param-reassign
      p.extname = '.mjs';
    }))
    .pipe(dest('dist'));
}

function cleanIconDir() {
  return del([
    'src/components/base/Icon/*',
    '!src/components/base/Icon/assets',
    '!src/components/base/Icon/IconDisplay.js',
    '!src/components/base/Icon/Icon.stories.js',
    '!src/components/base/Icon/Icon.knob.options.js',
    '!src/components/base/Icon/_icon-display.scss'
  ]);
}

function cleanIconAssets() {
  return del(['./src/components/base/Icon/assets/*.svg']);
}

function cleanTsIconAssets() {
  return del(['types/components/base/Icon/*.tsx']);
}

const typedSources = [
  ...sources,

  // @todo This file probably requires a separate transformation using JSCodeShift.
  '!src/index.js',
];

const tsIcons = [
  "types/components/base/Icon/*.tsx"
];

const tsDeclarationSources = [
  'types/**/*.tsx',
];

function buildDualVariantTsIcons() {
  const fs = require('fs');
  const path = require('path');
  
  const iconsDir = './src/components/base/Icon/assets';
  const tsOutputDir = './types/components/base/Icon';
  
  // Ensure TypeScript directory exists
  if (!fs.existsSync(tsOutputDir)) {
    fs.mkdirSync(tsOutputDir, { recursive: true });
  }
  
  // Get all regular icons (ignore bold variants in main directory)
  const regularIcons = fs.readdirSync(iconsDir)
    .filter(file => file.endsWith('.svg') && !file.includes('--bold'))
    .map(file => path.basename(file, '.svg').replace(/^icon-/, ''));
  
  regularIcons.forEach(iconName => {
    const pascalName = iconName.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    const componentName = `Icon${pascalName}`;
    const regularPath = path.join(iconsDir, `icon-${iconName}.svg`);
    const boldPath = path.join(iconsDir, 'bold', `icon-${iconName}--bold.svg`);
    
    // Read regular SVG
    const regularSvg = fs.readFileSync(regularPath, 'utf8');
    
    // Read bold SVG if it exists, otherwise use regular as fallback
    let boldSvg = regularSvg;
    if (fs.existsSync(boldPath)) {
      boldSvg = fs.readFileSync(boldPath, 'utf8');
    }
    
    // Clean SVG for JSX (same as JS version)
    const cleanSvgForJsx = (svgString) => {
      return svgString.trim()
        .replace(/<svg([^>]*)>/, '<svg$1 {...props}>')
        .replace(/fill-rule/g, 'fillRule')
        .replace(/clip-rule/g, 'clipRule')
        .replace(/stroke-width/g, 'strokeWidth')
        .replace(/stroke-linecap/g, 'strokeLinecap')
        .replace(/stroke-linejoin/g, 'strokeLinejoin');
    };
    
    const cleanRegularSvg = cleanSvgForJsx(regularSvg);
    const cleanBoldSvg = cleanSvgForJsx(boldSvg);
    
    // Generate TypeScript component code
    const tsComponentCode = `// @ts-nocheck
    import React from 'react';

    export interface ${componentName}Props {
      bold?: boolean;
      width?: string | number;
      height?: string | number;
      className?: string;
      fill?: string;
      'aria-hidden'?: boolean;
      'aria-label'?: string;
      [key: string]: any;
    }

    const ${componentName}: React.FC<${componentName}Props> = (props) => {
      const { 
        bold = true, 
        width = "24px", 
        height = "24px", 
        ...restProps 
      } = props;
      
      if (bold) {
        return (
          ${cleanBoldSvg.replace('{...props}', 'width={width} height={height} {...restProps}')}
        );
      }
      
      return (
        ${cleanRegularSvg.replace('{...props}', 'width={width} height={height} {...restProps}')}
      );
    };

    export default ${componentName};
    `;

        // Write TypeScript file
        fs.writeFileSync(path.join(tsOutputDir, `${componentName}.tsx`), tsComponentCode);
        
        console.log(`Generated TypeScript ${componentName} with dual variants`);
      });
      
      return Promise.resolve();
    }

function ignoreTsCheckOnIcons() {
  return src(tsIcons, {base: 'types'})
    .pipe(prependText('// @ts-nocheck'))
    .pipe(dest('types'))
}

function createTsCopy() {
  return src(typedSources)
    .pipe(rename((p) => {
      // eslint-disable-next-line no-param-reassign
      p.extname = '.tsx'
    }))
    .pipe(prependText('// @ts-nocheck'))
    .pipe(dest('types'))
}

function convertPropTypesToTs(cb) {
  // We have to use `exec` here in order to use the transformation file written in TS.
  exec(`./node_modules/.bin/jscodeshift -t "scripts/transform.ts" --extensions=tsx --fail-on-error "types"`, (error, stdout, stderr) => {
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }

    cb(error);
  });
}

function convertTsToDeclarations() {
  const tsProject = ts.createProject('tsconfig.json')
  return src(tsDeclarationSources)
    .pipe(rename((p) => {
      const splitPath = p.dirname.split('/');
      // eslint-disable-next-line no-param-reassign
      p.dirname = splitPath[splitPath.length - 1];
    }))
    .pipe(tsProject())
    .dts
    .pipe(
      // @todo Is there a better way to do it? Some TS compiler options maybe?
      replace(/(\s+from\s+['"])(Mayflower[a-z]+)\//ig, '$1../')
    )
    .pipe(dest('dist'))
}

const generateTsDeclarations = series(
  parallel(
    series(
      buildDualVariantTsIcons,
      ignoreTsCheckOnIcons,
    ),
    series(
      createTsCopy,
      convertPropTypesToTs,
    )
  ),
  convertTsToDeclarations,
)



exports.icons = series(
  ensureAssetsDir,
  cleanIconAssets,
  cleanTsIconAssets,
  copyIconsFromAssets,
  buildDualVariantIcons,
  generateIconKnobOptions,
  transpileES5Icons,
  transpileES6Icons
);
exports.generateTsDeclarations = generateTsDeclarations;
exports.default = series(
  clean,
  parallel(
    transpileES5,
    transpileES6,
    generateTsDeclarations,
    styles,
    series(
      ensureAssetsDir,
      cleanIconAssets,
      copyIconsFromAssets,
      buildDualVariantIcons,
      generateIconKnobOptions,
      transpileES5Icons,
      transpileES6Icons
    )
  )
);
