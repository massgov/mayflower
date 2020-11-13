import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import CompHeading from './index';
import CompHeadingDocs from './CompHeading.md';

export const CompHeadingExample = (args) => (<CompHeading {...args} />);

CompHeadingExample.storyName = 'Default';

CompHeadingExample.args = {
  title: 'Title text'
};

CompHeadingExample.argTypes = {
  level: {
    control: {
      type: 'select',
      options: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6
      }
    }
  },
  color: {
    control: {
      type: 'select',
      options: { 'green (default)': '', yellow: 'yellow', gray: 'gray' }
    }
  }
};

export default {
  title: 'atoms/headings/CompHeading',
  component: CompHeading,
  parameters: {
    docs: {
      page: () => <StoryPage Description={CompHeadingDocs} />
    }
  }
};
