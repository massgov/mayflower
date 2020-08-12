import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import InputCurrency from './index';
import InputCurrencyOptions from './InputCurrency.knobs.options';
import InputCurrencyDocs from './InputCurrency.md';

storiesOf('forms|atoms', module)
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
      const storyProps = {
        ...inputTextOptionsWithKnobs
      };
      const {
        id, name, maxlength, min, max, step, onBlur, onChange, required, disabled, defaultValue, placeholder,
        hidden, labelText, inline, errorMsg, showError, width, showButtons, format
      } = storyProps;
      const props = {
        inputProps: {
          id,
          name,
          maxlength,
          min,
          max,
          step,
          onBlur,
          onChange,
          required,
          disabled,
          defaultValue,
          placeholder
        },
        groupProps: {
          labelProps: {
            hidden,
            labelText
          },
          inline,
          errorMsg,
          showError
        },
        width,
        showButtons,
        format
      };
      return(
        <InputCurrency {...props} />
      );
    }),
    { info: InputCurrencyDocs }
  );
