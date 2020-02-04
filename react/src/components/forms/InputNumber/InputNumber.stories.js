import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputNumber from './index';
import InputNumberOptions from './InputNumber.knobs.options';
import InputNumberDocs from './InputNumber.md';

storiesOf('forms', module)
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add(
    'InputNumber', (() => {
      const inputTextOptionsWithKnobs = {};
      Object.getOwnPropertyNames(InputNumberOptions).forEach((key) => {
        inputTextOptionsWithKnobs[key] = InputNumberOptions[key]();
      });
      const storyProps = {
        style: (inputTextOptionsWithKnobs.inline) ? { width: '400px' } : { width: '200px' }
      };
      if (inputTextOptionsWithKnobs.width > 0) {
        storyProps.style = { width: `${inputTextOptionsWithKnobs.width}px` };
      }
      return(
        <div {...storyProps}>
          <InputNumber {...inputTextOptionsWithKnobs} />
        </div>
      );
    }),
    {
      info: InputNumberDocs
    }
  );
