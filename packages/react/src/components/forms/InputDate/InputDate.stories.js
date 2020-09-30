import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import { action } from '@storybook/addon-actions';

import InputDate from './index';
import InputDateDocs from './InputDate.md';
import inputDateOptions from './InputDate.knobs.options';

export const InputDateExample = (args) => (
  <InputDate {...args} />
);
InputDateExample.storyName = 'Default';
InputDateExample.args = {
  labelText: 'Select a date:',
  placeholder: 'm/dd/yy',
  required: true,
  id: 'date-input',
  name: 'date-input',
  restrict: '',
  onChangeCallback: action('custom-click on select'),
  defaultDate: new Date('Jan 01 2018'),
  format: 'M/DD/YYYY'
};
InputDateExample.argTypes = {
  restrict: {
    control: {
      type: 'select',
      options: inputDateOptions.restrict
    }
  },
  format: {
    control: {
      type: 'select',
      options: inputDateOptions.format
    }
  }
};

export default {
  title: 'forms/atoms/InputDate',
  component: InputDate,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputDateDocs} />
    }
  }
};
