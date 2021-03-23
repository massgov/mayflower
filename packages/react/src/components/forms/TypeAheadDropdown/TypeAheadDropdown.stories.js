import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';
import inputOptions from 'MayflowerReactForms/InputTextFuzzy/InputTextFuzzy.knobs.options';

import TypeAheadDropdown from '.';

export const TypeAheadDropdownExample = (args) => (
  <TypeAheadDropdown {...args} />
);

TypeAheadDropdownExample.storyName = 'Default';
TypeAheadDropdownExample.args = {
  dropdownButton: {
    text: 'All Organizations',
    capitalized: true
  },
  inputText: {
    boxed: true,
    disabled: false,
    keys: ['text'],
    options: inputOptions.options.orgSelector.filter((option) => option.text !== ''),
    placeholder: 'All Organizations',
    id: 'org-typeahead',
    inputId: 'input-org-typeahead',
    selected: '',
    fuseOptions: {
      shouldSort: true,
      findAllMatches: true,
      includeMatches: true,
      threshold: 0.3,
      minMatchCharLength: 1,
      maxPatternLength: 300
    },
    defaultValue: '',
    onKeyDown: action('onKeyDown event'),
    onFocus: action('onFocus event'),
    onBlur: action('onBlur event'),
    onSuggestionClick: action('onSuggestionClick called')
  }
};

export default {
  title: 'forms/molecules/TypeAheadDropdown',
  component: TypeAheadDropdown,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
