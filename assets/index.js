var path = require("path");

module.exports = {
  includePaths: [
    path.join(__dirname, 'dist'),
    path.join(__dirname, 'dist/scss'),
    path.join(__dirname, 'dist/scss/00-base'),
    path.join(__dirname, 'dist/scss/00-base/mixins'),
    path.join(__dirname, 'dist/scss/01-atoms'),
    path.join(__dirname, 'dist/scss/03-organisms'),
    path.join(__dirname, 'dist/scss/04-templates'),
    path.join(__dirname, 'dist/scss/05-dataviz'),
    path.join(__dirname, 'dist/scss/08-print'),
  ]
};
