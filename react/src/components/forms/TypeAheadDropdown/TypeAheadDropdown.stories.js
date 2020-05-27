import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, array, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TypeAheadDropdown from '.';
import inputOptions from '../InputTextFuzzy/InputTextFuzzy.knobs.options';

storiesOf('forms|molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('TypeAheadDropdown', (() => {
    const options = inputOptions.options.orgSelector;
    options[0] = { text: 'All Organizations', value: '' };
    const props = {
      dropdownButton: {
        text: text('TypeAheadDropdown dropdownButton: text', 'All Organizations', 'DropdownButton'),
        capitalized: boolean('TypeAheadDropdown dropdownButton: capitalized', true, 'DropdownButton')
      },
      inputText: {
        boxed: true,
        disabled: boolean('disabled', false),
        keys: array('keys', ['text']),
        options: inputOptions.options.orgSelector.filter((option) => option.text !== ''),
        placeholder: text('placeholder', 'All Organizations'),
        id: text('id', 'org-typeahead'),
        inputId: text('inputId', 'input-org-typeahead'),
        selected: select(
          'selected',
          options.map((option) => option.text),
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
        onKeyDown: action('onKeyDown event'),
        onKeyUp: action('onKeyUp event'),
        onFocus: action('onFocus event'),
        onBlur: action('onBlur event'),
        onSuggestionClick: action('onSuggestionClick called'),
        renderDefaultSuggestion: boolean('fuzzy renderDefaultSuggestion', true)
      }
    };
    return(
      <TypeAheadDropdown {...props} />
    );
  }));
