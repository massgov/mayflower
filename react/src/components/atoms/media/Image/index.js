import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Image = (props) => {
  const { classes, shape, ...imgProps } = props;
  if (shape && shape.length > 0) {
    classes.push(shape);
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return(<img className={classes.join(' ')} {...imgProps} />);
};

Image.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  shape: PropTypes.string
};

Image.defaultProps = {
  classes: [
    'ma__image'
  ],
  alt: '',
  shape: ''
};

export default Image;
