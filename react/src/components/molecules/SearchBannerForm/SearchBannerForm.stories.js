import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, array, text, boolean, select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SearchBannerForm from '.';
import SearchBannerDocs from './SearchBannerForm.md';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SearchBannerForm', (() => {
      const props = {
        action: '#',
        onSubmit: action('Form submitted'),
        inputText: {
          hiddenLabel: boolean('SearchBannerForm inputText: hiddenLabel', false, 'InputText'),
          labelText: text('SearchBannerForm inputText: labelText', 'Search terms', 'InputText'),
          required: boolean('SearchBannerForm inputText: required', false, 'InputText'),
          id: text('SearchBannerForm inputText: id', 'GUID138490237', 'InputText'),
          name: text('SearchBannerForm inputText: name', 'search', 'InputText'),
          type: select('SearchBannerForm inputText: type', ['text', 'email', 'number'], 'text', 'InputText'),
          width: number('SearchBannerForm inputText: width', 0, 'InputText'),
          maxlength: number('SearchBannerForm inputText: maxlength', 0, 'InputText'),
          pattern: text('SearchBannerForm inputText: pattern', '', 'InputText'),
          placeholder: text('SearchBannerForm inputText: placeholder', 'Search...', 'InputText'),
          errorMsg: text('SearchBannerForm inputText: errorMsg', '', 'InputText'),
          onChange: action('Text input modified')
        },
        buttonSearch: {
          classes: array('SearchBannerForm buttonSearch: classes', [], ' ', 'ButtonSearch'),
          onClick: action('Search button clicked'),
          text: text('SearchBannerForm buttonSearch: text', 'Search', 'ButtonSearch'),
          ariaLabel: text('SearchBannerForm buttonSearch: ariaLabel', 'Search', 'ButtonSearch')
        }
      };
      return(
        <SearchBannerForm {...props} />
      );
    }),
    { info: SearchBannerDocs }
  );
