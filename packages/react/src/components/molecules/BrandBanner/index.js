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
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

const BrandBanner = ({ 
  hasSeal,
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
      </div>
    </div>
  );
};

BrandBanner.propTypes = {
  /** Banner text */
  text: PropTypes.string,
  /** Whether to include seal */
  hasSeal: PropTypes.bool
};


export default BrandBanner;
