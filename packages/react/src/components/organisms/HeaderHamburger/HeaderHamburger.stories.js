import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import mainItems from './main-nav.data';
import HeaderHamburger from './index';
import { LoginItem, TranslateItem, StateItem } from './utility-items.data';

export const HeaderHamburgerExample = (args) => <HeaderHamburger {...args} />;
HeaderHamburgerExample.args = {
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ],
  mainItems
};
HeaderHamburgerExample.storyName = 'Default';
export default {
  title: 'organisms/HeaderHamburger',
  component: HeaderHamburger,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
