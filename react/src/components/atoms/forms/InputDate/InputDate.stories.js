import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputDateDocs from './InputDate.md';
import inputDateOptions from './InputDate.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputDate', (() => {
      const InputDate = lazy(() => import('./index'));
      const defaultDate = new Date('Jan 01 2018');
      const props = {
        labelText: text('labelText', 'Select a date:'),
        placeholder: text('placeholder', 'm/dd/yy'),
        required: boolean('required', true),
        id: text('id', 'date-input'),
        name: text('name', 'date-input'),
        restrict: select('restrict', inputDateOptions.restrict, ''),
        onChangeCallback: action('custom-click on select'),
        defaultDate: new Date(date('defaultDate', defaultDate)),
        format: select('format', inputDateOptions.format, 'M/DD/YYYY')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputDate {...props} />
        </Suspense>
      );
    }),
    { info: InputDateDocs }
  );
