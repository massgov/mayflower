import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputTextTypeAhead from './index';
import inputOptions from './InputTextTypeAhead.knobs.options';
import InputTextTypeAheadDocs from './InputTextTypeAhead.md';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'InputTextTypeAhead', (() => {
      const props = {
        boxed: boolean('inputTextTypeAhead.boxed', true),
        label: text('inputTextTypeAhead.label', 'State Organization'),
        placeholder: text('inputTextTypeAhead.placeholder', 'All Organizations'),
        id: text('inputTextTypeAhead.id', 'org-typeahead'),
        options: object('inputTextTypeAhead.options', inputOptions.options.orgSelector),
        selected: select(
          'inputTextTypeAhead.selected',
          inputOptions.options.orgSelector.map((option) => option.text),
          ''
        ),
        onChange: action('InputTextTypeAhead onChange'),
        disabled: boolean('InputTextTypeAhead.disabled', false)
      };
      return(<InputTextTypeAhead {...props} />);
    }),
    { info: InputTextTypeAheadDocs }
  );
