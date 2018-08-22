import React from 'react';
import PropTypes from 'prop-types';

// Loads all SVGs within the assets directory
const req = require.context('!svg-sprite-loader!./assets', true, /.svg$/);
function loadAssets(asset) {
  req
    .keys()
    .filter((filename) => filename.indexOf(`${asset}.svg`) > -1)
    .forEach((filename) => req(filename));
}

const Icon = (props) => {
  loadAssets(props.name);
  return(<svg><use xlinkHref={`#${props.name}`} /></svg>);
};

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
