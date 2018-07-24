const listDirs = require('./listDirs');
const path = require('path');

const scanPath = `${__dirname}/../src/components/`;

// Scan for component names.
const components = listDirs(scanPath)
  // Component directory names are capitalized.
  .filter((filePath) => (/^[A-Z]/.test(path.basename(filePath))))
  // Only test atoms with this backstop configuration.
  .filter((filePath) => (filePath.indexOf('/atoms/') > -1))
  // Skip table and media/Image, they need to be tested with larger viewports.
  .filter((filePath) => ((filePath.indexOf('table') === -1) && (path.basename(filePath) !== 'Image')));

// const baseUrl = 'http://host.docker.internal:6006';
// const baseUrl = 'http://localhost:6006';
const baseUrl = 'http://web';
const makeStoryUrl = (kind, storyName) => `${baseUrl}/?selectedKind=${kind}&selectedStory=${storyName}&full=1&addons=0&stories=0`;

// Map discovered Component dirs to Backstop scenarios.
const scenarios = components.map((filePath) => {
  const storyName = path.basename(filePath);
  let kind = 'atoms';
  const atomStart = filePath.indexOf('atoms/');
  if (filePath.substring(atomStart + 7) !== storyName) {
    const storyNameStart = filePath.indexOf(storyName);
    kind = filePath.substring(atomStart, storyNameStart - 1);
  }

  return{
    label: `${kind}/${storyName}`,
    url: makeStoryUrl(kind, storyName)
  };
});
// The "atoms/media/Image (circular)" story is coded within the Image story.
scenarios.push({
  label: 'atoms/media/Image (circular)',
  url: makeStoryUrl('atoms/media', 'Image (circular)')
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
  // onBeforeScript: 'puppet/onBefore.js',
  // onReadyScript: 'puppet/onReady.js',
  scenarios,
  paths: {
    bitmaps_reference: `${__dirname}/data/bitmaps_reference`,
    bitmaps_test: `${__dirname}/data/bitmaps_test`,
    engine_scripts: `${__dirname}/data/engine_scripts`,
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
