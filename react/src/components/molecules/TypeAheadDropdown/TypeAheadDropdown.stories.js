import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import TypeAheadDropdown from '.';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({escapeHTML: false}))
  .add('TypeAheadDropdown', (() => {
    const options = inputOptions.options.orgSelector;
    options[0] = { text: 'All Organizations', value: '' };
    const props = {
      dropdownButton: {
        text: text('TypeAheadDropdown.dropdownButton.text', 'All Organizations'),
        capitalized: boolean('TypeAheadDropdown.dropdownButton.capitalized', true)
      },
      inputText: {
        boxed: true,
        label: text('inputTextTypeAhead.label', null),
        placeholder: text('inputTextTypeAhead.placeholder', 'Search an organization...'),
        id: text('inputTextTypeAhead.id', 'org-typeahead'),
        options: object('inputTextTypeAhead.options', options),
        selected: select(
          'inputTextTypeAhead.defaultSelected',
          options.map((option) => option.text),
          ''
        ),
        onChange: action('TypeAheadDropdown inputText.onChange')
      },
      onKeyDown: action('TypeAheadDropdown onKeyDown')
    };
    return(
      <TypeAheadDropdown {...props} />
    );
  }));
