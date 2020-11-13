import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputNumber from './index';
import InputNumberDocs from './InputNumber.md';

export const InputNumberExample = (args) => {
  const storyProps = {
    style: (args.inline) ? { width: '400px' } : { width: '200px' }
  };
  if (args.width > 0) {
    storyProps.style = { width: `${args.width}px` };
  }
  return(
    <div {...storyProps}>
      <InputNumber {...args} />
    </div>
  );
};

InputNumberExample.storyName = 'Default';
InputNumberExample.args = {
  hiddenLabel: false,
  labelText: 'Number Input',
  required: false,
  inline: false,
  disabled: false,
  id: 'number-input',
  name: 'number-input',
  width: 0,
  maxlength: 20,
  placeholder: '0',
  errorMsg: 'you did not type something',
  max: 100,
  min: 0,
  step: 1,
  onChange: () => action('onChange'),
  onBlur: () => action('onBlur'),
  showButtons: true
};
InputNumberExample.argTypes = {
  unit: {
    control: {
      type: 'text'
    }
  }
};

export default {
  title: 'forms/atoms/InputNumber',
  component: InputNumber,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputNumberDocs} />
    }
  }
};
