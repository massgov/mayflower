import React from 'react';
import BrandBanner from '@massds/mayflower-react/dist/BrandBanner';
import SiteLogo from '@massds/mayflower-react/dist/SiteLogo';
import Error404 from '@massds/mayflower-react/dist/Error404';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import logoWhite from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';
import { headerBasic } from '../Header/Header.stories';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const brandBannerBasic = (
  <Error404 sitelogo={() => <SiteLogo/>} />
);

const notesBrandBanner = `
  // Link to CSS: 
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/general.css">
  <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/error-page.css">
`;

export const brandBannerExample = () => brandBannerBasic;
attachHTML(brandBannerExample, brandBannerBasic, notesBrandBanner);
