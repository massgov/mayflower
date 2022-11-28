// @ts-nocheck
/**
 * ColoredHeading module.
 * @module @massds/mayflower-react/ColoredHeading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/colored-heading
 */
import React from 'react';

export interface ColoredHeadingProps {
  /** The heading text  */
  text: string
  /** The heading level */
  level?: string | number
  /** The color of the heading */
  color?: "" | "green" | "blue" | "gray"
}

const ColoredHeading = (coloredHeading: ColoredHeadingProps) => {
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

ColoredHeading.defaultProps = {
  level: 2,
  color: ''
};

export default ColoredHeading;
