import { text, boolean, select, number } from '@storybook/addon-knobs';

export default {
  hiddenLabel: () => boolean('hiddenLabel', false),
  labelText: () => text('labelText', 'Text Input'),
  required: () => boolean('required', false),
  id: () => text('id', 'text-input'),
  name: () => text('name', 'text-input'),
  type: () => select('type', ['text', 'email', 'number'], 'text'),
  width: () => number('width', 0),
  maxlength: () => number('maxlength', 0),
  pattern: () => text('pattern', ''),
  placeholder: () => text('placeholder', 'type something'),
  errorMsg: () => text('errorMsg', ''),
  defaultText: () => text('defaultText', 'default text value')
};
