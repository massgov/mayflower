import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error500 from '.';
import Error500Docs from './Error500.md';

export const Error500Example = (args) => <Error500 {...args} />;


Error500Example.storyName = 'Default';
Error500Example.args = {
  siteLogo: () => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo }} />
};
export default {
  title: 'pages/Error500',
  component: Error500,
  parameters: {
    docs: {
      page: () => <StoryPage Description={Error500Docs} />
    }
  }
};
