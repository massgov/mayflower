import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputCurrency from './index';
import InputCurrencyOptions from './InputCurrency.knobs.options';
import InputCurrencyDocs from './InputCurrency.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputCurrency', (() => {
      const inputTextOptionsWithKnobs = Object.assign(...Object.entries(InputCurrencyOptions).map(([k, v]) => (
        { [k]: v() })));
      const languages = new Map();
      languages.set('Chinese', 'zh-CN');
      languages.set('English', 'en-US');
      languages.set('French', 'fr-FR');
      languages.set('Russian', 'ru-RU');
      inputTextOptionsWithKnobs.language = languages.get(inputTextOptionsWithKnobs.language);
      return(
        <InputCurrency {...inputTextOptionsWithKnobs} />
      );
    }),
    { info: InputCurrencyDocs }
  );
