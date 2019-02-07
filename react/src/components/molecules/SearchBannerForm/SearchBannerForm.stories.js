import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, array, text, boolean, select, number } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import SearchBannerForm from '.';
import SearchBannerDocs from './SearchBannerForm.md';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'SearchBannerForm', (() => {
      const props = {
        action: '#',
        onSubmit: action('Form submitted'),
        inputText: {
          hiddenLabel: boolean('searchBannerForm.inputText.hiddenLabel', false),
          labelText: text('searchBannerForm.inputText.labelText', 'Search terms'),
          required: boolean('searchBannerForm.inputText.required', false),
          id: text('searchBannerForm.inputText.id', 'GUID138490237'),
          name: text('searchBannerForm.inputText.name', 'search'),
          type: select('searchBannerForm.inputText.type', ['text', 'email', 'number'], 'text'),
          width: number('searchBannerForm.inputText.width', 0),
          maxlength: number('searchBannerForm.inputText.maxlength', 0),
          pattern: text('searchBannerForm.inputText.pattern', ''),
          placeholder: text('searchBannerForm.inputText.placeholder', 'Search...'),
          errorMsg: text('searchBannerForm.inputText.errorMsg', ''),
          onChange: action('Text input modified')
        },
        buttonSearch: {
          classes: array('buttonSearch.classes', []),
          onClick: action('Search button clicked'),
          text: text('searchBannerForm.buttonSearch.text', 'Search'),
          ariaLabel: text('searchBannerForm.buttonSearch.ariaLabel', 'Search')
        }
      };
      return(
        <SearchBannerForm {...props} />
      );
    }),
    { info: SearchBannerDocs }
  );
