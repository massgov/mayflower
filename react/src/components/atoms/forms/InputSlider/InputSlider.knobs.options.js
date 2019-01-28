import { text, boolean, number, object, select, array } from '@storybook/addon-knobs/react';

export default {
  labelText: () => text('InputSlider.labelText', 'Text Input'),
  id: () => text('InputSlider.id', 'text-input'),
  disabled: () => boolean('InputSlider.disabled', false),
  defaultText: () => text('InputSlider.defaultText', '0'),
  axis: () => select('InputSlider.axis', ['x', 'y'], 'x'),
  max: () => number('InputSlider.max', 100),
  min: () => number('InputSlider.min', 0),
  step: () => number('InputSlider.step', 1),
  ticks: () => [
    [0, '0'],
    [60, 'Minimum requirement'],
    [100, '100%']
  ]
};
