import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import MultiSelectDropDown from './index';

export const MultiSelectDropDownExample = (args) => (
  <MultiSelectDropDown {...args} />
);

MultiSelectDropDownExample.storyName = 'Default';
MultiSelectDropDownExample.args = {
  title: 'Filter by Format(s)',
  titleClasses: [],
  defaultText: 'All Formats',
  dropdownItems: [{
    label: 'PDF',
    value: 'pdf'
  }, {
    label: 'Excel',
    value: 'excel'
  }, {
    label: 'CSV',
    value: 'csv'
  }, {
    label: 'HTML',
    value: 'html'
  }, {
    label: 'JSON',
    value: 'json'
  }],
  onItemSelect: action('onItemSelect onClick'),
  onDropDownClick: action('onButtonClick onClick'),
  fieldName: 'formats'
};

export default {
  title: 'forms/molecules/MultiSelectDropDown',
  component: MultiSelectDropDown,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
