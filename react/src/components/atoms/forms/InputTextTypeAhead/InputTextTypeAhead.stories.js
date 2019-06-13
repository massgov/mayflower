import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import inputOptions from './InputTextTypeAhead.knobs.options';
import InputTextTypeAheadDocs from './InputTextTypeAhead.md';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputTextTypeAhead', (() => {
      const InputTextTypeAhead = lazy(() => import('./index'));
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
        disabled: boolean('disabled', false),
        onKeyDown: action('down')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <InputTextTypeAhead {...props} />
        </Suspense>
      );
    }),
    { info: InputTextTypeAheadDocs }
  );
