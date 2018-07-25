const listDirs = require('./listDirs');
const storyBookPaths = require('./storyBookPaths');
const path = require('path');

// Scan for component names.
const components = listDirs(storyBookPaths.scanPath)
  // Component directory names are capitalized.
  .filter((filePath) => (/^[A-Z]/.test(path.basename(filePath))))
  // Only test stories other than atoms with this backstop configuration.
  .filter((filePath) => (filePath.indexOf('/atoms/') === -1));
  // .filter((filePath) => (filePath.indexOf('molecules/HeaderSearch') > -1));

// Map discovered Component dirs to Backstop scenarios.
let scenarios = storyBookPaths.mapComponents(components);

// Add the "atoms/media/Image" story and atoms/Table story, they are not tested
// with backstop.atoms.js.
scenarios.push({
  label: 'atoms/media/Image',
  url: storyBookPaths.makeStoryUrl('atoms/media', 'Image')
});
scenarios.push({
  label: 'atoms/table/Table',
  url: storyBookPaths.makeStoryUrl('atoms/table', 'Table')
});

// Error and example Template pages need a delay to allow the background
// animation to complete.
scenarios = scenarios.map((item) => {
  const result = item;
  const { label } = result;
  if ((label.indexOf('Error') > -1) || (label.indexOf('NarrowTemplate'))) {
    result.delay = 5000;
  }
  return result;
});

module.exports = {
  id: 'mayflower-react',
  viewports: [
    {
      label: 'phone',
      width: 320,
      height: 480
    },
    {
      label: 'tablet',
      width: 1024,
      height: 768
    }
  ],
  // onBeforeScript: 'puppet/onBefore.js',
  // onReadyScript: 'puppet/onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: `${__dirname}/data/bitmaps_reference`,
    bitmaps_test: `${__dirname}/data/bitmaps_test`,
    engine_scripts: `${__dirname}/engine_scripts`,
    html_report: `${__dirname}/data/html_report`,
    ci_report: `${__dirname}/data/ci_report`
  },
  report: ['browser', 'CI'],
  engine: 'chrome',
  engineOptions: {
    args: ['--no-sandbox'],
    chromeFlags: ['--force-device-scale-factor=1']
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
};
