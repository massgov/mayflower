import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import HeaderMixed from './index';
import mainItems from './main-nav.data';
import { LoginItem, TranslateItem, StateItem } from './utility-items.data';

export const HeaderMixedExample = (args) => <HeaderMixed {...args} />;
HeaderMixedExample.args = {
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ],
  mainItems
};
HeaderMixedExample.storyName = 'Default';
export default {
  title: 'organisms/HeaderMixed',
  component: HeaderMixed,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
