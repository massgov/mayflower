const baseUrl = 'http://host.docker.internal:6006';
// const baseUrl = 'http://localhost:6006';

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
  onBeforeScript: 'puppet/onBefore.js',
  onReadyScript: 'puppet/onReady.js',
  scenarios: [
    {
      label: 'molecules/HeaderSearch',
      url: `${baseUrl}/?selectedKind=molecules&selectedStory=HeaderSearch&full=1&addons=0&stories=0`
    }
  ],
  paths: {
    bitmaps_reference: `${__dirname}/data/bitmaps_reference`,
    bitmaps_test: `${__dirname}/data/bitmaps_test`,
    engine_scripts: `${__dirname}/engine_scripts`,
    html_report: `${__dirname}/data/html_report`,
    ci_report: `${__dirname}/data/ci_report`
  },
  report: ['browser'],
  engine: 'puppeteer',
  engineOptions: {
    args: ['--no-sandbox']
  },
  asyncCaptureLimit: 5,
  asyncCompareLimit: 50,
  debug: false,
  debugWindow: false
};
