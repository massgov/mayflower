import { text, boolean, number, object, select, array } from '@storybook/addon-knobs/react';

export default {
  labelText: () => text('InputSlider.labelText', 'Family Leave'),
  id: () => text('InputSlider.id', 'text-input'),
  disabled: () => boolean('InputSlider.disabled', false),
  required: () => boolean('InputSlider.required', true),
  defaultValue: () => text('InputSlider.defaultValue', '0'),
  axis: () => select('InputSlider.axis', ['x', 'y'], 'x'),
  max: () => number('InputSlider.max', 100),
  min: () => number('InputSlider.min', 0),
  step: () => number('InputSlider.step', 0.1),
  ticks: () => object('InputSlider.ticks', { 0: '0%', 0.6: 'Minimum requirement', 1: '100%' }),
  domain: () => object('InputSlider.domain', { 0: '0', 1: '1' })
};
