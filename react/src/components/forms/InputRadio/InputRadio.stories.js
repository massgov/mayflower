import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputRadio from './index';
import InputRadioDocs from './InputRadio.md';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputRadio', (() => {
      const props = {
        name: text('name', 'plant'),
        id: text('id', 'fern123'),
        value: text('value', 'fern'),
        label: text('label', 'Fern'),
        required: boolean('required', true),
        outline: boolean('outline', true),
        defaultChecked: boolean('defaultChecked', false),
        disabled: boolean('disabled', false),
        showError: boolean('showError', false),
        labelText: text('labelText', 'Input Radio'),
        hiddenLabel: boolean('hiddenLabel', false),
        errorMsg: text('errorMsg', 'you did not type something'),
        inline: boolean('inline', false)
      };
      return(
        <InputRadio {...props} onChange={action('onChange')} />
      );
    }),
    { info: InputRadioDocs }
  );
