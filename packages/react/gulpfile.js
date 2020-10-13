const {
  src, dest, series, parallel
} = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');
const run = require('gulp-run-command').default;
function clean() {
  return del(['dist']);
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

function icons() {
  return src(['./src/components/base/Icon/assets/*.svg'])
    .pipe(dest('dist/Icon/assets'));
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

async function generateIcons() {
  return run('svgr --out-dir ./dist/Icon ./src/components/base/Icon/assets --config-file=./.svgrrc.js')()
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
};

const sources = [
  'src/**/*.js',
  '!src/**/*.stories.js',
  '!src/**/*.knobs.options.js',
  '!src/**/*.knob.options.js',
  '!src/**/Colors/**',
  '!src/**/Icon/**'
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
      // ES Modules need to list out the extension on the end of the path,
      // otherwise index.js will be used instead of index.mjs.
      if (opts.hasOwnProperty('isES5') && opts.isES5 === false) {
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
          'Breadcrumb/item',
          'GenTeaser/utils',
          'Base/Icon/',
        ];
        // If the current path is a file and not a directory...
        if (excludes.some((rule) => sourcePath.includes(rule))) {
          // Add the .mjs extension.
          resolvedPath = `${resolvedPath}.mjs`;
        } else {
          // Else, add the path to the index.mjs file the ES module needs.
          resolvedPath = `${resolvedPath}/index.mjs`;
        }
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

exports.cleanIconDir = cleanIconDir;
exports.generateIcons = generateIcons;
exports.transpileES5Icons = transpileES5Icons;
exports.transpileES6Icons = transpileES6Icons;
exports.default = series(clean, parallel(transpileES5, transpileES6, styles, series(generateIcons, transpileES5Icons, transpileES6Icons)));
