import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, select, boolean, array } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import InputTextFuzzy from './index';
import InputTextFuzzyDocs from './InputTextFuzzy.md';
import inputOptions from './InputTextFuzzy.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputTextFuzzy', (() => {
      const props = {
        boxed: boolean('boxed', false),
        disabled: boolean('disabled', false),
        label: text('label', 'State Organization'),
        keys: array('keys', ['text']),
        options: inputOptions.options.orgSelector.filter((option) => option.text !== ''),
        placeholder: text('placeholder', 'All Organizations'),
        id: text('id', 'org-typeahead'),
        inputId: text('inputId', 'input-org-typeahead'),
        selected: select(
          'selected',
          inputOptions.options.orgSelector.map((option) => option.text),
          ''
        ),
        fuseOptions: object('fuseOptions', {
          shouldSort: true,
          findAllMatches: true,
          includeMatches: true,
          threshold: 0.3,
          minMatchCharLength: 1,
          maxPatternLength: 300
        }),
        onChange: action('fuzzy input onChange'),
        onSuggestionClick: action('fuzzy suggestion onClick'),
        renderDefaultSuggestion: boolean('fuzzy renderDefaultSuggestion', true)
      };
      return(<InputTextFuzzy {...props} />);
    }),
    { info: InputTextFuzzyDocs }
  );
