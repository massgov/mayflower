import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  alt = '',
  src,
  height,
  width,
  shape = null
}) => (
  <img
    className={`ma__image${shape && ` ${shape}`}`}
    alt={alt}
    src={src}
    height={height}
    width={width}
  />
);

Image.propTypes = {
  shape: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

export default Image;
