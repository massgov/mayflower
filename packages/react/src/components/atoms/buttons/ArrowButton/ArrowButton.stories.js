import React from 'react';
import { action } from '@storybook/addon-actions';
import { StoryPage } from 'StorybookConfig/preview';
import ArrowButton from './index';
import ArrowButtonDocs from './ArrowButton.md';

export const ArrowButtonExample = (args) => (<ArrowButton {...args} />);

ArrowButtonExample.storyName = 'Default';

ArrowButtonExample.args = {
  direction: 'left',
  href: '',
  info: 'Left',
  onClick: action('Button Clicked')
};

ArrowButtonExample.argTypes = {
  direction: {
    control: {
      type: 'select',
      options: ['left', 'right']
    }
  }
};


export default {
  title: 'atoms/buttons/ArrowButton',
  component: ArrowButton,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ArrowButtonDocs} />
    }
  }
};
