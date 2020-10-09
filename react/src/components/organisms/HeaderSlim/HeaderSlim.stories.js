import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';
import HeaderSlim from '.';

export const HeaderSlimExample = (args) => <HeaderSlim {...args} />;

HeaderSlimExample.storyName = 'Default';
HeaderSlimExample.args = {
  siteLogo: (
    <SiteLogo
      url={{
        domain: 'https://www.mass.gov/'
      }}
      image={{
        src: logo,
        alt: 'Massachusetts state seal',
        width: 45,
        height: 45
      }}
      siteName="Mass.gov"
      title="Mass.gov homepage"
    />
  ),
  skipNav: (<a className="ma__header__skip-nav" href="#main-content">skip to main content</a>)
};

export default {
  title: 'organisms/HeaderSlim',
  component: HeaderSlim,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
