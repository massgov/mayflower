// packages/icons/gulpfile.js
const { src, dest, series, parallel } = require('gulp');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');
const prepIcons = require('./scripts/prepIcons');

function clean() {
  return del(['dist']);
}

function prepIconsResolve() {
  return new Promise((resolve) => {
    prepIcons('./static/icons');
    resolve();
  });
}

function copyStaticIcons() {
  return src('./static/icons/**/*')
    .pipe(dest('./dist/icons'));
}

const build = series(
  clean,
  prepIconsResolve,
  parallel(copyStaticIcons)
);

exports.clean = clean;
exports.prepIcons = prepIconsResolve;
exports.copyStaticIcons = copyStaticIcons;
exports.build = build;
exports.default = build;