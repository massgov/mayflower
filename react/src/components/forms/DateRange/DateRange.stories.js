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
        inputProps: {
          disabled: boolean('disabled', false)
        },
        groupProps: {
          labelProps: {
            labelText: text('labelText', 'Filter by date'),
            hidden: boolean('hiddenLabel', false)
          },
          showError: boolean('showError', false),
          errorMsg: text('errorMsg', 'EndDate Error: Please select a date.'),
          inline: boolean('inline', false),
        },
        startDate: {
          inputProps: {
            required: boolean('StartDate: required', false, 'StartDate'),
            id: text('StartDate: id', 'start-date', 'StartDate'),
            name: text('StartDate: name', 'start-date', 'StartDate'),
            onChange: action('startdate custom onchange callback function'),
            placeholder: text('StartDate: placeholder', 'today', 'StartDate'),
          },
          groupProps: {
            labelProps: {
              labelText: text('StartDate: labelText', 'Select a start date:', 'StartDate'),
            },
            showError: boolean('StartDate: showError', false, 'StartDate'),
            errorMsg: text('StartDate: errorMsg', 'StartDate Error: Please select a date.', 'StartDate'),
          },
          startDate: new Date(date('StartDate: defaultDate', new Date('Jan 01 2018'), 'StartDate'))
        },
        endDate: {
          inputProps: {
            placeholder: text('EndDate:placeholder', 'm/dd/yy', 'EndDate'),
            required: boolean('EndDate: required', false, 'EndDate'),
            id: text('EndDate: id', 'end-date', 'EndDate'),
            name: text('EndDate: name', 'end-date', 'EndDate'),
            onChange: action('enddate custom onchange callback function'),
          },
          groupProps: {
            labelProps: {
              labelText: text('EndDate: labelText', 'Select an end date:', 'EndDate')
            },
            showError: boolean('EndDate: showError', false, 'EndDate'),
            errorMsg: text('EndDate: errorMsg', 'EndDate Error: Please select a date.', 'EndDate'),
          },
          endDate: new Date(date('EndDate: defaultDate', new Date('Feb 01 2018'), 'EndDate')),
        }
      };
      return(
        <DateRange {...props} />
      );
    },
    { info: DateRangeDocs }
  );
