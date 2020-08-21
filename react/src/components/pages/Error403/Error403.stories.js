import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { storiesOf } from '@storybook/react';
import logo from '@massds/mayflower-assets/static/images/stateseal.png';
import SiteLogo from 'MayflowerReactMedia/SiteLogo';

import Error403 from '.';
import Error403Docs from './Error403.md';

export const Error403Example = (args) => <Error403 {...args} />;


Error403Example.storyName = 'Default';
Error403Example.args = {
  siteLogo: () => <SiteLogo siteName="Mass.gov" url={{ domain: '/' }} image={{ src: logo }} />
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
