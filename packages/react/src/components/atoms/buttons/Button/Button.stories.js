import React from 'react';

import { StoryPage } from 'StorybookConfig/preview';

import { action } from '@storybook/addon-actions';

import Button from './index';
import ButtonDocs from './Button.md';

const Template = (args) => <Button {...args} />;

export const ButtonExample = Template.bind({});

ButtonExample.storyName = 'Default';

ButtonExample.args = {
  info: 'this will be the tooltip text on hover',
  disabled: false,
  text: 'Button',
  onClick: action('button clicked')
};

export default {
  title: 'atoms/buttons/Button',
  component: Button,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ButtonDocs} />
    }
  }
};
