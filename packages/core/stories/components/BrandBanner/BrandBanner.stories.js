import React from 'react';
import BrandBanner from '@massds/mayflower-react/dist/BrandBanner';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import logoWhite from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const brandBannerBasic = (
  <BrandBanner seal={logo} hasToggle={false} />
);

const brandBannerLightTheme = (
    <>
        <BrandBanner seal={logo} hasToggle={false} />
        <BrandBanner seal={logo} hasToggle={false} bgTheme="light" bgColor="c-primary-alt" />
        <BrandBanner seal={logo} hasToggle={false} bgTheme="light" bgColor="c-gray" />
    </>
  );


const brandBannerDarkTheme = (
<>
    <BrandBanner seal={logoWhite} hasToggle={false} bgTheme="dark" />
    <BrandBanner seal={logoWhite} hasToggle={false} bgTheme="dark" bgColor="c-primary-alt" />
    <BrandBanner seal={logoWhite} hasToggle={false} bgTheme="dark" bgColor="c-gray" />
</>
);

const notesBrandBanner = `// Link to CSS: <link rel="stylesheet" href="${STORYBOOK_CDN_PATH}/css/brand-banner.css">`;

export const brandBannerExample = () => brandBannerBasic;

export const brandBannerLight= () => brandBannerLightTheme;
attachHTML(brandBannerLight, brandBannerLightTheme, notesBrandBanner);

export const brandBannerDark= () => brandBannerDarkTheme;
attachHTML(brandBannerDark, brandBannerDarkTheme, notesBrandBanner);