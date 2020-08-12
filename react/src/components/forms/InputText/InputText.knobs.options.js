import { text, boolean, select, number } from '@storybook/addon-knobs';

export default {
  hidden: () => boolean('hiddenLabel', false),
  labelText: () => text('labelText', 'Text Input'),
  required: () => boolean('required', false),
  id: () => text('id', 'text-input'),
  name: () => text('name', 'text-input'),
  type: () => select('type', ['text', 'email', 'number', 'search'], 'text'),
  width: () => number('width'),
  maxlength: () => number('maxlength', 0),
  pattern: () => text('pattern', ''),
  placeholder: () => text('placeholder', 'type something'),
  errorMsg: () => text('errorMsg', 'you did not type something'),
  showError: () => boolean('showError', false),
  defaultValue: () => text('defaultValue', 'default text value'),
  inline: () => boolean('inline', false),
  helperText: () => text('helperText', '')
};
