const listDirs = require('./listDirs');
const storyBookPaths = require('./storyBookPaths');
const path = require('path');

// Scan for component names.
const components = listDirs(storyBookPaths.scanPath)
  // Component directory names are capitalized.
  .filter((filePath) => (/^[A-Z]/.test(path.basename(filePath))))
  // Only test atoms with this backstop configuration.
  .filter((filePath) => (filePath.indexOf('/atoms/') > -1))
  // Skip table and media/Image, they need to be tested with larger viewports.
  .filter((filePath) => ((filePath.indexOf('table') === -1) && (path.basename(filePath) !== 'Image')));

// Map discovered Component dirs to Backstop scenarios.
const scenarios = storyBookPaths.mapComponents(components);
// The "atoms/media/Image (circular)" story is coded within the Image story.
scenarios.push({
  label: 'atoms/media/Image (circular)',
  url: storyBookPaths.makeStoryUrl('atoms/media', 'Image (circular)')
});

module.exports = {
  id: 'mayflower-react-atoms',
  viewports: [
    {
      label: 'small_atom',
      width: 400,
      height: 250
    }
  ],
  onBeforeScript: 'onBefore.js',
  onReadyScript: 'onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: `${__dirname}/data/bitmaps_reference`,
    bitmaps_test: `${__dirname}/data/bitmaps_test`,
    engine_scripts: `${__dirname}/scripts`,
    html_report: `${__dirname}/data/html_report`,
    ci_report: `${__dirname}/data/ci_report`
  },
  report: ['browser', 'CI'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox']
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
};
