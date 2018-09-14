import React from 'react';
import PropTypes from 'prop-types';
import { assets, svgOptions } from '../../atoms/icons/Icon/Icon.knob.options';
import { Icon, Link } from '../../../index';

const IconLink = (props) => {
  return(
    <span className={props.wrapperClasses.join(' ')}>
      <span className={props.iconClasses.join(' ')}><Icon name={icon.name} /></span>
      {props.link}
    </span>
  );
};

IconLink.propTypes = {
  icon: PropTypes.oneOf(['marker', 'phone', 'laptop', 'fax']),
  link: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'Link';
      }
      return comp.type.name && comp.type.name === 'Link';
    };
    if (!isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  },
  iconClasses: PropTypes.arrayOf(PropTypes.string),
  wrapperClasses: PropTypes.arrayOf(PropTypes.string)
};

IconLink.defaultProps = {
  iconClasses: [],
  wrapperClasses: []
};

export default IconLink;
