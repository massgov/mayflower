import { text, boolean, number, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';


export default {
  hidden: () => boolean('hiddenLabel', false),
  labelText: () => text('labelText', 'Currency Input'),
  required: () => boolean('required', false),
  inline: () => boolean('inline', false),
  disabled: () => boolean('disabled', false),
  id: () => text('id', 'currency-input'),
  name: () => text('name', 'currency-input'),
  width: () => number('width', 0),
  maxlength: () => number('maxlength', 20),
  placeholder: () => text('placeholder', '$0.00'),
  errorMsg: () => text('errorMsg', 'you did not type something'),
  defaultValue: () => text('defaultValue', 0.00),
  max: () => number('max', 1000),
  min: () => number('min', 0),
  step: () => number('step', 0.01),
  format: () => object('format', {
    mantissa: 2,
    trimMantissa: false,
    thousandSeparated: true,
    negative: 'parenthesis'
  }),
  showError: () => boolean('showError', false),
  showButtons: () => boolean('showButtons', true),
  onChange: () => action('onChange'),
  onBlur: () => action('onBlur'),
  language: () => select('language', ['English', 'Chinese', 'French', 'Russian'], 'English')
};
