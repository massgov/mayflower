import React from 'react';
import PropTypes from 'prop-types';

const IconLink = (props) => {
  return(
    <span className={props.wrapperClasses.join(' ')}>
      {props.icon}
      {props.link}
    </span>
  );
};

IconLink.propTypes = {
  // eslint-disable-next-line consistent-return
  icon: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'Icon'),
  link: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'Link'),
  wrapperClasses: PropTypes.arrayOf(PropTypes.string)
};

const componentPropTypeCheck = (props, propName, componentName, componentString) => {
  const component = props[propName];
  const isValid = (comp) => {
    if (typeof comp.type === 'string') {
      return comp.type === componentString;
    }
    return comp.type.name && comp.type.name === componentString;
  };
  if (!isValid(component)) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
  }
};

IconLink.defaultProps = {
  wrapperClasses: []
};

export default IconLink;
