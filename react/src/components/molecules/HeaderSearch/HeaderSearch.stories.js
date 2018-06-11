import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

import HeaderSearch from '.';
import HeaderSearchDocs from './HeaderSearch.md';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('HeaderSearch', withInfo(`<div>${HeaderSearchDocs}</div>`)(() => {
    const options = inputOptions.options.orgSelector;
    const withOrgDropdown = boolean('HeaderSearch.withOrgDropdown', true);
    const props = {
      placeholder: text('HeaderSearch.placeholder', 'Search Mass.gov'),
      buttonSearch: {
        onClick: (e) => {
          action('Button clicked')(e);
          e.preventDefault();
        },
        ariaLabel: text('HeaderSearch.buttonSearch.ariaLabel', 'Search'),
        text: text('HeaderSearch.buttonSearch.text', 'Search')
      },
      onSubmit: action('Form submitted'),
      onChange: action('Text input modified'),
      defaultText: text('HeaderSearch.defaultText', '')
    };
    if (withOrgDropdown) {
      props.orgDropdown = {
        dropdownButton: object('HeaderSearch.orgDropdown.dropdownButton', {
          text: ('All Organizations'),
          capitalized: true
        }),
        inputText: object('HeaderSearch.orgDropdown.inputText', {
          boxed: true,
          label: null,
          placeholder: 'Search an organization...',
          id: 'org-typeahead',
          options,
          selected: '',
          onChange: action('orgDropdown onChange')
        })
      };
    }
    return(
      <HeaderSearch {...props} />
    );
  }));
