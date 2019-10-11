import { text, boolean, select, array } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { svgOptions } from '../../icons/Icon/Icon.knob.options';

export default {
  id: () => text('id', 'input-checkbox'),
  label: () => text('label', 'Apply to all'),
  icon: () => select('icon', svgOptions, ''),
  defaultValue: () => boolean('checked', false),
  onChange: () => action('onChange'),
  disabled: () => boolean('disabled', false),
  required: () => boolean('required', false),
  errorMsg: () => text('errorMsg', 'You are required to check this box.'),
  labelText: () => text('labelText', 'Checkbox Input'),
  classes: array('classes', [])
};
