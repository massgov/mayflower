import { text, boolean, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

export default {
  hiddenLabel: () => boolean('InputNumber.hiddenLabel', false),
  labelText: () => text('InputNumber.labelText', 'Number Input'),
  required: () => boolean('InputNumber.required', false),
  inline: () => boolean('InputNumber.inline', false),
  disabled: () => boolean('InputNumber.disabled', false),
  id: () => text('InputNumber.id', 'number-input'),
  name: () => text('InputNumber.name', 'number-input'),
  width: () => number('InputNumber.width', 0),
  maxlength: () => number('InputNumber.maxlength', 20),
  placeholder: () => text('InputNumber.placeholder', 'type something'),
  errorMsg: () => text('InputNumber.errorMsg', 'you did not type something'),
  defaultValue: () => number('InputNumber.defaultValue'),
  max: () => number('InputNumber.max', 10000),
  min: () => number('InputNumber.min', -1000),
  step: () => number('InputNumber.step', 1),
  onChange: () => action('InputNumber.onChange'),
  onBlur: () => action('InputNumber.onBlur'),
  unit: () => text('InputNumber.unit', ''),
  showButtons: () => boolean('InputNumber.hasButtons', true)
};
