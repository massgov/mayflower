/**
 * BrandBanner module.
 * @module @massds/mayflower-react/BrandBanner
 * @requires module:@massds/mayflower-assets/scss/02-molecules/arrow-nav
 * @requires module:@massds/mayflower-assets/scss/01-atoms/arrow-button
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Image from 'MayflowerReactMedia/Image';
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

const BrandBanner = ({ 
  hasSeal=true,
  hasToggle=true,
  toggleText='Learn More',
  text='An official website of the Commonwealth of Massachusetts'
}) => {
  const sectionClasses = classNames({
    'js-clickable-link': true,
    'ma__arrow-nav': true
  });
  return(
    <div className="ma__brand-banner">
      <div className="ma__brand-banner-container">
        {hasSeal && <Image className="ma__brand-banner-logo" src={logo}/>}
        {text}
        {hasToggle && (
          <button className="ma__brand-banner-button">
              {toggleText}
              <IconChevron />
          </button>
        )}
      </div>
    </div>
  );
};

BrandBanner.propTypes = {
  /** Banner text */
  text: PropTypes.string,
  /** Whether to include seal */
  hasSeal: PropTypes.bool,
  /** Whether to toggle button */
  hasToggle: PropTypes.bool
};


export default BrandBanner;
