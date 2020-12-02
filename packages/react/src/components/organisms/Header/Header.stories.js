import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { LoginItem, TranslateItem, StateItem } from './utility-items.data';

import mainItems from './main-nav.data';
import Header from './index';

export const HeaderExample = (args) => <Header {...args} />;
HeaderExample.args = {
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ],
  mainItems
};
HeaderExample.storyName = 'Default';

export const HeaderWithoutMainNav = (args) => <Header {...args} />;
HeaderWithoutMainNav.args = {
  mainItems: [],
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ]
};

export const HeaderWithoutUtilityNav = (args) => <Header {...args} />;
HeaderWithoutUtilityNav.args = {
  utilityItems: [],
  mainItems
};
export const HeaderWithoutUtilityMainSearch = (args) => <Header {...args} />;
HeaderWithoutUtilityMainSearch.args = {
  NavSearch: null,
  mainItems: []
};

export default {
  title: 'organisms/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
