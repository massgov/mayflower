import { text, boolean, number, object, select, array } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

export default {
  labelText: () => text('InputSlider.labelText', 'Family Leave'),
  id: () => text('InputSlider.id', 'text-input'),
  disabled: () => boolean('InputSlider.disabled', false),
  required: () => boolean('InputSlider.required', true),
  defaultValue: () => text('InputSlider.defaultValue', '0'),
  axis: () => select('InputSlider.axis', ['x', 'y'], 'x'),
  max: () => number('InputSlider.max', 1),
  min: () => number('InputSlider.min', 0),
  step: () => number('InputSlider.step', 0.01),
  ticks: () => object('InputSlider.ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }),
  // Array knob converts numbers to strings - put it back to number.
  domain: () => array('InputSlider.domain', [0, 1]).map((num) => Number(num)),
  onChange: () => action('inputSlide.onChange'),
  skipped: () => boolean('InputSlider.skipped', false),
  displayValueFormat: () => select('InputSlider.displayValueFormat', ['percentage', 'value', null], 'percentage')
};
