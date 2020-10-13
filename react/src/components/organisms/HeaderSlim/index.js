/**
 * HeaderSlim module.
 * @module @massds/mayflower-react/HeaderSlim
 * @requires module:@massds/mayflower-assets/scss/03-organisms/header-slim
 */
import React from 'react';
import PropTypes from 'prop-types';

const HeaderSlim = ({
  SkipNav,
  SiteLogo,
  MainNav,
  UtilityNav
}) => (
  <div className="ma__header_slim">
    {SkipNav && <SkipNav />}
    <div className="ma__header_slim__utility">
      <div className="ma__header_slim__utility-container ma__container">
        {UtilityNav && <UtilityNav />}
      </div>
    </div>
    <header className="ma__header_slim__header" id="header">
      <div className="ma__header_slim__header-container ma__container">
        <div className="ma__header_slim__logo"><SiteLogo /></div>
        { MainNav && <div className="ma__header_slim__nav"><MainNav /></div> }
      </div>
    </header>
  </div>
);

HeaderSlim.propTypes = {
  /** The domain you want to send users to from the site logo icon */
  // eslint-disable-next-line consistent-return
  SiteLogo: (props, propName, componentName) => {
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
  /** A render function that renders Anchor link to skip to the main content and bypass the header navigations */
  SkipNav: PropTypes.func,
  /** A render function that renders Navigation items in the blue banner, above the header element */
  MainNav: PropTypes.func,
  /** A render function that renders Navigation items in the header area */
  UtilityNav: PropTypes.func
};

export default HeaderSlim;
