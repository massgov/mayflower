
var walk = require('./walk-dir');
var path = require('path');

var patternPath = `${__dirname}/../styleguide/public/patterns/`;

/**
 * Scan for page and template patterns.
 */
var files = walk(patternPath)
    .filter(function(f) {
        // Only *.html
        return f.match(/\.html$/)
            // Not index.html/markup-only.html
            && !f.match(/(\/index|markup-only)\.html$/)
            // Only templates and pages.
            && f.match(/\/(04-templates|05-pages)/)
            // Not the readme (has version #)
            && !f.match(/05-pages-readme2.html$/)
    });

/**
 * Map discovered HTML files to Backstop scenarios.
 */
var scenarios = files.map(function(file) {
    return {
        label: path.basename(file, '.html').replace('05-pages-', 'page-').replace('04-templates-', 'template-').replace('-', ' '),
        url: `http://web/patterns/${path.relative(patternPath, file)}`,
        misMatchThreshold: 0.05
    }
});



module.exports = {
  "id": "regression",
  "viewports": [
    {
      "label": "phone",
      "width": 320,
      "height": 480
    },
    {
      "label": "tablet",
      "width": 1024,
      "height": 768
    }
  ],
  "engineOptions": {
    "waitTimeout": "10000",
    "chromeFlags": ['--force-device-scale-factor=1']
  },
  "onBeforeScript": "onBefore.js",
  "onReadyScript": "onReady.js",
  "scenarios": scenarios,
  "paths": {
    "bitmaps_reference": `${__dirname}/reference`,
    "bitmaps_test": `${__dirname}/runs`,
    "engine_scripts": `${__dirname}/scripts`,
    "html_report": `${__dirname}/reports/html`,
    "ci_report": `${__dirname}/reports/ci`,
  },
  "report": ["browser", "CI"],
  "engine": "chrome",
  "engineFlags": [],
  "asyncCaptureLimit": 3,
  "asyncCompareLimit": 10,
  "debug": false,
  "debugWindow": false
}
