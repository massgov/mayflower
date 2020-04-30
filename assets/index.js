var path = require("path");

module.exports = {
  includePaths: [
    path.join(__dirname, 'scss'),
    path.join(__dirname, 'scss/00-base'),
    path.join(__dirname, 'scss/00-base/mixins'),
    path.join(__dirname, 'scss/01-atoms'),
    path.join(__dirname, 'scss/03-organisms'),
    path.join(__dirname, 'scss/04-templates'),
    path.join(__dirname, 'scss/05-dataviz'),
    path.join(__dirname, 'scss/08-print'),
  ]
};
