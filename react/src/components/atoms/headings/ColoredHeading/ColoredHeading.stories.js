import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ColoredHeading from './index';
import ColoredHeadingDocs from './ColoredHeading.md';
import coloredHeadingOptions from './ColoredHeading.knobs.options';
import headingsOptions from '../Headings.knobs.options';

export const ColoredHeadingExample = (args) => (<ColoredHeading {...args} />);

ColoredHeadingExample.storyName = 'ColoredHeading';

ColoredHeadingExample.args = {
  text: 'Title text',
  level: '2',
  color: ''
};

ColoredHeadingExample.argTypes = {
  level: {
    control: {
      type: 'select',
      options: headingsOptions.levels
    }
  },
  color: {
    control: {
      type: 'select',
      options: coloredHeadingOptions.color
    }
  }
};

export default {
  title: 'atoms/headings',
  component: ColoredHeading,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ColoredHeadingDocs} />
    }
  }
};
