import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputTextTypeAhead from './index';
import inputOptions from './InputTextTypeAhead.knobs.options';
import InputTextTypeAheadDocs from './InputTextTypeAhead.md';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputTextTypeAhead', (() => {
      const props = {
        boxed: boolean('boxed', true),
        label: text('label', 'State Organization'),
        placeholder: text('placeholder', 'All Organizations'),
        id: text('id', 'org-typeahead'),
        options: object('options', inputOptions.options.orgSelector),
        selected: select(
          'selected',
          inputOptions.options.orgSelector.map((option) => option.text),
          ''
        ),
        onChange: action('InputTextTypeAhead onChange'),
        disabled: boolean('disabled', false)
      };
      return(<InputTextTypeAhead {...props} />);
    }),
    { info: InputTextTypeAheadDocs }
  );
