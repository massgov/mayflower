import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error404 from '.';
import Error404Docs from './Error404.md';

export const Error404Example = (args) => <Error404 {...args} />;


Error404Example.storyName = 'Default';
Error404Example.args = {
  siteLogo: () => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo, width: 45, height: 45 }} />
};
export default {
  title: 'pages/Error404',
  component: Error404,
  parameters: {
    docs: {
      page: () => <StoryPage Description={Error404Docs} />
    }
  }
};
