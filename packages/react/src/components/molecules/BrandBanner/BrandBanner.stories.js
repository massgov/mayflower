import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import BrandBanner from './index';

export const BrandBannerExample = (args) => <BrandBanner {...args} />;

BrandBannerExample.storyName = 'Default';
BrandBannerExample.args = {
  hasSeal: true,
  hasToggle: true,
  text: 'An official website of the Commonwealth of Massachusetts'
};

export default {
  title: 'molecules/BrandBanner',
  component: BrandBanner,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
