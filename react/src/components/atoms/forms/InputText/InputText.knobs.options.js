import { text, boolean, select, number } from '@storybook/addon-knobs';

export default {
  hiddenLabel: (value) => boolean('inputText.hiddenLabel', value),
  labelText: () => text('inputText.labelText', 'Text Input'),
  required: (value) => boolean('inputText.required', value),
  id: () => text('inputText.id', 'text-input'),
  name: () => text('inputText.name', 'text-input'),
  type: () => select('inputText.type', ['text', 'email', 'number'], 'text'),
  width: () => number('inputText.width', 0),
  maxlength: () => number('inputText.maxlength', 0),
  pattern: () => text('inputText.pattern', ''),
  placeholder: () => text('inputText.placeholder', 'type something'),
  errorMsg: () => text('inputText.errorMsg', 'you did not type something'),
  defaultText: () => text('inputText.defaultText', 'default text value')
};
