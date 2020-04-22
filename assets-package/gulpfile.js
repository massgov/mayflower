const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const magicImporter = require('node-sass-magic-importer');
const flatmap = require('gulp-flatmap');

sass.compiler = require('sass');

const compileSass = () => {
  return src([
    './src/scss/01-atoms/*.scss',
    './src/scss/02-molecules/*.scss',
    '!./src/scss/index.scss'
  ])
  .pipe(rename(function(path) {
    path.basename = path.basename.replace('_', '');
    return path;
  }))
  .pipe(flatmap((stream, file) => {
    return stream
    
    .pipe(sass({
      includePaths: [
        'src',
        'node_modules'
      ],
      importer: magicImporter()
    }).on('error', sass.logError))
    .on('error', (err) => console.log(err))
  }))
  .pipe(dest('./dist/css'));

};

const moveFonts = () => {
  return src(['./src/fonts/**'])
  .pipe(dest('./dist/fonts'));
};

const moveImages = () => src(['./src/images/**'])
.pipe(dest('./dist/images'));

const moveScss = () => src(['./src/scss/**/*.scss'])
.pipe(dest('./dist/scss'));

exports.default = series(compileSass, moveFonts, moveImages, moveScss);

