import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputSlider from '../CompoundSlider';
import InputSliderOptions from './InputSlider.knobs.options';
import InputSliderDocs from './InputSlider.md';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputSlider', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputSliderOptions).map(([k, v]) => (
        { [k]: v() })));

      const props = {
        inputProps: {
          id: inputTextOptionsWithKnobs.id,
          onBlur: inputTextOptionsWithKnobs.onBlur,
          onUpdate: inputTextOptionsWithKnobs.onUpdate,
          onChange: inputTextOptionsWithKnobs.onChange,
          required: inputTextOptionsWithKnobs.required,
          disabled: inputTextOptionsWithKnobs.disabled,
          step: inputTextOptionsWithKnobs.step,
        },
        ticks: inputTextOptionsWithKnobs.ticks,
        values: inputTextOptionsWithKnobs.values,
        skipped: inputTextOptionsWithKnobs.skipped,
        domain: inputTextOptionsWithKnobs.domain,
        axis: inputTextOptionsWithKnobs.axis,
        mantissa: inputTextOptionsWithKnobs.mantissa,
        displayValueFormat: inputTextOptionsWithKnobs.displayValueFormat,
        groupProps: {
          labelProps: {
            hidden: inputTextOptionsWithKnobs.hidden,
            labelText: inputTextOptionsWithKnobs.labelText
          },
          inline: inputTextOptionsWithKnobs.inline,
          errorMsg: inputTextOptionsWithKnobs.errorMsg,
          showError: inputTextOptionsWithKnobs.showError
        }
      };
      return(
        <InputSlider {...props} />
      );
    }),
    { info: InputSliderDocs }
  );
