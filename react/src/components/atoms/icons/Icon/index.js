import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

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
