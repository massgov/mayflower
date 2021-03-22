import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import InputTextFuzzy from './index';
import InputTextFuzzyDocs from './InputTextFuzzy.md';
import { orgs } from './orgsData.json';

export const InputTextFuzzyExample = (args) => (
  <InputTextFuzzy {...args} />
);

InputTextFuzzyExample.storyName = 'Default';
InputTextFuzzyExample.args = {
  boxed: false,
  disabled: false,
  label: 'State Organization',
  keys: ['text'],
  options: orgs,
  placeholder: 'All Organizations',
  id: 'org-typeahead',
  inputId: 'input-org-typeahead',
  selected: '',
  fuseOptions: {
    keys: ['text'],
    shouldSort: true,
    includeScore: true,
    minMatchCharLength: 1,
    ignoreLocation: true,
    ignoreFieldNorm: true,
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
      options: orgs.map((option) => option.text)
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
