import { text, boolean, number, object, select } from '@storybook/addon-knobs/react';

export default {
  hiddenLabel: () => boolean('InputCurrency.hiddenLabel', false),
  labelText: () => text('InputCurrency.labelText', 'Text Input'),
  required: () => boolean('InputCurrency.required', false),
  id: () => text('InputCurrency.id', 'text-input'),
  name: () => text('InputCurrency.name', 'text-input'),
  width: () => number('InputCurrency.width', 0),
  maxlength: () => number('InputCurrency.maxlength', 20),
  placeholder: () => text('InputCurrency.placeholder', 'type something'),
  errorMsg: () => text('InputCurrency.errorMsg', 'you did not type something'),
  defaultText: () => text('InputCurrency.defaultText', '0'),
  max: () => number('InputCurrency.max', 10000),
  min: () => number('InputCurrency.min', -1000),
  step: () => number('InputCurrency.step', 0.01),
  format: () => object('InputCurrency.format', {
    mantissa: 2,
    trimMantissa: false,
    thousandSeparated: true,
    negative: 'parenthesis'
  }),
  language: () => select('InputCurrency.language', ['English', 'Chinese', 'French', 'Russian'], 'English')
};
