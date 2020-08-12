import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputSlider from './index';
import InputSliderOptions from './InputSlider.knobs.options';
import InputSliderDocs from './InputSlider.md';

storiesOf('forms/atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputSlider', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
        { [k]: v() })));
      const ticks = [];
      Object.keys(inputTextOptionsWithKnobs.ticks).forEach((tick) => ticks.push([tick, inputTextOptionsWithKnobs.ticks[tick]]));
      inputTextOptionsWithKnobs.ticks = ticks;
      return(
        <InputSlider {...inputTextOptionsWithKnobs} />
      );
    }),
    { info: InputSliderDocs }
  );
