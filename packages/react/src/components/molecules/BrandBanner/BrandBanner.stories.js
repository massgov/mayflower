import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import BrandBanner from './index';

export const BrandBannerExample = (args) => <BrandBanner {...args} />;

BrandBannerExample.storyName = 'Default';

export default {
  title: 'molecules/BrandBanner',
  component: BrandBanner,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
