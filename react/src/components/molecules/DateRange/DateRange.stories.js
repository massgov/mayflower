import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean, date } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import DateRange from './index';
import DateRangeDocs from './DateRange.md';
import inputDateOptions from '../../atoms/forms/InputDate/InputDate.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'DateRange', (() => {
      const props = {
        label: text('dateRange.label', 'Filter by date'),
        startDate: {
          labelText: text('dateRange.startDate.labelText', 'Select a start date:'),
          placeholder: text('dateRange.startDate.placeholder', 'today'),
          required: boolean('dateRange.startDate.required', false),
          id: text('dateRange.startDate.id', 'start-date'),
          name: text('dateRange.startDate.name', 'start-date'),
          restrict: select('dateRange.startDate.restrict', inputDateOptions.restrict, ''),
          onChangeCallback: action('startdate custom onchange callback function'),
          defaultDate: new Date(date('dateRange.startDate.defaultDate', new Date('Jan 01 2018')))
        },
        endDate: {
          labelText: text('dateRange.endDate.labelText', 'Select an end date:'),
          placeholder: text('dateRange.endDate.placeholder', 'm/dd/yy'),
          required: boolean('dateRange.endDate.required', false),
          id: text('dateRange.endDate.id', 'end-date'),
          name: text('dateRange.endDate.name', 'end-date'),
          restrict: select('dateRange.endDate.restrict', inputDateOptions.restrict, ''),
          onChangeCallback: action('enddate custom onchange callback function'),
          defaultDate: new Date(date('dateRange.endDate.defaultDate', new Date('Feb 01 2018')))
        }
      };
      return(
        <DateRange {...props} />
      );
    }),
    { info: DateRangeDocs }
  );
