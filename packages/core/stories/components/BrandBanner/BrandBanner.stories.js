import React from 'react';
import BrandBanner from '@massds/mayflower-react/dist/BrandBanner';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';

import { attachHTML } from '../../util/renderCode';

const { STORYBOOK_CDN_PATH } = process.env;

const brandBannerBasic = (
  <BrandBanner seal={logo} hasToggle={false} />
);

export const brandBannerExample = () => brandBannerBasic;