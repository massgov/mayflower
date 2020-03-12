import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const Image = (props) => {
  const { classes, shape, ...imgProps } = props;
  const imageClasses = classNames({
    ma__image: true,
    [shape]: shape,
    [classes.join(' ')]: classes
  });
  // eslint-disable-next-line jsx-a11y/alt-text
  return(<img className={imageClasses} {...imgProps} />);
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
  alt: '',
  shape: ''
};

export default Image;
