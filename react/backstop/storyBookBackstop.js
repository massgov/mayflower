const fs = require('fs');
const acorn = require('acorn');
require('acorn-jsx/inject')(acorn);
require('acorn-object-rest-spread/inject')(acorn);
require('acorn-static-class-property-initializer/inject')(acorn);
const walk = require('acorn/dist/walk');

const acornOptions = {
  sourceType: 'module',
  plugins: {
    jsx: true,
    objectRestSpread: true,
    staticClassPropertyInitializer: true
  }
};

// Ignore token types unsupported by acorn walk.base.
[
  'JSXElement',
  'ImportDeclaration',
  'ImportDefaultSpecifier',
].map((type) => { walk.base[type] = () => {}; });

/**
 * Lists all Storybook components in the passed dir list.
 * @param {string} dir
 */
const listComponents = (dirList) => {
  let kind;
  const result = [];

  dirList.forEach((dir) => {
    const fileNames = fs.readdirSync(dir);
    const storyFiles = fileNames.filter((fileName) => /stories/.test(fileName));
    storyFiles.forEach((fileName) => {
      const fileContents = fs.readFileSync(`${dir}/${fileName}`).toString();

      // Parse the story module for the kind and story names.
      const ast = acorn.parse(fileContents, acornOptions);
      kindNext = false;
      storyNext = false;
      walk.full(ast, node => {
        switch (node.type) {
          case 'Identifier':
            if (node.name === 'storiesOf') {
              kindNext = true;
            }
            break;

          case 'MemberExpression':
            if (node.property.name === 'add') {
              storyNext = true;
            }
            break;

          case 'Literal':
            if (kindNext) {
              kind = node.value;
              kindNext = false;
            } else if (storyNext) {
              result.push({
                kind,
                name: node.value,
                filePath: dir
              });
              storyNext = false;
            }
            break;
        }
      });
    });
  });

  return result;
};

/**
 * Maps passed Storybook Component dirs to Backstop scenarios.
 * @param {string[]} components
 */
const mapComponents = (components, debug) => components.map(({kind, name}) => {
  let urlBase = 'http://web/';
  if (debug) {
    // Only use --debug when running backstop outside of docker for local
    // testing & debugging. Images will be generated with your host OS's browser
    // and will not match the images generated when running in CircleCI.
    urlBase = 'http://localhost:6006/';
  }

  return makeScenario(
    `${kind}/${name}`,
    `${urlBase}?selectedKind=${kind}&selectedStory=${name}&full=1&addons=0&stories=0`
  );
});

/**
 * Creates a Backstop scenario object from the passed label and url.
 *
 * @param {string} label
 * @param {string} url
 */
const makeScenario = (label, url) => ({
  label,
  url,
  misMatchThreshold: 0.05
});

module.exports = { listComponents, mapComponents, makeScenario };
