import { text, boolean, number, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

export default {
  hiddenLabel: () => boolean('InputCurrency.hiddenLabel', false),
  labelText: () => text('InputCurrency.labelText', 'Number Input'),
  required: () => boolean('InputCurrency.required', false),
  disabled: () => boolean('InputCurrency.disabled', false),
  id: () => text('InputCurrency.id', 'number-input'),
  name: () => text('InputCurrency.name', 'number-input'),
  width: () => number('InputCurrency.width', 0),
  maxlength: () => number('InputCurrency.maxlength', 20),
  placeholder: () => text('InputCurrency.placeholder', 'type something'),
  errorMsg: () => text('InputCurrency.errorMsg', 'you did not type something'),
  defaultValue: () => text('InputCurrency.defaultValue', ''),
  max: () => number('InputCurrency.max', 10000),
  min: () => number('InputCurrency.min', -1000),
  step: () => number('InputCurrency.step', 1),
  onChange: () => action('onChange'),
  onAdjust: () => action('onAdjust')
};
