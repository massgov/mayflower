import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputSliderOptions from './InputSlider.knobs.options';
import InputSliderDocs from './InputSlider.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputSlider', (() => {
      const InputSlider = lazy(() => import('./index'));
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
        { [k]: v() })));
      const ticks = [];
      Object.keys(inputTextOptionsWithKnobs.ticks).forEach((tick) => ticks.push([tick, inputTextOptionsWithKnobs.ticks[tick]]));
      inputTextOptionsWithKnobs.ticks = ticks;
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputSlider {...inputTextOptionsWithKnobs} />
        </Suspense>
      );
    }),
    { info: InputSliderDocs }
  );
