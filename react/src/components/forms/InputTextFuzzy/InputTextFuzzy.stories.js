import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, select, boolean, array } from '@storybook/addon-knobs';

import InputTextFuzzy from './index';
import InputTextFuzzyDocs from './InputTextFuzzy.md';
import inputOptions from './InputTextFuzzy.knobs.options';

storiesOf('forms|atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'InputTextFuzzy', (() => {
      const props = {
        inputProps: {
          id: text('inputId', 'input-org-typeahead'),
          disabled: boolean('disabled', false),
          selected: select(
            'selected',
            inputOptions.options.orgSelector.map((option) => option.text),
            ''
          ),
          placeholder: text('placeholder', 'All Organizations'),
          required: boolean('required', false)
        },
        groupProps: {
          labelProps: {
            labelText: text('labelText', 'State Organization'),
            hidden: boolean('hiddenLabel', false)
          },
          showError: boolean('showError', false),
          errorMsg: text('errorMsg', 'you did not type something'),
          inline: boolean('inline', false),
          helperText: text('helperText', '')
        },
        boxed: boolean('boxed', false),
        keys: array('keys', ['text']),
        options: inputOptions.options.orgSelector.filter((option) => option.text !== ''),
        id: text('id', 'org-typeahead'),
        fuseOptions: object('fuseOptions', {
          shouldSort: true,
          findAllMatches: true,
          includeMatches: true,
          threshold: 0.3,
          minMatchCharLength: 1,
          maxPatternLength: 300
        }),
        renderDefaultSuggestion: boolean('fuzzy renderDefaultSuggestion', true)
      };
      return(<InputTextFuzzy {...props} />);
    }),
    { info: InputTextFuzzyDocs }
  );
