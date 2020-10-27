const {
  src, dest, series, parallel
} = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');

sass.compiler = require('sass');

function clean() {
  return del(['css']);
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


exports.compileMiniScss = compileMiniScss;
exports.compileScss = compileScss;
exports.clean = clean;
exports.build = series(clean, parallel(compileMiniScss, compileScss));

exports.default = series(clean, parallel(compileMiniScss, compileScss));