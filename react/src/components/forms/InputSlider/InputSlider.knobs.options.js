import { text, boolean, number, object, select, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  labelText: () => text('labelText', 'Family Leave', 'InputGroup'),
  id: () => text('id', 'text-input'),
  disabled: () => boolean('disabled', false, 'InputGroup'),
  required: () => boolean('required', true, 'InputGroup'),
  inline: () => boolean('inline', false, 'InputGroup'),
  showError: () => boolean('showError', false, 'InputGroup'),
  errorMsg: () => text('errorMsg', 'Please change the value.', 'InputGroup'),
  hidden: () => boolean('hidden label', false, 'InputGroup'),
  values: () => array('values', [0]),
  axis: () => select('axis', ['x', 'y'], 'x'),
  step: () => number('step', 0.01),
  mantissa: () => number('mantissa', 0),
  ticks: () => {
    const ticks = object('Ticks', [[0, '0%'], [0.6, 'Minimum requirement'], [1, '100%']], 'Ticks');
    const hideTicks = boolean('Hide ticks', false, 'Ticks');
    if (hideTicks) {
      return new Map();
    }
    return new Map(ticks);
  },
  // Array knob converts numbers to strings - put it back to number.
  domain: () => array('domain', [0, 1]).map((num) => Number(num)),
  onChange: () => action('inputSlider.onChange'),
  onUpdate: () => action('inputSlider.onUpdate'),
  skipped: () => boolean('skipped', false),
  displayValueFormat: () => select('displayValueFormat', ['percentage', 'value', null], 'percentage')
};
