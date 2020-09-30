import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import SearchBannerForm from '.';
import SearchBannerFormDocs from './SearchBannerForm.md';

export const SearchBannerFormExample = (args) => <SearchBannerForm {...args} />;

SearchBannerFormExample.storyName = 'Default';
SearchBannerFormExample.args = {
  action: '#',
  onSubmit: action('Form submitted'),
  inputText: {
    hiddenLabel: false,
    labelText: 'Search terms',
    required: false,
    id: 'GUID138490237',
    name: 'search',
    type: 'text',
    width: 0,
    maxlength: 0,
    pattern: '',
    placeholder: 'Search...',
    errorMsg: '',
    onChange: action('Text input modified')
  },
  buttonSearch: {
    classes: [],
    onClick: action('Search button clicked'),
    text: 'Search',
    ariaLabel: 'Search'
  }
};
SearchBannerFormExample.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['text', 'email', 'number']
    }
  }
};


export default {
  title: 'molecules/SearchBannerForm',
  component: SearchBannerForm,
  parameters: {
    docs: {
      page: () => <StoryPage Description={SearchBannerFormDocs} />
    }
  }
};
