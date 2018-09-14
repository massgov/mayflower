import React from 'react';
import PropTypes from 'prop-types';

import { SvgMarker, SvgPhone, SvgLaptop, SvgFax } from '../../../index';

const IconLink = (props) => {
  const getIcon = (type) => {
    const icons = {
      marker: SvgMarker,
      phone: SvgPhone,
      laptop: SvgLaptop,
      fax: SvgFax
    };
    return icons[type];
  };
  const PropsIcon = getIcon(props.icon);
  return(
    <span className={props.wrapperClasses.join(' ')}>
      <span className={props.iconClasses.join(' ')}><PropsIcon /></span>
      {props.link}
    </span>
  );
};

IconLink.propTypes = {
  icon: PropTypes.oneOf(['marker', 'phone', 'laptop', 'fax']),
  // eslint-disable-next-line consistent-return
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
