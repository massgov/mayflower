import React, { lazy, Suspense } from 'react';


import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputRadioDocs from './InputRadio.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputRadio', (() => {
      const InputRadio = lazy(() => import('./index'));
      const props = {
        name: text('name', 'plant'),
        id: text('id', 'fern123'),
        value: text('value', 'fern'),
        label: text('label', 'Fern'),
        required: boolean('required', true),
        outline: boolean('outline', true),
        checked: boolean('checked', null),
        disabled: boolean('disabled', false),
        error: boolean('error', false),
        onChange: action('onChange')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputRadio {...props} />
        </Suspense>
      );
    }),
    { info: InputRadioDocs }
  );
