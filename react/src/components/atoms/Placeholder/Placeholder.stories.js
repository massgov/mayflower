import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Placeholder from '.';
import PlaceholderDocs from './Placeholder.md';

export const PlaceholderExample = (args) => <Placeholder {...args} />;

PlaceholderExample.storyName = 'Default';
PlaceholderExample.args = {
  text: 'This is just a placeholder for templates'
};

export default {
  title: 'atoms/Placeholder',
  component: Placeholder,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PlaceholderDocs} />
    }
  }
};
