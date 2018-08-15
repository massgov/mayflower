import React from 'react';
import PropTypes from 'prop-types';

// Loads all SVGs within the assets directory
const req = require.context('./assets', true, /.svg$/);
function loadAssets() {
  req.keys().forEach((filename) => req(filename));
}

loadAssets();

const Icon = (props) => (<svg ><use href={`#${props.name}`} /></svg>);

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
