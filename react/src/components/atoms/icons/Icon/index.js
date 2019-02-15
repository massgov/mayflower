import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

// This condition actually should detect if it's an Node environment
if (typeof require.context === 'undefined') {
  const fs = require('fs');
  const path = require('path');

  require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.svg$/) => {
    const files = {};

    function readDirectory(directory) {
      fs.readdirSync(directory).forEach((file) => {
        const fullPath = path.resolve(directory, file);

        if (fs.statSync(fullPath).isDirectory()) {
          if (scanSubDirectories) readDirectory(fullPath);

          return;
        }

        if (!regularExpression.test(fullPath)) return;

        files[fullPath] = true;
      });
    }

    readDirectory(path.resolve(__dirname, './assets'));

    function Module(file) {
      return require(file);
    }

    Module.keys = () => Object.keys(files);

    return Module;
  };
}

// Loads all SVGs within the assets directory
const req = require.context('!svg-sprite-loader!./assets', true, /.svg$/);
function loadAssets(asset) {
  let file;
  req
    .keys()
    .filter((filename) => filename.indexOf(asset) > -1)
    .forEach((filename) => {
      file = req(filename);
    });
  return file;
}

const Icon = (props) => {
  const {
    svgWidth,
    svgHeight,
    title,
    name,
    classes,
    ariaHidden,
    ...rest
  } = props;
  const SVG = loadAssets(name);
  if (SVG) {
    classes.push(`svg-${name}`);
    const attr = {
      width: svgWidth || null,
      height: svgHeight || null,
      className: (classes && classes.length > 0) ? classes.filter((c) => c).toString() : null,
      'aria-hidden': ariaHidden || null
    };
    return(
      <svg {...attr} {...rest} >
        {title && <title>{title}</title>}
        <use xlinkHref={`#${name}`} />
      </svg>
    );
  }
  return null;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  classes: PropTypes.arrayOf(PropTypes.string),
  ariaHidden: PropTypes.bool
};

Icon.defaultProps = {
  title: null,
  classes: []
};

export default Icon;
