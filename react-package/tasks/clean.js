// Include Our Plugins
const del = require('del');

// Export our tasks.
module.exports = {
  // Clean CSS files.
  // cleanCSS: function() {
  //   return del(['./dist/css/*'], { force: true });
  // },

  // Clean JS files.
  cleanJS: function() {
    return del(['./dist/es/*', './dist/lib/*'], { force: true });
  },

  // Clean HTML files.
  // cleanHTML: function() {
  //   return del(['./dist/html/*'], { force: true });
  // },
};
