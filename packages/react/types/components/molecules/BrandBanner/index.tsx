// @ts-nocheck
/**
 * BrandBanner module.
 * @module @massds/mayflower-react/BrandBanner
 * @requires module:@massds/mayflower-assets/scss/02-molecules/brand-banner
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 */
import React from 'react';
import classNames from 'classnames';

import Image from 'MayflowerReactMedia/Image';
import IconChevron from 'MayflowerReactBase/Icon/IconChevron';
import IconBuilding from 'MayflowerReactBase/Icon/IconBuilding';
import IconLock from 'MayflowerReactBase/Icon/IconLock';

export interface BrandBannerProps {
  /** Banner state seal src.
   * To ensure sufficient color contrast, pass in the gray seal for light bgTheme and the white seal for dark bgTheme. */
  seal?: string
  /** Banner text */
  text?: string
  /** Whether to include seal */
  hasSeal?: boolean
  /** Whether to render the toggle button and content */
  hasToggle?: boolean
  /** Background color option */
  bgColor?: "" | "c-primary" | "c-primary-alt" | "c-gray"
  /** Background color theme */
  bgTheme?: "" | "light" | "dark"
}

const BrandBanner = ({
  hasSeal = true,
  hasToggle = true,
  bgTheme = 'light',
  bgColor = 'c-primary',
  seal = null,
  text = 'An official website of the Commonwealth of Massachusetts'
}: BrandBannerProps) => {
  const lightTheme = bgTheme === 'light';
  const brandBannerClasses = classNames('ma__brand-banner', {
    [`ma__brand-banner--${bgColor}-bg-${bgTheme}`]: bgColor && bgTheme
  });
  const ContainerTag = hasToggle ? 'button' : 'div';
  const containerProps = {
    className: 'ma__brand-banner-container'
  };
  const brandBannerToggleColor = bgTheme === 'light' ? bgColor : 'c-white';

  const [hovered, setHovered] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const brandBannerExpansionClasses = classNames('ma__brand-banner-expansion', {
    'ma__brand-banner-expansion--expanded': expanded
  });
  const handleOnToggle = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const brandBannerToggleClasses = classNames('ma__brand-banner-button ma__button-icon ma__icon-small ma__button-icon--quaternary', {
    [`ma__button-icon--${brandBannerToggleColor}`]: bgColor && bgTheme,
    active: hovered
  });

  const contentId = 'ma__brand-banner-content';
  if (hasToggle) {
    containerProps.onClick = handleOnToggle;
    containerProps.onMouseEnter = () => setHovered(true);
    containerProps.onMouseLeave = () => setHovered(false);
    containerProps['aria-controls'] = contentId;
    containerProps['aria-expanded'] = expanded;
  }
  return(
    <div className={brandBannerClasses}>
      <ContainerTag {...containerProps}>
        {hasSeal && <Image className="ma__brand-banner-logo" src={seal} alt="Massachusetts State Seal" />}
        <span className="ma__brand-banner-text">
          <span>{text}</span>
          <span>&nbsp;&nbsp;&nbsp;</span>
          {hasToggle && (
            <span className={brandBannerToggleClasses}>
              <span>Here&apos;s how you know</span>
              <IconChevron />
            </span>
          )}
        </span>
      </ContainerTag>
      {
        hasToggle && (
          <ul className={brandBannerExpansionClasses} id={contentId}>
            <li className="ma__brand-banner-expansion-item">
              <IconBuilding width={30} height={30} fill={lightTheme ? '#14558F' : '#fff'} />
              <div className="ma__brand-banner-expansion-item-content">
                <p>
                  Official websites use .mass.gov
                </p>
                <p>
                  A .mass.gov website belongs to an official government organization in Massachusetts.
                </p>
              </div>
            </li>
            <li className="ma__brand-banner-expansion-item">
              <IconLock width={30} height={30} fill={lightTheme ? '#388557' : '#fff'} />
              <div className="ma__brand-banner-expansion-item-content">
                <p>
                  Secure websites use HTTPS certificate
                </p>
                <p>
                  A lock icon (
                  <IconLock width={12} height={12} />
                  ) or https:// means you’ve safely connected to the official website. Share sensitive information only on official, secure websites.
                </p>
              </div>
            </li>
          </ul>
        )
      }
    </div>
  );
};

export default BrandBanner;
