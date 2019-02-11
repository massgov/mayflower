import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputNumber from './index';
import InputNumberOptions from './InputNumber.knobs.options';
import inputNumberText from './InputNumber.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputCheckBox', withInfo(`<div>${inputNumberText}</div>`)(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputNumberOptions).map(([k, v]) => (
      { [k]: v() })));
    return(
      <InputNumber {...inputTextOptionsWithKnobs} />
    );
  }));
