import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import SelectBox from 'MayflowerReactForms/SelectBox';
import selectOptions from 'MayflowerReactForms/SelectBox/SelectBox.knobs.options';
import inputOptions from 'MayflowerReactForms/InputTextFuzzy/InputTextFuzzy.knobs.options';
import HeaderSearch from '.';
import HeaderSearchDocs from './HeaderSearch.md';

export const HeaderSearchExample = (args) => <HeaderSearch {...args} />;

HeaderSearchExample.storyName = 'Default';
HeaderSearchExample.args = {
  placeholder: 'Search Mass.gov',
  buttonSearch: {
    onClick: action('Button clicked'),
    ariaLabel: '',
    text: 'Search',
    usage: ''
  },
  onSubmit: action('Form submitted'),
  onChange: action('Text input modified'),
  defaultText: '',
  orgDropdown: {
    dropdownButton: {
      text: 'All Organizations',
      capitalized: true
    },
    inputText: {
      boxed: true,
      label: null,
      placeholder: 'Search an organization...',
      id: 'org-typeahead',
      keys: ['text'],
      options: inputOptions.options.orgSelector,
      selected: '',
      onChange: action('orgDropdown onChange')
    }
  }
};


export const HeaderSearchPostInput = (args) => <HeaderSearch {...args} />;
HeaderSearchPostInput.args = {
  placeholder: 'Search Mass.gov',
  buttonSearch: {
    onClick: action('Button clicked'),
    ariaLabel: '',
    text: 'Search',
    usage: ''
  },
  onSubmit: action('Form submitted'),
  onChange: action('Text input modified'),
  defaultText: '',
  postInputFilter: (
    <SelectBox
      label=""
      stackLabel
      required
      id="distance-select"
      options={selectOptions.options.distance}
      selected={selectOptions.options.distance[0].text}
      onChangeCallback={action('SelectBox onChangeCallback')}
    />
  ),
  orgDropdown: {
    dropdownButton: {
      text: 'All Organizations',
      capitalized: true
    },
    inputText: {
      boxed: true,
      label: null,
      placeholder: 'Search an organization...',
      id: 'org-typeahead',
      keys: ['text'],
      options: inputOptions.options.orgSelector,
      selected: '',
      onChange: action('orgDropdown onChange')
    }
  }
};
HeaderSearchPostInput.argTypes = {
  selected: {
    control: {
      type: 'select',
      options: selectOptions.options.distance.map((option) => option.text)
    }
  }
};
export default {
  title: 'molecules/HeaderSearch',
  component: HeaderSearch,
  parameters: {
    docs: {
      page: () => <StoryPage Description={HeaderSearchDocs} />
    }
  }
};
