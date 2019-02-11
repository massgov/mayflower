import { text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

export default {
  id: () => text('InputCheckBox.id', 'input-checkbox'),
  label: () => text('InputCheckBox.label', 'input checkbox'),
  icon: () => text('InputCheckBox.icon', 'arrow'),
  defaultValue: () => boolean('InputCheckBox.checked', false)
};
