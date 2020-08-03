import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { sub, add } from 'date-fns';
import InputDate from './index';
import InputDateDocs from './InputDate.md';
import inputDateOptions from './InputDate.knobs.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputDate', (() => {
      const defaultDate = new Date();
      const props = {
        labelText: text('labelText', 'Select a date:'),
        placeholder: text('placeholder', 'm/dd/yy'),
        required: boolean('required', true),
        id: text('id', 'date-input'),
        name: text('name', 'date-input'),
        onChangeCallback: action('custom-click on select'),
        defaultDate: new Date(date('defaultDate', defaultDate)),
        // One year ago.
        minDate: new Date(date('minDate', sub(new Date(), { years: 1 }))),
        // One year from now.
        maxDate: new Date(date('maxDate', add(new Date(), { years: 1 }))),
        format: select('format', inputDateOptions.format, 'M/dd/yyyy'),
        showError: boolean('showError', false),
        hiddenLabel: boolean('hiddenLabel', false),
        errorMsg: text('errorMsg', 'Please select a date.'),
        inline: boolean('inline', false),
        disabled: boolean('disabled', false),
        selectsRange: boolean('selectsRange', false)
      };
      if (props.selectsRange) {
        props.startDate = new Date(date('startDate', new Date()));
        props.endDate = new Date(date('endDate', new Date()));
      }
      return(
        <InputDate {...props} />
      );
    }),
    { info: InputDateDocs }
  );
