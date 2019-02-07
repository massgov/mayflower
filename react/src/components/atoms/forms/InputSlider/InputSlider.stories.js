import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputSlider from './index';
import InputSliderOptions from './InputSlider.knobs.options';
import InputSliderDocs from './InputSlider.md';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputSlider', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
        { [k]: v() })));
      const ticks = [];
      const domain = [];
      Object.keys(inputTextOptionsWithKnobs.ticks).forEach((tick) => ticks.push([tick, inputTextOptionsWithKnobs.ticks[tick]]));
      inputTextOptionsWithKnobs.ticks = ticks;
      // Object knob converts numbers to strings - put it back to number.
      Object.keys(inputTextOptionsWithKnobs.domain).forEach((range) => domain.push(Number(range)));
      inputTextOptionsWithKnobs.domain = domain;
      return(
        <InputSlider {...inputTextOptionsWithKnobs} />
      );
    }),
    { info: InputSliderDocs }
  );
