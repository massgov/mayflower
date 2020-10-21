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
    {SkipNav}
    <div className="ma__header_slim__utility">
      <div className="ma__header_slim__utility-container ma__container">
        {UtilityNav}
      </div>
    </div>
    <header className="ma__header_slim__header" id="header">
      <div className="ma__header_slim__header-container ma__container">
        <div className="ma__header_slim__logo">{SiteLogo}</div>
        {
          MainNav && <div className="ma__header_slim__nav">{() => MainNav}</div>
        }
      </div>
    </header>
  </div>
);

HeaderSlim.propTypes = {
  /** A render function that renders SiteLogo component. */
  SiteLogo: PropTypes.node.isRequired,
  /** A render function that renders Anchor link to skip to the main content and bypass the header navigations */
  SkipNav: PropTypes.node,
  /** A render function that renders Navigation items in the blue banner, above the header element */
  MainNav: PropTypes.node,
  /** A render function that renders Navigation items in the header area */
  UtilityNav: PropTypes.node
};

export default HeaderSlim;
