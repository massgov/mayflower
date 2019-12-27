import { text, boolean, number, object, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  labelText: () => text('labelText', 'Family Leave'),
  id: () => text('id', 'text-input'),
  disabled: () => boolean('disabled', false),
  required: () => boolean('required', true),
  defaultValue: () => text('defaultValue', '0'),
  axis: () => select('axis', ['x', 'y'], 'x'),
  max: () => number('max', 1),
  min: () => number('min', 0),
  step: () => number('step', 0.01),
  ticks: () => object('ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }),
  // Array knob converts numbers to strings - put it back to number.
  domain: () => array('domain', [0, 1]).map((num) => Number(num)),
  onChange: () => action('inputSlider.onChange'),
  onUpdate: () => action('inputSlider.onUpdate'),
  skipped: () => boolean('skipped', false),
  displayValueFormat: () => select('displayValueFormat', ['percentage', 'value', null], 'percentage')
};
