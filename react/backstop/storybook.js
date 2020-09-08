/**
 * Determines if a component should use viewports for atoms.
 *
 * @param {object} component
 * @returns {boolean}
 */
const isAtom = (component) => {
  const { kind } = component;
  // Skip table and media/Image; they need to be tested with larger viewports.
  return(
    kind.includes('atoms')
    && !kind.includes('table')
    && !kind.includes('Image')
  );
};

/**
 * Determines if a component is the Fixed Feedback button.
 *
 * @param component
 * @return {boolean}
 */
const isFixedFeedback = (component) => component.kind.includes('ButtonFixedFeedback');

const mapComponents = (components, debug = false) => Object.values(components)
  .filter((component) => !['/animations', '/styles'].includes(component.kind))
  .map((component) => {
    const {
      id, kind, name, parameters
    } = component;
    const viewports = [];
    const selectors = [];
    if (isAtom(component)) {
      viewports.push({ label: 'small_atom', width: 400, height: 250 });
    } else {
      viewports.push({ label: 'phone', width: 320, height: 480 });
      viewports.push({ label: 'tablet', width: 1024, height: 768 });
    }
    // Set the component selector. For the fixed feedback button we need to use
    // an explicit selector. For all others, snapshot Storybook's render screen.
    if (isFixedFeedback(component)) {
      selectors.push('.ma__fixed-feedback-button');
    } else if (parameters && parameters.docsOnly) {
      selectors.push('#docs-root');
    } else {
      selectors.push('#root');
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
      'Icon',
      'ButtonCopy'
    ];
    const backstop = (overrides.indexOf(name) > -1) ? '&backstop=true' : '';
    const viewMode = (parameters && parameters.docsOnly) ? 'docs' : 'story';
    const url = `${urlBase}iframe.html?id=${id}&viewMode=${viewMode}${backstop}`;
    return({
      label: `${kind}/${name}`,
      url,
      misMatchThreshold: 0.05,
      viewports,
      selectors
    });
  });

module.exports = mapComponents;
