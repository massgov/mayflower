import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputCurrency from './index';
import InputCurrencyOptions from './InputCurrency.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputCurrency', withInfo('<div></div>')(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
      { [k]: v() })));
    inputTextOptionsWithKnobs.onChange = action('Text input modified');

    return(
      <InputCurrency {...inputTextOptionsWithKnobs} />
    );
  }));
