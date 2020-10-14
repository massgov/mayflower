import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputRadioGroup from './index';
import inputRadioGroupOptions from './InputRadioGroup.knobs.options';
import InputRadioGroupDocs from './InputRadioGroup.md';

export const InputRadioGroupExample = (args) => (
  <InputRadioGroup {...args} />
);

InputRadioGroupExample.storyName = 'Default';
InputRadioGroupExample.args = {
  title: 'Pick your favorite plant',
  name: 'favorite-plant',
  outline: true,
  defaultSelected: '',
  error: false,
  errorMsg: 'You must selected your favorite plant.',
  disabled: false,
  inline: true,
  radioButtons: inputRadioGroupOptions.radioButtons,
  onChange: action('onChange')
};

export default {
  title: 'forms/molecules/InputRadioGroup',
  component: InputRadioGroup,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputRadioGroupDocs} />
    }
  }
};
