import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Heading from './index';

export const HeadingExample = (args) => (<Heading {...args} />);

HeadingExample.storyName = 'Default';

HeadingExample.args = {
  text: 'Title text',
  level: 1
};

HeadingExample.argTypes = {
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
  }
};

export default {
  title: 'atoms/headings/Heading',
  component: Heading,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
