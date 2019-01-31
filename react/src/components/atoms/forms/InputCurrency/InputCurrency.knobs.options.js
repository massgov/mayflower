import { text, boolean, number, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

export default {
  hiddenLabel: () => boolean('InputCurrency.hiddenLabel', false),
  labelText: () => text('InputCurrency.labelText', 'Currency Input'),
  required: () => boolean('InputCurrency.required', false),
  inline: () => boolean('InputCurrency.inline', false),
  disabled: () => boolean('InputCurrency.disabled', false),
  id: () => text('InputCurrency.id', 'currency-input'),
  name: () => text('InputCurrency.name', 'currency-input'),
  width: () => number('InputCurrency.width', 0),
  maxlength: () => number('InputCurrency.maxlength', 20),
  placeholder: () => text('InputCurrency.placeholder', 'type something'),
  errorMsg: () => text('InputCurrency.errorMsg', 'you did not type something'),
  defaultValue: () => text('InputCurrency.defaultValue', 0),
  max: () => number('InputCurrency.max', 10000),
  min: () => number('InputCurrency.min', -1000),
  step: () => number('InputCurrency.step', 0.01),
  format: () => object('InputCurrency.format', {
    mantissa: 2,
    trimMantissa: false,
    thousandSeparated: true,
    negative: 'parenthesis'
  }),
  language: () => select('InputCurrency.language', ['English', 'Chinese', 'French', 'Russian'], 'English'),
  onChange: () => action('onChange'),
  onBlur: () => action('onBlur')
};
