import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputTextFuzzy from './index';
import InputTextFuzzyDocs from './InputTextFuzzy.md';
import inputOptions from './InputTextFuzzy.knobs.options';

export const InputTextFuzzyExample = (args) => (
  <InputTextFuzzy {...args} />
);

InputTextFuzzyExample.storyName = 'Default';
InputTextFuzzyExample.args = {
  boxed: false,
  disabled: false,
  label: 'State Organization',
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
  onKeyDown: action('onKeyDown event'),
  onChange: action('onChange event'),
  onFocus: action('onFocus event'),
  onBlur: action('onBlur event'),
  onSuggestionClick: action('onSuggestionClick called'),
  renderDefaultSuggestion: true
};
InputTextFuzzyExample.argTypes = {
  selected: {
    control: {
      type: 'select',
      options: inputOptions.options.orgSelector.map((option) => option.text)
    }
  }
};

export default {
  title: 'forms/atoms/InputTextFuzzy',
  component: InputTextFuzzy,
  parameters: {
    docs: {
      page: () => <StoryPage Description={InputTextFuzzyDocs} />
    }
  }
};
