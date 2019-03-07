import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

import InputNumber from './index';
import InputNumberOptions from './InputNumber.knobs.options';
import InputNumberDocs from './InputNumber.md';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputNumber', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputNumberOptions).map(([k, v]) => (
        { [k]: v() })));
      return(
        <InputNumber {...inputTextOptionsWithKnobs} />
      );
    }),
    { info: InputNumberDocs }
  );
