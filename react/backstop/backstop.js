const path = require('path');

const listDirs = require('./listDirs.js');
const storyBookBackstop = require('./storyBookBackstop');

const processAtoms = (process.argv.indexOf('--atoms') > -1);
const debug = (process.argv.indexOf('--debug') > -1);

// The value of viewports will depend on whether the --atoms switch was set.
let viewports;

// Scan for component names and set up viewports.
const componentsPath = path.resolve(__dirname, '../src/components/');
const dirList = listDirs(componentsPath)
  // Do not test animations.
  .filter((filePath) => (filePath.indexOf('/animations') === -1))
  // Do not test styles.
  .filter((filePath) => (filePath.indexOf('/styles') === -1));
let testComponents = storyBookBackstop.listComponents(dirList);

if (processAtoms) {
  viewports = [{ label: 'small_atom', width: 400, height: 250 }];
  testComponents = testComponents
    // Only test atoms with this backstop configuration.
    .filter(({ filePath }) => (filePath.indexOf('/atoms/') > -1))
    // Skip table and media/Image, they need to be tested with larger viewports.
    .filter(({ filePath }) => ((filePath.indexOf('table') === -1) && (path.basename(filePath) !== 'Image')))
    // Skip icons for now, a new Icon component is in development.
    .filter(({ filePath }) => ((filePath.indexOf('icons') === -1)));
  /* eslint-disable no-console */
  console.log('Running backstop test with --atoms. If this phase fails, the HTML report will show only /atoms/ tests.');
  console.log('If the test images are correct, they should be accepted before re-running backstop.');
  console.log('See documentation in mayflower/react/docs/visual-regression.md');
} else {
  viewports = [
    { label: 'phone', width: 320, height: 480 },
    { label: 'tablet', width: 1024, height: 768 }
  ];
  testComponents = testComponents
    // Only test stories other than atoms when processAtoms is off.
    .filter(({ filePath }) => {
      // Filter out atoms.
      let keep = (filePath.indexOf('/atoms/') === -1);
      // However, keep the atoms/media/Image and atoms/Table stories, they are
      // not tested during the --atoms run due to viewport sizes.
      keep = keep || (filePath.indexOf('/atoms/media/Image') > -1 || filePath.indexOf('/atoms/table') > -1);
      return keep;
    });
}

// Map discovered Component dirs to Backstop scenarios.
let scenarios = storyBookBackstop.mapComponents(testComponents, debug);

if (!processAtoms) {
  // The Error and example Template pages need a delay to allow the background
  // animation to complete.
  scenarios = scenarios.map((item) => {
    const result = item;
    if ((result.label.indexOf('Error') > -1) || (result.label.indexOf('NarrowTemplate') > -1)) {
      result.delay = 5000;
    }
    return result;
  });
}

module.exports = {
  id: 'vrt',
  viewports,
  onReadyScript: 'onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: path.resolve(__dirname, './data/bitmaps_reference'),
    bitmaps_test: path.resolve(__dirname, './data/bitmaps_test'),
    engine_scripts: path.resolve(__dirname, './scripts'),
    html_report: path.resolve(__dirname, './data/html_report'),
    ci_report: path.resolve(__dirname, './data/ci_report')
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
