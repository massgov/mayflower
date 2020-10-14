import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import logo from '@massds/mayflower-assets/static/images/stateseal.png';

import SiteLogo from '.';
import SiteLogoDocs from './SiteLogo.md';

export const SiteLogoExample = (args) => <SiteLogo {...args} />;

SiteLogoExample.storyName = 'Default';
SiteLogoExample.args = {
  url: {
    domain: 'https://www.mass.gov/'
  },
  image: {
    src: logo,
    alt: '',
    width: 45,
    height: 45
  },
  siteName: 'Mass.gov',
  title: 'Mass.gov homepage'
};

export default {
  title: 'atoms/media/SiteLogo',
  component: SiteLogo,
  parameters: {
    docs: {
      page: () => <StoryPage Description={SiteLogoDocs} />
    }
  }
};
