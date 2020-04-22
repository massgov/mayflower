import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ColoredHeading = (coloredHeading) => {
  const Element = `h${coloredHeading.level}`;

  let classes = ['ma__colored-heading'];
  if (coloredHeading.color) {
    classes.push(`ma__colored-heading--${coloredHeading.color}`);
  }
  classes = classes.join(' ');

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
