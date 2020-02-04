import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select, boolean, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import DateRange from './index';
import DateRangeDocs from './DateRange.md';
import inputDateOptions from '../InputDate/InputDate.knobs.options';

storiesOf('forms|molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DateRange', () => {
      const props = {
        label: text('label', 'Filter by date'),
        startDate: {
          labelText: text('StartDate: labelText', 'Select a start date:', 'StartDate'),
          placeholder: text('StartDate: placeholder', 'today', 'StartDate'),
          required: boolean('StartDate: required', false, 'StartDate'),
          id: text('StartDate: id', 'start-date', 'StartDate'),
          name: text('StartDate: name', 'start-date', 'StartDate'),
          restrict: select('StartDate: restrict', inputDateOptions.restrict, '', 'StartDate'),
          onChangeCallback: action('startdate custom onchange callback function'),
          defaultDate: new Date(date('StartDate: defaultDate', new Date('Jan 01 2018'), 'StartDate'))
        },
        endDate: {
          labelText: text('EndDate: labelText', 'Select an end date:', 'EndDate'),
          placeholder: text('EndDate:placeholder', 'm/dd/yy', 'EndDate'),
          required: boolean('EndDate: required', false, 'EndDate'),
          id: text('EndDate: id', 'end-date', 'EndDate'),
          name: text('EndDate: name', 'end-date', 'EndDate'),
          restrict: select('EndDate: restrict', inputDateOptions.restrict, '', 'EndDate'),
          onChangeCallback: action('enddate custom onchange callback function'),
          defaultDate: new Date(date('EndDate: defaultDate', new Date('Feb 01 2018'), 'EndDate'))
        }
      };
      return(
        <DateRange {...props} />
      );
    },
    { info: DateRangeDocs }
  );
