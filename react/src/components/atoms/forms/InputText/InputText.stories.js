import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputTextDocs from './InputText.md';
import InputTextOptions from './InputText.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputText', (() => {
      const InputText = lazy(() => import('./index'));
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputTextOptions).map(([k, v]) => {
        return(
          { [k]: v() }
        );
      }));
      inputTextOptionsWithKnobs.onChange = action('Text input modified');

      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputText {...inputTextOptionsWithKnobs} />
        </Suspense>
      );
    }),
    { info: InputTextDocs }
  );
