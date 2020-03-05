const path = require('path');

const listDirs = require('./listDirs.js');
const storyBookBackstop = require('./storyBookBackstop');

const debug = (process.argv.indexOf('--debug') > -1);

// Default viewport values.
const viewports = [
  { label: 'small_atom', width: 400, height: 250 },
  { label: 'phone', width: 320, height: 480 },
  { label: 'tablet', width: 1024, height: 768 }
];

// Scan for component names and set up viewports.
const componentsPath = path.resolve(__dirname, '../src/components/');
const dirList = listDirs(componentsPath)
  // Do not test animations.
  .filter((filePath) => (filePath.indexOf('/animations') === -1))
  // Do not test styles.
  .filter((filePath) => (filePath.indexOf('/styles') === -1));
const testComponents = storyBookBackstop.listComponents(dirList);

// Map discovered Component dirs to Backstop scenarios.
const scenarios = storyBookBackstop.mapComponents(testComponents, debug);

module.exports = {
  id: 'vrt',
  viewports,
  onBeforeScript: 'onBefore.js',
  onReadyScript: 'onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: path.resolve(__dirname, './data/bitmaps_reference'),
    bitmaps_test: path.resolve(__dirname, './data/bitmaps_test'),
    engine_scripts: path.resolve(__dirname, './scripts'),
    html_report: path.resolve(__dirname, './data/html_report'),
    ci_report: path.resolve(__dirname, './data/ci_report')
  },
  // Use 'storyRendered' being printed to the console as the trigger to start
  // taking the snapshot. This is something Storybook prints on its own. This
  // prevents us from having to add a manual delay to compensate for Storybook's
  // slow boot time.
  readyEvent: 'storyRendered',
  report: ['browser', 'CI'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox']
  },
  asyncCaptureLimit: 3,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
};
