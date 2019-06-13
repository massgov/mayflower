import React, { lazy, Suspense } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

// import InputNumber from './index';
import InputNumberOptions from './InputNumber.knobs.options';
import InputNumberDocs from './InputNumber.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({
    escapeHTML: false
  }))
  .add(
    'InputNumber', (() => {
      const InputNumber = lazy(() => import('./index'));
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
        <Suspense fallback={<div>Loading...</div>}>
          <div {...storyProps}>
            <InputNumber {...inputTextOptionsWithKnobs} />
          </div>
        </Suspense>
      );
    }),
    {
      info: InputNumberDocs
    }
  );
