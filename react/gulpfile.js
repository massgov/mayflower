const {
  src, dest, series, parallel
} = require('gulp');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');

function clean() {
  return del(['dist']);
}

function styles() {
  return src(['./src/components/**/*.scss'])
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
  'MayflowerReactUtilities/(.*)$': './\\1'
};

const sources = [
  'src/**/*.js',
  '!src/**/*.stories.js',
  '!src/**/*.knobs.options.js',
  '!src/**/*.knob.options.js',
  '!src/**/Colors/**',
  '!src/**/storyutils.js'
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
            alias: aliases
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
            modules: false
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
            alias: aliases
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
exports.default = series(clean, parallel(transpileES5, transpileES6, styles, icons));
