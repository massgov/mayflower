import React from 'react';
import BrandBanner from '@massds/mayflower-react/dist/BrandBanner';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import logoWhite from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';
import { headerBasic } from '../Header/Header.stories';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const brandBannerWithoutSeal = (
  <BrandBanner seal={logo} hasToggle hasSeal={false} />
);

const brandBannerWithoutSealWithHeader = (
  <>
    {brandBannerWithoutSeal}
    {headerBasic}
  </>
);

// Light
const brandBannerBasic = (
  <BrandBanner seal={logo} hasToggle />
);

const brandBannerLightThemePrimaryAlt = (
  <BrandBanner seal={logo} hasToggle bgTheme="light" bgColor="c-primary-alt" />
);

const brandBannerLightThemeGray = (
  <BrandBanner seal={logo} hasToggle bgTheme="light" bgColor="c-gray" />
);

// Dark
const brandBannerDarkTheme = (
  <BrandBanner seal={logoWhite} hasToggle bgTheme="dark" />
);

const brandBannerDarkThemePrimaryAlt = (
  <BrandBanner seal={logoWhite} hasToggle bgTheme="dark" bgColor="c-primary-alt" />
);

const brandBannerDarkThemeGray = (
  <BrandBanner seal={logoWhite} hasToggle bgTheme="dark" bgColor="c-gray" />
);

const notesBrandBanner = `
  // Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/brand-banner.css">
  // Link to JS: <script type="text/javascript" src="${STORYBOOK_CDN_PATH}/js/brand-banner.js" />
`;

export const brandBannerExample = () => brandBannerBasic;

export const brandBannerNoSeal = () => brandBannerWithoutSeal;

export const brandBannerNoSealWithHeader = () => brandBannerWithoutSealWithHeader;

export const brandBannerLight = () => brandBannerBasic;
attachHTML(brandBannerLight, brandBannerBasic, notesBrandBanner);

export const brandBannerLightPrimaryAlt = () => brandBannerLightThemePrimaryAlt;
attachHTML(brandBannerLightPrimaryAlt, brandBannerLightThemePrimaryAlt, notesBrandBanner);

export const brandBannerLightGray = () => brandBannerLightThemeGray;
attachHTML(brandBannerLightGray, brandBannerLightThemeGray, notesBrandBanner);

export const brandBannerDark = () => brandBannerDarkTheme;
attachHTML(brandBannerDark, brandBannerDarkTheme, notesBrandBanner);

export const brandBannerDarkPrimaryAlt = () => brandBannerDarkThemePrimaryAlt;
attachHTML(brandBannerDarkPrimaryAlt, brandBannerDarkThemePrimaryAlt, notesBrandBanner);

export const brandBannerDarkGray = () => brandBannerDarkThemeGray;
attachHTML(brandBannerDarkGray, brandBannerDarkThemeGray, notesBrandBanner);
