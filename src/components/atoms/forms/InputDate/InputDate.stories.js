import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';

import InputDate from './index';
import InputDateDocs from './InputDate.md';
import inputDateOptions from './InputDate.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputDate', withInfo(`<div>${InputDateDocs}</div>`)(() => {
    const props = {
      labelText: text('inputDate.labelText', 'Select a date:'),
      placeholder: text('inputDate.placeholder', 'mm/dd/yy'),
      required: boolean('inputDate.required', true),
      id: text('inputDate.id', 'date-input'),
      name: text('inputDate.name', 'date-input'),
      restrict: select('inputDate.restrict', inputDateOptions.restrict)
    };
    return(
      <InputDate {...props} />
    );
  }));
