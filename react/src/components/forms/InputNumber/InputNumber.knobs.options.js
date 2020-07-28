import { text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  hiddenLabel: () => boolean('hiddenLabel', false),
  labelText: () => text('labelText', 'Number Input'),
  required: () => boolean('required', false),
  inline: () => boolean('inline', false),
  disabled: () => boolean('disabled', false),
  id: () => text('id', 'number-input'),
  name: () => text('name', 'number-input'),
  width: () => number('width', 0),
  maxlength: () => number('maxlength', 20),
  placeholder: () => text('placeholder', '0'),
  errorMsg: () => text('errorMsg', 'you did not type something'),
  showError: () => boolean('showError', false),
  defaultValue: () => number('defaultValue', 20),
  max: () => number('max', 100),
  min: () => number('min', 0),
  step: () => number('step', 1),
  onChange: () => action('onChange'),
  onBlur: () => action('onBlur'),
  unit: () => text('unit', ''),
  showButtons: () => boolean('hasButtons', true)
};
