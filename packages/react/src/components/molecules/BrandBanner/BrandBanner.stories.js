import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import BrandBanner from './index';
import seal from '@massds/mayflower-assets/static/images/logo/stateseal.svg';
import sealWhite from '@massds/mayflower-assets/static/images/logo/stateseal-white.png';

export const BrandBannerExample = (args) => <BrandBanner {...args} />;

BrandBannerExample.storyName = 'Default';
BrandBannerExample.args = {
  seal
};

BrandBannerExample.argTypes = {
  seal: {
    control: {
      type: 'select',
      options: {'gray seal': seal, 'white seal': sealWhite}
    }
  }
}

export default {
  title: 'molecules/BrandBanner',
  component: BrandBanner,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
