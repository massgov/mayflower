import { text, boolean, number, object, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  labelText: () => text('InputSlider: labelText', 'Slider', 'InputSlider'),
  id: () => text('InputSlider: id', 'slider', 'InputSlider'),
  disabled: () => boolean('InputSlider: disabled', false, 'InputSlider'),
  required: () => boolean('InputSlider: required', true, 'InputSlider'),
  defaultValue: () => text('InputSlider: defaultValue', '0.00', 'InputSlider'),
  axis: () => select('InputSlider: axis', ['x', 'y'], 'x', 'InputSlider'),
  max: () => number('InputSlider: max', 1, {}, 'InputSlider'),
  min: () => number('InputSlider: min', 0, {}, 'InputSlider'),
  step: () => number('InputSlider: step', 0.01, { min: 0, max: 1, step: 0.01 }, 'InputSlider'),
  ticks: () => object('InputSlider: ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }, 'InputSlider'),
  // Array knob converts numbers to strings - put it back to number.
  domain: () => array('InputSlider: domain', [0, 1], ',', 'InputSlider').map((num) => Number(num)),
  onChange: () => action('inputSlider.onChange'),
  onUpdate: () => action('inputSlider.onUpdate'),
  skipped: () => boolean('InputSlider: skipped', false, 'InputSlider'),
  displayValueFormat: () => select('InputSlider: displayValueFormat', ['percentage', 'value', null], 'percentage', 'InputSlider')
};
