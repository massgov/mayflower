import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputNumber from './index';
import InputNumberOptions from './InputNumber.knobs.options';
import InputNumberDocs from './InputNumber.md';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add(
    'InputNumber', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputNumberOptions).map(([k, v]) => (
        { [k]: v() })));
      const storyProps = {
        ...inputTextOptionsWithKnobs,
        style: (inputTextOptionsWithKnobs.inline) ? { width: '400px' } : { width: '200px' }
      };
      if (inputTextOptionsWithKnobs.width > 0) {
        storyProps.style = { width: `${inputTextOptionsWithKnobs.width}px` };
      }
      const props = {
        inputProps: {
          id: storyProps.id,
          name: storyProps.name,
          maxlength: storyProps.maxlength,
          min: storyProps.min,
          max: storyProps.max,
          step: storyProps.step,
          onBlur: storyProps.onBlur,
          onChange: storyProps.onChange,
          required: storyProps.required,
          disabled: storyProps.disabled,
          defaultValue: storyProps.defaultValue,
          placeholder: storyProps.placeholder,
        },
        groupProps: {
          labelProps: {
            hidden: storyProps.hidden,
            labelText: storyProps.labelText
          },
          inline: storyProps.inline,
          errorMsg: storyProps.errorMsg,
          showError: storyProps.showError
        },
        width: storyProps.width,
        showButtons: storyProps.showButtons
      };
      return(
        <InputNumber {...props} />
      );
    }),
    {
      info: InputNumberDocs
    }
  );
