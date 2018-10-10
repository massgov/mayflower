import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const ColoredHeading = (coloredHeading) => {
  const Element = `h${coloredHeading.level}`;
  const classes = classNames({
    'ma__colored-heading': true,
    [`ma__colored-heading--${coloredHeading.color}`]: coloredHeading.color
  });

  return(
    <Element className={classes} tabIndex="-1">
      {coloredHeading.text}
    </Element>
  );
};

ColoredHeading.propTypes = {
  /** The heading text  */
  text: PropTypes.string.isRequired,
  /** The heading level */
  level: PropTypes.number,
  /** The color of the heading */
  color: PropTypes.oneOf(['', 'green', 'blue'])
};

ColoredHeading.defaultProps = {
  level: 2,
  color: ''
};

export default ColoredHeading;
