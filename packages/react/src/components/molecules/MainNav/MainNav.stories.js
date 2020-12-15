import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import { action } from '@storybook/addon-actions';

import MainNav from './index';
import { HeaderMainNav } from 'MayflowerReactMolecules/HeaderNav/main-nav';
import MainNavDocs from './MainNav.md';
import MainNavData from './MainNav.knob.options';

export const MainNavExample = (args) => <MainNav {...args} />;

MainNavExample.storyName = 'Default';
MainNavExample.args = {
  onNavigateCallBack: action('onNavigateCallBack'),
  mainNav: MainNavData.mainNav.map((nav) => {
    let active = false;
    if (typeof nav.active === 'string') {
      active = (nav.active.toLowerCase() === 'true');
    } else if (typeof nav.active === 'boolean') {
      active = nav.active;
    } else {
      active = false;
    }
    const storyProps = {
      href: nav.href,
      text: nav.text,
      active,
      subNav: nav.subNav
    };
    return(storyProps);
  })
};

export const MainNavFromHeader = (args) => <HeaderMainNav {...args} />;
MainNavFromHeader.args = {
  items: MainNavData.mainNav
};
export default {
  title: 'molecules/MainNav',
  component: MainNav,
  parameters: {
    docs: {
      page: () => <StoryPage Description={MainNavDocs} />
    }
  }
};
