const path = require('path');

// const baseUrl = 'http://host.docker.internal:6006';
// const baseUrl = 'http://localhost:6006';
const baseUrl = 'http://web';
const makeStoryUrl = (kind, storyName) => `${baseUrl}/?selectedKind=${kind}&selectedStory=${storyName}&full=1&addons=0&stories=0`;

/**
 * Maps passed Storybook Component dirs to Backstop scenarios.
 * @param {string[]} components
 */
const mapComponents = (components) => components.map((filePath) => {
  const storyName = path.basename(filePath);
  const kindStart = filePath.indexOf('components/') + 'components/'.length;
  const storyNameStart = filePath.indexOf(storyName);
  const kind = filePath.substring(kindStart, storyNameStart - 1);

  return{
    label: `${kind}/${storyName}`,
    url: makeStoryUrl(kind, storyName),
    misMatchThreshold: 0.05
  };
});

const scanPath = `${__dirname}/../src/components/`;

module.exports = { makeStoryUrl, mapComponents, scanPath };
