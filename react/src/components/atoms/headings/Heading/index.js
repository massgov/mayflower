import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const Element = `h${props.level}`;

  return(
    <Element className={props.class}>
      {/* When Heading is used as a wrapper for its child component, it doesn't display text. */}
      {props.text && props.text}
      {props.children &&
          // Allow Heading to render child component for such as accordion.
          props.children }
    </Element>
  );
};

Heading.propTypes = {
  /** The heading text  */
  text: PropTypes.string.isRequired,
  /** The heading level */
  level: PropTypes.number,
  /** A passable heading classname */
  class: PropTypes.string
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
