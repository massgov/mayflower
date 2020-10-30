import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogoHeader from 'MayflowerReactMedia/SiteLogo';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import IconSearch from 'MayflowerReactBase/Icon/IconSearch';
import MainNavData from 'MayflowerReactMolecules/MainNav/MainNav.knob.options';
import MainNavHamburger from '.';

export const MainNavHamburgerExample = (args) => <MainNavHamburger {...args} />;

MainNavHamburgerExample.storyName = 'Default';
MainNavHamburgerExample.args = {
  mainNav: MainNavData.mainNav.map((nav) => {
    const storyProps = {
      href: nav.href,
      text: nav.text,
      subNav: nav.subNav
    };
    return(storyProps);
  })
};
export default {
  title: 'molecules/MainNavHamburger',
  component: MainNavHamburger,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
