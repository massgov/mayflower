import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputCurrencyOptions from './InputCurrency.knobs.options';
import InputCurrencyDocs from './InputCurrency.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCurrency', (() => {
      const InputCurrency = lazy(() => import('./index'));
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
        { [k]: v() })));
      const languages = new Map();
      languages.set('Chinese', 'zh-CN');
      languages.set('English', 'en-US');
      languages.set('French', 'fr-FR');
      languages.set('Russian', 'ru-RU');
      inputTextOptionsWithKnobs.language = languages.get(inputTextOptionsWithKnobs.language);
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputCurrency {...inputTextOptionsWithKnobs} />
        </Suspense>
      );
    }),
    { info: InputCurrencyDocs }
  );
