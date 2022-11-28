// @ts-nocheck
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
import SiteLogo, { SiteLogoProps } from 'MayflowerReactMedia/SiteLogo';
import Placeholder from 'MayflowerReactAtoms/Placeholder';

export interface NarrowTemplateProps {
  /** Align the template to the right or to the left */
  side?: "right" | "left"
  /** Secondary color is yellow or green */
  color?: "yellow" | "green"
  siteLogo?(...args: unknown[]): unknown
  /** The domain you want to send users to from the site logo icon */
  siteLogoDomain?: SiteLogoProps
  children?: React.ReactNode
}

const NarrowTemplate = (narrowTemplate: NarrowTemplateProps) => {
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

// Only set defaults for the configuration variables which need to be opted in to activate.
NarrowTemplate.defaultProps = {
  side: 'right',
  color: 'yellow'
};

export default NarrowTemplate;
