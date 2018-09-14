import React from 'react';

import './index.css';

const SimpleHeader = (props) => (
  <div className="ma__simple_header">
  <div className="ma__simple_header__banner" />
  <header className="ma__header" id="header">
    <div className="ma__header__container">
      <div className="ma__header__logo">
        {props.siteLogo}
      </div>
    </div>
  </header>
  </div>
);

SimpleHeader.propTypes = {
  /** The domain you want to send users to from the site logo icon */
  // eslint-disable-next-line consistent-return
  siteLogo: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'SiteLogo';
      }
      return comp.type.name && comp.type.name === 'SiteLogo';
    };
    if (!isValid(component)) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
    }
  }
};


export default SimpleHeader;
