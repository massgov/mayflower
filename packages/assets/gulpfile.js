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

function deleteMainNav() {
  return del(['js/mainNav.js']);
}

function compileScss() {
  return src('./build/scss/*.scss')
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
  return src('./build/scss/*.scss')
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
  return watch(['./build/scss/*.scss'], {ignoreInitial: false}, parallel(compileMiniScss, compileScss));
}

function compileHamburgerHeader() {
  return src([
    './build/js/header-hamburger-vendor.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavHamburger.js',
    '../patternlab/styleguide/source/assets/js/modules/mobileNav.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('header-hamburger.js'))
    .pipe(dest('./js'));
}

function compileMiniHamburgerHeader() {
  return src([
    './build/js/header-hamburger-vendor.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavHamburger.js',
    '../patternlab/styleguide/source/assets/js/modules/mobileNav.js'
  ])
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('header-hamburger.min.js'))
    .pipe(terser())
    .pipe(dest('./js'));
}

function compileMainNav() {
  return src([
    '../patternlab/styleguide/source/assets/js/modules/mainNav.js'
  ])
  .pipe(babel({
    plugins: [
      'babel-plugin-rewire-exports',
      'babel-plugin-remove-import-export'
    ]
  }))
  .pipe(dest('./js'))
}

function compileHeader() {
  return src([
    require.resolve('jquery/dist/jquery.min.js'),
    './build/js/header-hamburger-vendor.js',
    './js/mainNav.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavMixed.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavHamburger.js',
    '../patternlab/styleguide/source/assets/js/modules/mobileNav.js',
  ])
  .pipe(concat('header.js'))
  .pipe(babel({
    presets: [
      '@babel/preset-env',
    ]
  }))
  .pipe(dest('./js'));
}

function compileMiniHeader() {
  return src([
    require.resolve('jquery/dist/jquery.min.js'),
    './build/js/header-hamburger-vendor.js',
    './js/mainNav.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavMixed.js',
    '../patternlab/styleguide/source/assets/js/modules/mainNavHamburger.js',
    '../patternlab/styleguide/source/assets/js/modules/mobileNav.js',
  ])
  .pipe(concat('header.min.js'))
  .pipe(babel({
    presets: [
      '@babel/preset-env',
    ]
  }))
  .pipe(terser())
  .pipe(dest('./js'));
}


function compileBrandBanner() {
  return src([
    '../patternlab/styleguide/source/assets/js/modules/brandBanner.js'
  ])
  .pipe(concat('brand-banner.js'))
  .pipe(babel({
    plugins: [
      'babel-plugin-rewire-exports',
      'babel-plugin-remove-import-export'
    ]
  }))
  .pipe(dest('./js'))
}

function compileMiniBrandBanner() {
  return src([
    '../patternlab/styleguide/source/assets/js/modules/brandBanner.js'
  ])
  .pipe(concat('brand-banner.min.js'))
  .pipe(babel({
    plugins: [
      'babel-plugin-rewire-exports',
      'babel-plugin-remove-import-export'
    ]
  }))
  .pipe(terser())
  .pipe(dest('./js'))
}

exports.deleteMainNav = deleteMainNav;
exports.compileMainNav = compileMainNav;
exports.compileMiniScss = compileMiniScss;
exports.compileScss = compileScss;
exports.clean = clean;
exports.compileBrandBanner = compileBrandBanner;
exports.compileMiniBrandBanner = compileMiniBrandBanner;

const transpileHeader = series(compileMainNav, parallel(compileHeader, compileMiniHeader), deleteMainNav);
const transpileHamburgerHeader = parallel(compileHamburgerHeader, compileMiniHamburgerHeader);
const transpileBrandBanner = parallel(compileBrandBanner, compileMiniBrandBanner);
const compileHeaderJS = series(transpileHamburgerHeader, transpileHeader);
const build = series(parallel(clean, cleanJS), parallel(compileMiniScss, compileScss), compileHeaderJS, transpileBrandBanner);

exports.transpileHamburgerHeader = transpileHamburgerHeader;

exports.compileHeaderJS = compileHeaderJS;

exports.watch = series(clean, watchScss);

exports.build = build;

exports.default = build;
