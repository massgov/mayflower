// @ts-nocheck
/**
 * Heading module.
 * @module @massds/mayflower-react/Heading
 */
import React from 'react';

export interface HeadingProps {
  /** The heading text  */
  text: string
  /** The heading level */
  level?: number
  /** A passable heading classname */
  class?: string
}

const Heading = (props: HeadingProps) => {
  const Element = `h${props.level}`;
  return(
    <Element className={props.class}>
      {props.text}
    </Element>
  );
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
