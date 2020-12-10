import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import Header from './index';
import mainItems from './main-nav.data';
import { LoginItem, TranslateItem, StateItem } from './utility-items.data';

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
  utilityItems: [
    TranslateItem,
    StateItem,
    LoginItem
  ]
};
HeaderWithoutMainNav.storyName = 'Header without MainNav';

export const HeaderWithoutMainNavUtilityNav = (args) => <Header {...args} />;
HeaderWithoutMainNavUtilityNav.storyName = 'Header with NavSearch';
export const HeaderWithoutUtilityNav = (args) => <Header {...args} />;
HeaderWithoutUtilityNav.args = {
  mainItems
};
HeaderWithoutUtilityNav.storyName = 'Header without UtilityNav';

export const HeaderWithoutMainUtilityNavAndSearch = (args) => <Header {...args} />;
HeaderWithoutMainUtilityNavAndSearch.args = {
  NavSearch: null
};
HeaderWithoutMainUtilityNavAndSearch.storyName = 'Header without MainNav, UtilityNav and Search';

export default {
  title: 'organisms/Header',
  component: Header,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
