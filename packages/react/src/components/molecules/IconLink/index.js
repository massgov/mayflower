import React from 'react';
import PropTypes from 'prop-types';

const IconLink = (props) => (
  <span className={props.wrapperClasses.join(' ')}>
    {props.icon && (
    <>
      {props.icon}
      <span>&nbsp;&nbsp;</span>
    </>
    )}
    {props.link}
  </span>
);

IconLink.propTypes = {
  icon: PropTypes.element,
  link: PropTypes.element,
  wrapperClasses: PropTypes.arrayOf(PropTypes.string)
};

IconLink.defaultProps = {
  wrapperClasses: []
};

export default IconLink;
