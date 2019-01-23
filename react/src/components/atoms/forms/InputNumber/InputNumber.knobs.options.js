import { text, boolean, select, number } from '@storybook/addon-knobs/react';

export default {
  hiddenLabel: () => boolean('inputText.hiddenLabel', false),
  labelText: () => text('inputText.labelText', 'Text Input'),
  required: () => boolean('inputText.required', false),
  id: () => text('inputText.id', 'text-input'),
  name: () => text('inputText.name', 'text-input'),
  width: () => number('inputText.width', 0),
  maxlength: () => number('inputText.maxlength', 0),
  pattern: () => text('inputText.pattern', ''),
  placeholder: () => text('inputText.placeholder', 'type something'),
  errorMsg: () => text('inputText.errorMsg', 'you did not type something'),
  defaultText: () => text('inputText.defaultText', '0'),
};
