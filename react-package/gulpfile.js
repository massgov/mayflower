const { parallel, series } = require('gulp');

const { esModulesJs, es5Js } = require('./tasks/transpile');
const { cleanJS } = require('./tasks/clean');

exports.build = series(
  parallel(cleanJS),
  parallel(esModulesJs, es5Js)
);

exports.default = series(
  parallel(cleanJS),
  parallel(esModulesJs, es5Js)
);