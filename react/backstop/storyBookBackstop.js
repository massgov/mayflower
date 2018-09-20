const fs = require('fs');
const acorn = require('acorn');
const path = require('path');
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
  'ImportDefaultSpecifier'
].forEach((type) => { walk.base[type] = () => {}; });

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
      let kindNext = false;
      let storyNext = false;
      walk.full(ast, (node) => {
        /* eslint-disable-next-line default-case */
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
const mapComponents = (components, debug) => components.map((component) => {
  const { kind, name } = component;
  const viewports = [];
  if (isAtom(component)) {
    viewports.push({ label: 'small_atom', width: 400, height: 250 });
  } else {
    viewports.push({ label: 'phone', width: 320, height: 480 });
    viewports.push({ label: 'tablet', width: 1024, height: 768 });
  }
  let urlBase = 'http://web/';
  if (debug) {
    // Only use --debug when running backstop outside of docker for local
    // testing & debugging. Images will be generated with your host OS's browser
    // and will not match the images generated when running in CircleCI.
    urlBase = 'http://localhost:6006/';
  }
  // Backstop overrides.
  const overrides = [
    'GeneralTeaser',
    'Icon'
  ];
  const backstop = (overrides.indexOf(name) > -1) ? '&backstop=true' : '';
  const url = `${urlBase}iframe.html?selectedKind=${kind}&selectedStory=${name}${backstop}`;

  return makeScenario(
    `${kind}/${name}`,
    url,
    viewports
  );
});

/**
 * Determines if a component should use viewports for atoms.
 *
 * @param {object} component
 * @returns {boolean}
 */
const isAtom = (component) => {
  const { filePath } = component;
  // Skip table and media/Image; they need to be tested with larger viewports.
  // Also skip handling of icons for now - this will be handled with the Icon component.
  return(filePath.indexOf('/atoms/') > -1)
    && (filePath.indexOf('table') === -1)
    && (path.basename(filePath) !== 'Image')
    && (filePath.indexOf('icons') === -1);
};

/**
 * Creates a Backstop scenario object from the passed label and url.
 *
 * @param {string} label
 * @param {string} url
 * @param {array} viewports
 */
const makeScenario = (label, url, viewports = null) => ({
  label,
  url,
  misMatchThreshold: 0.05,
  viewports
});

module.exports = { listComponents, mapComponents, makeScenario };
