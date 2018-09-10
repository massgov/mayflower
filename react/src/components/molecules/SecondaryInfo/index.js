import React from 'react';
import PropTypes from 'prop-types';

import { SvgMarker, SvgPhone, SvgLaptop, SvgFax } from '../../../index';

const SecondaryInfo = (props) => {
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
    <React.Fragment>
      <span className={props.iconClasses.join(' ')}><PropsIcon /></span>
      {props.linkedTitle}
    </React.Fragment>
  );
};

SecondaryInfo.propTypes = {
  icon: PropTypes.oneOf(['marker', 'phone', 'laptop', 'fax']),
  linkedTitle: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'DecorativeLink';
      }
      return comp.type.name && comp.type.name === 'DecorativeLink';
    };
    if (!isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  },
  iconClasses: PropTypes.arrayOf(PropTypes.string)
};

SecondaryInfo.defaultProps = {
  iconClasses: []
};

export default SecondaryInfo;
