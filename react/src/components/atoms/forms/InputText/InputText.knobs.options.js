import { text, boolean, select, number } from '@storybook/addon-knobs/react';

export default {
  hiddenLabel: () => boolean('inputText.hiddenLabel', false),
  labelText: () => text('inputText.labelText', 'First name'),
  required: () => boolean('inputText.required', true),
  id: () => text('inputText.id', 'first-name'),
  name: () => text('inputText.name', 'first-name'),
  type: () => select('inputText.type', ['text', 'email', 'number'], 'text'),
  width: () => number('inputText.width', 0),
  maxlength: () => number('inputText.maxlength', 0),
  pattern: () => text('inputText.pattern', ''),
  placeholder: () => text('inputText.placeholder', ''),
  errorMsg: () => text('inputText.errorMsg', 'Please enter you first name (required).'),
  errorDisplay: () => boolean('inputText.errorDisplay', false),
  defaultText: () => text('inputText.defaultText', ''),
  disabled: () => boolean('inputText.disabled', false)
};
