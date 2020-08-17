import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Divider from './index';
import DividerDocs from './Divider.md';

export const DividerExample = () => <Divider />;

DividerExample.storyName = 'Divider';

export default {
  title: 'atoms',
  component: Divider,
  parameters: {
    docs: {
      page: () => <StoryPage Description={DividerDocs} />
    }
  }
};
