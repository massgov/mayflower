import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import InputTextTypeAhead from './index';
import inputOptions from './InputTextTypeAhead.knobs.options';
import InputTextTypeAheadDocs from './InputTextTypeAhead.md';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add(
    'InputTextTypeAhead',
    withInfo(`<div>${InputTextTypeAheadDocs}</div>`)(() => {
      const props = {
        label: text('inputTextTypeAhead.label', 'State Organization'),
        placeholder: text('inputTextTypeAhead.placeholder', 'All Organizations'),
        id: text('inputTextTypeAhead.id', 'org-typeahead'),
        options: object('inputTextTypeAhead.options', inputOptions.options.orgSelector),
        selected: select('inputTextTypeAhead.defaultSelected', inputOptions.options.orgSelector.map((option) => option.text), inputOptions.options.orgSelector[0].text)
      };
      return(<InputTextTypeAhead {...props} onChange={action('InputTextTypeAhead onChange')} />);
    })
  );
