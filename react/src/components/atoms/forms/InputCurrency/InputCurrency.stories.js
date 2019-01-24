import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import InputCurrency from './index';
import InputCurrencyOptions from './InputCurrency.knobs.options';
import inputCurrencyText from './InputCurrency.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('InputCurrency', withInfo(`<div>${inputCurrencyText}</div>`)(() => {
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
  }));
