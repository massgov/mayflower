import React from 'react';
import PropTypes from 'prop-types';

// Loads all SVGs within the assets directory
const req = require.context('!svg-sprite-loader!./assets', true, /.svg$/);
function loadAssets() {
  req
    .keys()
    .forEach((filename) => req(filename));
}
loadAssets();

const Icon = (props) => (<svg><use xlinkHref={`#${props.name}`} /></svg>);

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
