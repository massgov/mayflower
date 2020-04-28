const { src, dest, series } = require('gulp');
const del = require('del');

const clean = () => {
  return del(['./dist/*'], { force: true });
};

const moveFonts = () => {
  return src(['./src/fonts/**'])
  .pipe(dest('./dist/fonts'));
};

const moveImages = () => src(['./src/images/**'])
.pipe(dest('./dist/images'));

const moveScss = () => src(['./src/scss/**/*.scss'])
.pipe(dest('./dist/scss'));

exports.default = series(clean, moveFonts, moveImages, moveScss);

