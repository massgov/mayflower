import React from 'react';
import PropTypes from 'prop-types';

const Heading = (props) => {
  const Element = `h${props.level}`;
  return(
    <Element>
      {props.text}
    </Element>
  );
};

Heading.propTypes = {
  /** The heading text  */
  text: PropTypes.string.isRequired,
  level: PropTypes.number
};

Heading.defaultProps = {
  level: 1
};

export default Heading;
