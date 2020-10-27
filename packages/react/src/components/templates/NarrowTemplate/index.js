/**
 * NarrowTemplate module.
 * @module @massds/mayflower-react/NarrowTemplate
 * @requires module:@massds/mayflower-assets/scss/01-atoms/site-logo
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-typeahead
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import Placeholder from 'MayflowerReactAtoms/Placeholder';

const NarrowTemplate = (narrowTemplate) => {
  const sideClass = narrowTemplate.side ? ` ma__narrow-template--${narrowTemplate.side}` : '';
  const colorClass = narrowTemplate.color ? ` ma__narrow-template--${narrowTemplate.color}` : '';
  const classNames = `ma__narrow-template${sideClass}${colorClass}`;
  let logo = null;
  // Only render a logo if either there's a custom function to render it
  // or props to Sitelogo have been provided.
  if (narrowTemplate.siteLogo && typeof narrowTemplate.siteLogo === 'function') {
    logo = narrowTemplate.siteLogo();
  } else if (narrowTemplate.siteLogoDomain) {
    logo = <SiteLogo {...narrowTemplate.siteLogoDomain} />;
  }
  return(
    <main id="main-content" className={classNames} tabIndex="-1">
      <header className="ma__narrow-template__header">
        {logo}
      </header>
      <div className="ma__narrow-template__container">
        <div className="ma__narrow-template__content">
          {narrowTemplate.children ? narrowTemplate.children : <Placeholder text="Page Content" />}
        </div>
      </div>
    </main>
  );
};

NarrowTemplate.propTypes = {
  /** Align the template to the right or to the left */
  side: PropTypes.oneOf(['right', 'left']),
  /** Secondary color is yellow or green */
  color: PropTypes.oneOf(['yellow', 'green']),
  siteLogo: PropTypes.func,
  /** The domain you want to send users to from the site logo icon */
  siteLogoDomain: PropTypes.shape(SiteLogo.propTypes)
};

// Only set defaults for the configuration variables which need to be opted in to activate.
NarrowTemplate.defaultProps = {
  side: 'right',
  color: 'yellow'
};

export default NarrowTemplate;
