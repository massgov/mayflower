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
  mainNav,
  utilityNav
}) => (
  <div className="ma__header_slim">
    {skipNav}
    <div className="ma__header_slim__utility">
      <div className="ma__header_slim__utility-container ma__container">
        {utilityNav}
      </div>
    </div>
    <header className="ma__header_slim__header" id="header">
      <div className="ma__header_slim__header-container ma__container">
        <div className="ma__header_slim__logo">{siteLogo}</div>
        {
          mainNav && <div className="ma__header_slim__nav">{mainNav}</div>
        }
      </div>
    </header>
  </div>
);

HeaderSlim.propTypes = {
  /** A render function that renders SiteLogo component. */
  siteLogo: PropTypes.node.isRequired,
  /** A render function that renders Anchor link to skip to the main content and bypass the header navigations */
  skipNav: PropTypes.node,
  /** A render function that renders Navigation items in the blue banner, above the header element */
  mainNav: PropTypes.node,
  /** A render function that renders Navigation items in the header area */
  utilityNav: PropTypes.node
};

export default HeaderSlim;
