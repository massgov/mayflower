import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputCurrency from './index';
import InputCurrencyDocs from './InputCurrency.md';

export const InputCurrencyExample = (args) => (
  <InputCurrency {...args} />
);
InputCurrencyExample.storyName = 'Default';
InputCurrencyExample.args = {
  hiddenLabel: false,
  labelText: 'Currency Input',
  required: false,
  inline: false,
  disabled: false,
  id: 'currency-input',
  name: 'currency-input',
  width: 0,
  maxlength: 20,
  placeholder: '$0.00',
  errorMsg: 'you did not type something',
  defaultValue: null,
  max: 1000,
  min: 0,
  step: 0.01,
  format: {
    mantissa: 2,
    trimMantissa: false,
    thousandSeparated: true,
    negative: 'parenthesis'
  },
  showButtons: true,
  onChange: () => action('onChange'),
  onBlur: () => action('onBlur'),
  language: 'English'
};
InputCurrencyExample.argTypes = {
  language: {
    control: {
      type: 'select',
      options: {
        English: 'en-US',
        Chinese: 'zh-CN',
        French: 'fr-FR',
        Russian: 'ru-RU'
      }
    }
  }
};

export default {
  title: 'forms/atoms/InputCurrency',
  component: InputCurrency,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputCurrencyDocs} />
    }
  }
};
