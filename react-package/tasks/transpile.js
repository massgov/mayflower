const { src, dest } = require('gulp');
const babel = require('gulp-babel');

module.exports = {
  esModulesJs: () => {
    return src([
      'src/**/buttons/**/*.js',
      '!src/**/buttons/**/*.stories.js',
      '!src/**/buttons/**/*.knobs.options.js'
    ])
    .pipe(babel({
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true
          }
        ]
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            useBuiltIns: 'usage',
            modules: false,
            corejs: 3,
            targets: {
              browsers: "> 0.25%, not dead"
            }
          }
        ],
        '@babel/preset-react'
      ]
    }))
    .pipe(dest('dist/es'));
  },
  es5Js: () => {
    return src([
      'src/**/buttons/**/*.js'
    ])
    .pipe(babel({
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true
          }
        ]
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              browsers: "> 0.25%, not dead"
            }
          }
        ],
        '@babel/preset-react'
      ]
    }))
    .pipe(dest('dist/lib'));
  }
}
