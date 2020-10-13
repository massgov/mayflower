import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import ArrowNav from './index';
import ArrowNavDocs from './ArrowNav.md';

export const ArrowNavExample = (args) => <ArrowNav {...args} />;

ArrowNavExample.storyName = 'Default';
ArrowNavExample.args = {
  href: '',
  info: 'link info',
  text: 'Text',
  title: 'Title',
  onClick: action('Clicked'),
  label: 'Label'
};
ArrowNavExample.argTypes = {
  direction: {
    control: {
      type: 'select',
      options: ['left', 'right']
    }
  }
};

export default {
  title: 'molecules/ArrowNav',
  component: ArrowNav,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ArrowNavDocs} />
    }
  }
};
