import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputCheckBoxOptions from './InputCheckBox.knobs.options';
import inputCheckBoxDocs from './InputCheckBox.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCheckBox', (() => {
      const InputCheckBox = lazy(() => import('./index'));
      const inputCheckBoxOptionsWithKnobs = Object.assign(...Object.entries(InputCheckBoxOptions).map(([k, v]) => (
        k === 'icon' ? { icon: { name: v(), ariaHidden: true } } : { [k]: v() })));
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputCheckBox {...inputCheckBoxOptionsWithKnobs} />
        </Suspense>
      );
    }),
    { info: inputCheckBoxDocs }
  );
