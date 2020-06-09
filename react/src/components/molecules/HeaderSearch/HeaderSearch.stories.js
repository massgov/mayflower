import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import SelectBox from 'MayflowerReactForms/SelectBox';
import selectOptions from 'MayflowerReactForms/SelectBox/SelectBox.knobs.options';
import inputOptions from 'MayflowerReactForms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';
import HeaderSearch from '.';
import HeaderSearchDocs from './HeaderSearch.md';

storiesOf('molecules/HeaderSearch', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'HeaderSearch', () => {
      const options = inputOptions.options.orgSelector;
      const withOrgDropdown = boolean('withOrgDropdown (shows OrgDropdown knobs when true)', true);
      const props = {
        placeholder: text('placeholder', 'Search Mass.gov'),
        buttonSearch: {
          onClick: action('Button clicked'),
          ariaLabel: text('ButtonSearch: ariaLabel', '', 'ButtonSearch'),
          text: text('ButtonSearch: text', 'Search', 'ButtonSearch'),
          usage: select('ButtonSearch: usage', {
            'primary (default)': '',
            secondary: 'secondary'
          }, '', 'ButtonSearch')
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified'),
        defaultText: text('defaultText', '')
      };
      if (withOrgDropdown) {
        props.orgDropdown = {
          dropdownButton: object('OrgDropdown: dropdownButton', {
            text: ('All Organizations'),
            capitalized: true
          }, 'OrgDropdown'),
          inputText: object('OrgDropdown: inputText', {
            boxed: true,
            label: null,
            placeholder: 'Search an organization...',
            id: 'org-typeahead',
            options,
            selected: '',
            onChange: action('orgDropdown onChange')
          }, 'OrgDropdown')
        };
      }
      return(
        <HeaderSearch {...props} />
      );
    },
    { info: HeaderSearchDocs }
  )
  .add(
    'HeaderSearch with postInputFilter', (() => {
      const options = inputOptions.options.orgSelector;
      const withOrgDropdown = boolean('withOrgDropdown (shows OrgDropdown knobs when true)', false);
      const selectBoxProps = {
        label: text('SelectBox: label', '', 'SelectBox'),
        stackLabel: boolean('SelectBox: stackLabel', true, 'SelectBox'),
        required: boolean('SelectBox: required', true, 'SelectBox'),
        id: text('SelectBox: id', 'distance-select', 'SelectBox'),
        options: object('SelectBox: options', selectOptions.options.distance, 'SelectBox'),
        selected: select('SelectBox: defaultSelected', selectOptions.options.distance.map((option) => option.text), selectOptions.options.distance[0].text, 'SelectBox'),
        onChangeCallback: action('SelectBox onChangeCallback')
      };
      const props = {
        placeholder: text('placeholder', 'Search Mass.gov'),
        buttonSearch: {
          onClick: action('Button clicked'),
          ariaLabel: text('ButtonSearch: ariaLabel', '', 'ButtonSearch'),
          text: text('ButtonSearch: text', 'Search', 'ButtonSearch'),
          usage: select('ButtonSearch: usage', {
            'primary (default)': '',
            secondary: 'secondary'
          }, '', 'ButtonSearch')
        },
        onSubmit: action('Form submitted'),
        onChange: action('Text input modified'),
        defaultText: text('ButtonSearch: defaultText', '', 'ButtonSearch'),
        postInputFilter: <SelectBox {...selectBoxProps} />
      };
      if (withOrgDropdown) {
        props.orgDropdown = {
          dropdownButton: object('OrgDropdown: dropdownButton', {
            text: ('All Organizations'),
            capitalized: true
          }, 'OrgDropdown'),
          inputText: object('OrgDropdown: inputText', {
            boxed: true,
            label: null,
            placeholder: 'Search an organization...',
            id: 'org-typeahead',
            options,
            selected: '',
            onChange: action('orgDropdown onChange')
          }, 'OrgDropdown')
        };
      }
      return(
        <HeaderSearch {...props} />
      );
    }),
    { info: HeaderSearchDocs }
  );
