import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import MultiSelectDropDown from './index';

storiesOf('forms|molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('MultiSelectDropDown', (() => {
    const props = {
      inputProps: {
        required: boolean('required', false),
        placeholder: text('defaultText', 'All Formats', 'dropdownItems'),

      },
      groupProps: {
        labelProps: {
          hidden: boolean('hiddenLabel', false),
          labelText: text('labelText', 'Filter by Format(s)'),
          className: text('labelClassName', ''),
        },
        errorMsg: text('errorMsg', 'You are required to select an option.'),
        showError: boolean('showError', false),
        inline: boolean('inline', false)
      },
      dropdownItems: object('dropdownItems', [{
        label: 'PDF',
        value: 'pdf'
      }, {
        label: 'Excel',
        value: 'excel'
      }, {
        label: 'CSV',
        value: 'csv'
      }, {
        label: 'HTML',
        value: 'html'
      }, {
        label: 'JSON',
        value: 'json'
      }], 'dropdownItems'),
      onItemSelect: action('onItemSelect onClick'),
      onDropDownClick: action('onButtonClick onClick'),
      fieldName: text('fieldName', 'formats'),
    };
    return(
      <MultiSelectDropDown {...props} />
    );
  }));
