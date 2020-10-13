import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputText from './index';
import InputTextDocs from './InputText.md';

export const InputTextExample = (args) => (
  <InputText {...args} />
);

InputTextExample.storyName = 'Default';
InputTextExample.args = {
  hiddenLabel: false,
  labelText: 'Text Input',
  required: false,
  id: 'text-input',
  name: 'text-input',
  type: 'text',
  width: 0,
  maxlength: 0,
  pattern: '',
  placeholder: 'type something',
  errorMsg: '',
  defaultText: 'default text value',
  onChange: action('Text input modified')
};
InputTextExample.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['text', 'email', 'number']
    }
  }
};

export default {
  title: 'forms/atoms/InputText',
  component: InputText,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputTextDocs} />
    }
  }
};
