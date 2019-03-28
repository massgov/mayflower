import { text, boolean, number, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';


export default {
  hiddenLabel: () => boolean('InputCurrency: hiddenLabel', false, 'InputCurrency'),
  labelText: () => text('InputCurrency: labelText', 'Currency Input', 'InputCurrency'),
  required: () => boolean('InputCurrency: required', false, 'InputCurrency'),
  inline: () => boolean('InputCurrency: inline', false, 'InputCurrency'),
  disabled: () => boolean('InputCurrency: disabled', false, 'InputCurrency'),
  id: () => text('InputCurrency: id', 'currency-input', 'InputCurrency'),
  name: () => text('InputCurrency: name', 'currency-input', 'InputCurrency'),
  width: () => number('InputCurrency: width', 0, {}, 'InputCurrency'),
  maxlength: () => number('InputCurrency: maxlength', 20, {}, 'InputCurrency'),
  placeholder: () => text('InputCurrency: placeholder', '$0.00', 'InputCurrency'),
  errorMsg: () => text('InputCurrency: errorMsg', 'you did not type something', 'InputCurrency'),
  defaultValue: () => text('InputCurrency: defaultValue', null, 'InputCurrency'),
  max: () => number('InputCurrency: max', 1000, {}, 'InputCurrency'),
  min: () => number('InputCurrency: min', 0, {}, 'InputCurrency'),
  step: () => number('InputCurrency: step', 0.01, {}, 'InputCurrency'),
  format: () => object('InputCurrency: format', {
    mantissa: 2,
    trimMantissa: false,
    thousandSeparated: true,
    negative: 'parenthesis'
  }, 'InputCurrency'),
  onChange: () => action('onChange'),
  language: () => select('InputCurrency: language', ['English', 'Chinese', 'French', 'Russian'], 'English', 'InputCurrency')
};
