import { text, boolean, number, object, select } from '@storybook/addon-knobs/react';

export default {
  labelText: () => text('InputSlider.labelText', 'Text Input'),
  id: () => text('InputSlider.id', 'text-input'),
  name: () => text('InputSlider.name', 'text-input'),
  defaultText: () => text('InputSlider.defaultText', '0'),
  axis: () => select('InputSlider.axis', ['x', 'y'], 'x'),
  max: () => number('InputSlider.max', 100),
  min: () => number('InputSlider.min', 0),
  step: () => number('InputSlider.step', 1),
};
