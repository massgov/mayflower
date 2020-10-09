/**
 * HeaderSlim module.
 * @module @massds/mayflower-react/HeaderSlim
 * @requires module:@massds/mayflower-assets/scss/03-organisms/header-slim
 */
import React from 'react';
import PropTypes from 'prop-types';

const HeaderSlim = ({
  skipNav,
  siteLogo,
  children
}) => (
  <div className="ma__header_slim">
    {skipNav}
    <div className="ma__header_slim__banner" />
    <header className="ma__header_slim__header" id="header">
      <div className="ma__header_slim__container ma__container">
        <div className="ma__header_slim__logo">{siteLogo}</div>
        {children}
      </div>
    </header>
  </div>
);

HeaderSlim.propTypes = {
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
    if (!component || (component && !isValid(component))) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
        component.type.name
      }. Validation failed.`);
    }
  },
  /** Anchor link to skip to the main content and bypass the header navigations */
  skipNav: PropTypes.node,
  children: PropTypes.node
};

export default HeaderSlim;
