import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const { classes, ...imgProps } = props;
  // eslint-disable-next-line jsx-a11y/alt-text
  return(<img className={classes.join(' ')} {...imgProps} />);
};

Image.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

Image.defaultProps = {
  classes: [],
  alt: ''
};

export default Image;
