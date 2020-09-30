import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputSlider from './index';
import InputSliderDocs from './InputSlider.md';

export const InputSliderExample = (args) => (
  <InputSlider {...args} />
);

InputSliderExample.storyName = 'Default';
InputSliderExample.args = {
  labelText: 'Family Leave',
  id: 'text-input',
  disabled: false,
  required: true,
  defaultValue: '0',
  axis: 'x',
  max: 1,
  min: 0,
  step: 0.01,
  ticks: [[0, '0%'], [0.6, 'Minimum requirement'], [1, '100%']],
  domain: [0, 1],
  onChange: action('inputSlider.onChange'),
  onUpdate: action('inputSlider.onUpdate'),
  skipped: false,
  displayValueFormat: 'percentage'
};
InputSliderExample.argTypes = {
  displayValueFormat: {
    control: {
      type: 'select',
      options: ['percentage', 'value', null]
    }
  }
};

export default {
  title: 'forms/atoms/InputSlider',
  component: InputSlider,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputSliderDocs} />
    }
  }
};
