import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, optionsKnob } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import TypeAheadDropdown from '.';
import inputOptions from '../../forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

storiesOf('molecules', module)
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
        label: text('TypeAheadDropdown inputText: label', null, 'InputTextTypeAhead'),
        placeholder: text('TypeAheadDropdown inputText: placeholder', 'Search an organization...', 'InputTextTypeAhead'),
        id: text('TypeAheadDropdown inputText: id', 'org-typeahead', 'InputTextTypeAhead'),
        options: object('TypeAheadDropdown inputText: options', options, 'InputTextTypeAhead Options'),
        selected: optionsKnob(
          'TypeAheadDropdown inputText: selected',
          Object.assign({}, ...(options.map((option) => ({ [option.text]: option.text })).values())),
          '',
          { display: 'select' },
          'InputTextTypeAhead'
        ),
        onChange: action('TypeAheadDropdown inputText.onChange')
      },
      onKeyDown: action('TypeAheadDropdown onKeyDown')
    };
    return(
      <TypeAheadDropdown {...props} />
    );
  }));
