import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import logo from '@massds/mayflower-assets/static/images/logo/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error403 from '.';
import Error403Docs from './Error403.md';

export const Error403Example = (args) => <Error403 {...args} />;


Error403Example.storyName = 'Default';
Error403Example.args = {
  siteLogo: () => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo, width: 45, height: 45 }} />
};
export default {
  title: 'pages/Error403',
  component: Error403,
  parameters: {
    docs: {
      page: () => <StoryPage Description={Error403Docs} />
    }
  }
};
