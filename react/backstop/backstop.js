const listComponents = require('./listComponents');
const storyBookBackstop = require('./storyBookBackstop');
const path = require('path');
const fs = require('fs');

const processAtoms = (process.argv.indexOf('--atoms') > -1);

let testId;
let components;
let viewports;

// Scan for component names and set up viewports.
const componentsPath = `${__dirname}/../src/components/`;
testComponents = listComponents(componentsPath);

if (processAtoms) {
  testId = 'mayflower-react-atoms';
  components = testComponents
    // Component directory names are capitalized.
    .filter((filePath) => (/^[A-Z]/.test(path.basename(filePath))))
    // Only test atoms with this backstop configuration.
    .filter((filePath) => (filePath.indexOf('/atoms/') > -1))
    // Skip table and media/Image, they need to be tested with larger viewports.
    .filter((filePath) => ((filePath.indexOf('table') === -1) && (path.basename(filePath) !== 'Image')));

  viewports = [{
    label: 'small_atom',
    width: 400,
    height: 250
  }];
} else {
  testId = 'mayflower-react';
  components = testComponents
    // Component directory names are capitalized.
    .filter((filePath) => (/^[A-Z]/.test(path.basename(filePath))))
    // Only test stories other than atoms with this backstop configuration.  Do not test animations.
    .filter((filePath) => (filePath.indexOf('/atoms/') === -1) && (filePath.indexOf('/animations/') === -1));

  viewports = [{
    label: 'phone',
    width: 320,
    height: 480
  }, {
    label: 'tablet',
    width: 1024,
    height: 768
  }];
}

// Map discovered Component dirs to Backstop scenarios.
let scenarios = storyBookBackstop.mapComponents(components);

if (!processAtoms) {
  // Add the "atoms/media/Image" story and atoms/Table story, they are not tested
  // with --atoms due to viewports sizes.
  scenarios.push({
    label: 'atoms/media/Image',
    url: storyBookBackstop.makeStoryUrl('atoms/media', 'Image')
  });
  scenarios.push({
    label: 'atoms/table/Table',
    url: storyBookBackstop.makeStoryUrl('atoms/table', 'Table')
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
}

module.exports = {
  id: testId,
  viewports,
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
