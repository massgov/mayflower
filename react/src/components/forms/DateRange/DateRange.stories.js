import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import DateRange from './index';
import DateRangeDocs from './DateRange.md';

storiesOf('forms|molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DateRange', () => {
      const props = {
        labelText: text('labelText', 'Filter by date'),
        startDate: {
          labelText: text('StartDate: labelText', 'Select a start date:', 'StartDate'),
          placeholder: text('StartDate: placeholder', 'today', 'StartDate'),
          required: boolean('StartDate: required', false, 'StartDate'),
          id: text('StartDate: id', 'start-date', 'StartDate'),
          name: text('StartDate: name', 'start-date', 'StartDate'),
          onChangeCallback: action('startdate custom onchange callback function'),
          startDate: new Date(date('StartDate: defaultDate', new Date('Jan 01 2018'), 'StartDate')),
          showError: boolean('StartDate: showError', false, 'StartDate'),
          errorMsg: text('StartDate: errorMsg', 'StartDate Error: Please select a date.', 'StartDate'),
        },
        endDate: {
          labelText: text('EndDate: labelText', 'Select an end date:', 'EndDate'),
          placeholder: text('EndDate:placeholder', 'm/dd/yy', 'EndDate'),
          required: boolean('EndDate: required', false, 'EndDate'),
          id: text('EndDate: id', 'end-date', 'EndDate'),
          name: text('EndDate: name', 'end-date', 'EndDate'),
          onChangeCallback: action('enddate custom onchange callback function'),
          endDate: new Date(date('EndDate: defaultDate', new Date('Feb 01 2018'), 'EndDate')),
          showError: boolean('EndDate: showError', false, 'EndDate'),
          errorMsg: text('EndDate: errorMsg', 'EndDate Error: Please select a date.', 'EndDate'),
        },
        showError: boolean('showError', false),
        errorMsg: text('errorMsg', 'EndDate Error: Please select a date.'),
        hiddenLabel: boolean('hiddenLabel', false),
        inline: boolean('inline', false),
        disabled: boolean('disabled', false)
      };
      return(
        <DateRange {...props} />
      );
    },
    { info: DateRangeDocs }
  );
