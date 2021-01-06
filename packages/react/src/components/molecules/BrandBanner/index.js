/**
 * BrandBanner module.
 * @module @massds/mayflower-react/BrandBanner
 * @requires module:@massds/mayflower-assets/scss/02-molecules/arrow-nav
 * @requires module:@massds/mayflower-assets/scss/01-atoms/arrow-button
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Image from 'MayflowerReactMedia/Image';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
import IconLock from 'MayflowerReactBase/Icon/IconLock';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import logoWhite from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';

const BrandBanner = ({
  hasSeal = true,
  hasToggle = true,
  bgTheme = 'light',
  bgColor = 'c-primary',
  text = 'An official website of the Commonwealth of Massachusetts'
}) => {
  const lightTheme = bgTheme === 'light';
  const brandBannerClasses = classNames('ma__brand-banner', {
    [`ma__brand-banner--${bgColor}-bg-${bgTheme}`]: bgColor && bgTheme
  });
  const [expanded, setExpanded] = useState(false);

  const handleOnToggle = () => {
    setExpanded(!expanded);
  };
  return(
    <div className={brandBannerClasses}>
      <div className="ma__brand-banner-container">
        {hasSeal && <Image className="ma__brand-banner-logo" src={lightTheme ? logo : logoWhite} />}
        <span>
          {text}
          {hasToggle && (
            <ButtonWithIcon
              classes={['ma__brand-banner-button']}
              theme={lightTheme ? 'c-primary' : 'c-white'}
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
              <IconBuilding width={30} height={30} fill={lightTheme ? '#14558F' : '#fff'} />
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
              <IconLock width={30} height={30} fill={lightTheme ? '#388557' : '#fff'} />
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
  hasToggle: PropTypes.bool,
  /** Background color option */
  bgColor: PropTypes.oneOf(['', 'c-primary', 'c-primary-alt', 'c-gray']),
  /** Background color theme */
  bgTheme: PropTypes.oneOf(['', 'light', 'dark'])
};

export default BrandBanner;
