const {
  src, dest, series, parallel, watch
} = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const del = require('del');
const path = require('path');

sass.compiler = require('sass');

function clean() {
  return del(['css']);
}

function cleanJS() {
  return del(['js']);
}

function compileScss() {
  return src('./build/*.scss')
  .pipe(sass({
    includePaths: [
      path.join(__dirname, 'scss'),
      path.join(__dirname, 'scss/00-base'),
      path.join(__dirname, 'scss/00-base/mixins'),
      path.join(__dirname, 'scss/01-atoms'),
      path.join(__dirname, 'scss/03-organisms'),
      path.join(__dirname, 'scss/04-templates'),
      path.join(__dirname, 'scss/05-dataviz'),
      path.join(__dirname, 'scss/08-print'),
      'node_modules',
    ],
  }))
  .pipe(dest('./css'));
};

function compileMiniScss() {
  return src('./build/*.scss')
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [
      path.join(__dirname, 'scss'),
      path.join(__dirname, 'scss/00-base'),
      path.join(__dirname, 'scss/00-base/mixins'),
      path.join(__dirname, 'scss/01-atoms'),
      path.join(__dirname, 'scss/03-organisms'),
      path.join(__dirname, 'scss/04-templates'),
      path.join(__dirname, 'scss/05-dataviz'),
      path.join(__dirname, 'scss/08-print'),
      'node_modules',
    ],
  }))
  .pipe(rename(function(assetPath) {
    assetPath.basename = `${assetPath.basename}.min`;
    return assetPath;
  }))
  .pipe(dest('./css'));
};

function watchScss() {
  return watch(['./build/*.scss'], {ignoreInitial: false}, parallel(compileMiniScss, compileScss));
}

function compileHamburgerHeader() {
  return src([
    './build-js/header-hamburger-vendor.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavHamburger.js',
    '../patternlab/styleguide/source/assets/js/modules/mobileNav.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('header-hamburger.js'))
    .pipe(terser())
    .pipe(dest('./js'));
}

function compileMixedHeader() {
  return src([
    './build-js/header-hamburger-vendor.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNav.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavMixed.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavHamburger.js',
    '../patternlab/styleguide/source/assets/js/modules/mobileNav.js',
  ])
  .pipe(concat('header-mixed.js'))

    .pipe(babel({
      presets: [
        [
          '@babel/preset-env',
          { debug: true }
        ]
      ]
    }))
    //.pipe(terser())
    .pipe(dest('./js'));
}
exports.compileMixedHeader = compileMixedHeader;
exports.compileHeader = series(cleanJS, parallel(compileMixedHeader, compileHamburgerHeader));
exports.compileMiniScss = compileMiniScss;
exports.compileScss = compileScss;
exports.clean = clean;

exports.watch = series(clean, watchScss);

exports.build = series(clean, parallel(compileMiniScss, compileScss));

exports.default = series(clean, parallel(compileMiniScss, compileScss));