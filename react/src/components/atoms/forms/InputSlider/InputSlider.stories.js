import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputSlider from './index';
import InputSliderOptions from './InputSlider.knobs.options';
import inputSliderText from './InputSlider.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputSlider', withInfo(`<div>${inputSliderText}</div>`)(() => {
    const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
      { [k]: v() })));
    return(
      <InputSlider {...inputTextOptionsWithKnobs} />
    );
  }));
