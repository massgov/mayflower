import { text, boolean, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { svgOptions } from '../../icons/Icon/Icon.knob.options';

export default {
  id: () => text('InputCheckBox.id', 'input-checkbox'),
  label: () => text('InputCheckBox.label', 'Apply to all'),
  icon: () => select('InputCheckBox.icon', svgOptions, ''),
  defaultValue: () => boolean('InputCheckBox.checked', false),
  onChange: () => action('InputCheckBox.onChange'),
  disabled: () => boolean('InputCheckBox.disabled', false),
  required: () => boolean('InputCheckBox.required', false),
  errorMsg: () => text('InputCheckBox.errorMsg', 'You are required to check this box.')
};
