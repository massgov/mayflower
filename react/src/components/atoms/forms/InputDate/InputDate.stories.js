import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputDate from './index';
import InputDateDocs from './InputDate.md';
import inputDateOptions from './InputDate.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputDate', (() => {
      const props = {
        labelText: text('inputDate.labelText', 'Select a date:'),
        placeholder: text('inputDate.placeholder', 'm/dd/yy'),
        required: boolean('inputDate.required', true),
        id: text('inputDate.id', 'date-input'),
        name: text('inputDate.name', 'date-input'),
        restrict: select('inputDate.restrict', inputDateOptions.restrict, ''),
        onChangeCallback: action('custom-click on select'),
        defaultDate: new Date(date('dateRange.endDate.defaultDate', new Date('Jan 01 2018'))),
        format: select('inputData.format', inputDateOptions.format, 'M/DD/YYYY')
      };
      return(
        <InputDate {...props} />
      );
    }),
    { info: InputDateDocs }
  );
