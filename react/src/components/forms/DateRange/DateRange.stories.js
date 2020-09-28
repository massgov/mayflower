import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import DateRange from './index';
import DateRangeDocs from './DateRange.md';

export const DateRangeExample = (args) => (
  <DateRange {...args} />
);
DateRangeExample.storyName = 'Default';
DateRangeExample.args = {
  label: 'Filter by date',
  startDate: {
    labelText: 'Select a start date:',
    placeholder: 'today',
    required: false,
    id: 'start-date',
    name: 'start-date',
    restrict: '',
    onChangeCallback: action('startdate custom onchange callback function'),
    defaultDate: new Date('Jan 01 2018')
  },
  endDate: {
    labelText: 'Select an end date:',
    placeholder: 'm/dd/yy',
    required: false,
    id: 'end-date',
    name: 'end-date',
    restrict: '',
    onChangeCallback: action('enddate custom onchange callback function'),
    defaultDate: new Date('Feb 01 2018')
  }
};

export default {
  title: 'forms/molecules/DateRange',
  component: DateRange,
  parameters: {
    docs: {
      page: () => <StoryPage Description={DateRangeDocs} />
    }
  }
};
