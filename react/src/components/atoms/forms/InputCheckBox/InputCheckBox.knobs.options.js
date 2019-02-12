import { text, boolean, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { svgOptions } from '../../icons/Icon/Icon.knob.options';

export default {
  id: () => text('InputCheckBox.id', 'input-checkbox'),
  label: () => text('InputCheckBox.label', 'Apply to all'),
  icon: () => select('InputCheckBox.icon', svgOptions, ''),
  defaultValue: () => boolean('InputCheckBox.checked', false),
  onChange: () => action('InputCheckBox.onChange')
};
