import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputRadio from './index';
import InputRadioDocs from './InputRadio.md';

export const InputRadioExample = (args) => (
  <InputRadio {...args} />
);

InputRadioExample.storyName = 'Default';
InputRadioExample.args = {
  name: 'plant',
  id: 'fern123',
  value: 'fern',
  label: 'Fern',
  required: true,
  outline: true,
  checked: null,
  disabled: false,
  error: false,
  onChange: action('onChange')
};

export default {
  title: 'forms/atoms/InputRadio',
  component: InputRadio,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputRadioDocs} />
    }
  }
};
