import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { SelectBox } from '../../../index';
import selectOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

import HeaderSearch from '.';
import HeaderSearchDocs from './HeaderSearch.md';

storiesOf('molecules/HeaderSearch', module).addDecorator(withKnobs)
  .add('HeaderSearch', withInfo(`<div>${HeaderSearchDocs}</div>`)(() => {
    const options = inputOptions.options.orgSelector;
    const withOrgDropdown = boolean('HeaderSearch.withOrgDropdown', false);
    const props = {
      placeholder: text('HeaderSearch.placeholder', 'Search Mass.gov'),
      buttonSearch: {
        onClick: action('Button clicked'),
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
  }))
  .add('HeaderSearch with postInputFilter', withInfo(`<div>${HeaderSearchDocs}</div>`)(() => {
    const options = inputOptions.options.orgSelector;
    const withOrgDropdown = boolean('HeaderSearch.withOrgDropdown', false);
    const selectBoxProps = {
      label: text('selectBox.label', ''),
      stackLabel: boolean('selectBox.stackLabel', true),
      required: boolean('selectBox.required', true),
      id: text('selectBox.id', 'distance-select'),
      options: object('selectBox.options', selectOptions.options.distance),
      selected: select('selectBox.defaultSelected', selectOptions.options.distance.map((option) => option.text), selectOptions.options.distance[0].text),
      onChangeCallback: action('SelectBox onChangeCallback')
    };
    const props = {
      placeholder: text('HeaderSearch.placeholder', 'Search Mass.gov'),
      buttonSearch: {
        onClick: action('Button clicked'),
        ariaLabel: text('HeaderSearch.buttonSearch.ariaLabel', 'Search'),
        text: text('HeaderSearch.buttonSearch.text', 'Search')
      },
      onSubmit: action('Form submitted'),
      onChange: action('Text input modified'),
      defaultText: text('HeaderSearch.defaultText', ''),
      postInputFilter: <SelectBox {...selectBoxProps} />
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
