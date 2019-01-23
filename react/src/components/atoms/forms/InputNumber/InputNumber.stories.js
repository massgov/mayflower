import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import {number, withKnobs} from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import Currency, { Input } from './index';
import InputTextOptions from './InputNumber.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputNumber', withInfo('<div></div>')(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputTextOptions).map(([k, v]) => (
      { [k]: v() })));
    inputTextOptionsWithKnobs.onChange = action('Text input modified');
    const currencyProps = {
      max: number('inputNumber.max', 1000000000),
      min: number('inputNumber.min', -100000000),
      step: number('inputNumber.step', 0.01)
    };

    return(
      <Input {...inputTextOptionsWithKnobs}>
        <Currency {...currencyProps} />
      </Input>
    );
  }));
