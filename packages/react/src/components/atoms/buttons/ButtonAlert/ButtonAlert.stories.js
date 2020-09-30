import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import ButtonAlert from './index';
import ButtonAlertDocs from './ButtonAlert.md';

export default {
  title: 'atoms/buttons/ButtonAlert',
  component: ButtonAlert,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ButtonAlertDocs} />
    }
  }
};

export const ButtonAlertExample = (args) => <ButtonAlert {...args} />;
ButtonAlertExample.storyName = 'Default';
ButtonAlertExample.args = {
  onClick: action('ButtonAlert clicked'),
  text: 'Updates',
  showText: 'Show',
  hideText: 'Hide',
  classes: '',
  isOpen: false
};
ButtonAlertExample.argTypes = {
  theme: {
    control: {
      type: 'select',
      options: {
        'no theme i.e. c-primary-alt (default)': '',
        'c-primary': 'c-primary',
        'c-highlight': 'c-highlight',
        'c-gray-dark': 'c-gray-dark',
        'c-black': 'c-black'
      }
    }
  }
};
