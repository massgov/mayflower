/**
 * BrandBanner module.
 * @module @massds/mayflower-react/BrandBanner
 * @requires module:@massds/mayflower-assets/scss/02-molecules/arrow-nav
 * @requires module:@massds/mayflower-assets/scss/01-atoms/arrow-button
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Image from 'MayflowerReactMedia/Image';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
import IconLock from 'MayflowerReactBase/Icon/IconLock';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

const BrandBanner = ({
  hasSeal = true,
  hasToggle = true,
  text = 'An official website of the Commonwealth of Massachusetts'
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleOnToggle = () => {
    setExpanded(!expanded);
  };
  return(
    <div className="ma__brand-banner">
      <div className="ma__brand-banner-container">
        {hasSeal && <Image className="ma__brand-banner-logo" src={logo} />}
        <span>
          {text}
          {hasToggle && (
            <ButtonWithIcon
              classes={['ma__brand-banner-button']}
              theme="c-primary"
              type="submit"
              usage="quaternary"
              onClick={handleOnToggle}
              expanded={expanded}
              icon={<IconChevron />}
            >
              {expanded ? 'Got it' : 'Learn more'}
            </ButtonWithIcon>
          )}
        </span>
      </div>
      {
        (hasToggle && expanded) && (
          <dl className="ma__brand-banner-expansion">
            <div className="ma__brand-banner-expansion-item">
              <IconBuilding width={30} height={30} fill="#14558F" />
              <div className="ma__brand-banner-expansion-item-content">
                <dt>
                  Official websites use .mass.gov domain
                </dt>
                <dd>
                  The .mass.gov domain belongs to the official Massachusetts state government.
                </dd>
              </div>
            </div>
            <div className="ma__brand-banner-expansion-item">
              <IconLock width={30} height={30} fill="#388557" />
              <div className="ma__brand-banner-expansion-item-content">
                <dt>
                  Secure websites use HTTPS certificate
                </dt>
                <dd>
                  A lock icon (
                  <IconLock width={12} height={12} />
                  ) or https:// means you’ve safely connected to the official website. Share sensitive information only on official, secure websites.
                </dd>
              </div>
            </div>
          </dl>
        )
      }
    </div>
  );
};

BrandBanner.propTypes = {
  /** Banner text */
  text: PropTypes.string,
  /** Whether to include seal */
  hasSeal: PropTypes.bool,
  /** Whether to render the toggle button and content */
  hasToggle: PropTypes.bool
};

export default BrandBanner;
