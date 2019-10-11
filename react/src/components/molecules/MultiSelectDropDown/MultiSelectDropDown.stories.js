import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, object, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import MultiSelectDropDown from '.';
import buttonWithIconOptions from '../../atoms/buttons/ButtonWithIcon/ButtonWithIcon.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('MultiSelectDropDown', (() => {
    const props = {
      title: 'Filter by Format(s)',
      dropdownItems: object('dropdownItems', [{
        value: 'PDF',
        label: 'pdf'
      }, {
        value: 'Excel',
        label: 'excel'
      }, {
        value: 'CSV',
        label: 'csv'
      }, {
        value: 'HTML',
        label: 'html'
      }, {
        value: 'JSON',
        label: 'json'
      }], 'dropdownItems'),
      onItemSelect: action('onItemSelect onClick'),
      onDropDownClick: action('onButtonClick onClick')
    };
    return(
      <MultiSelectDropDown {...props} />
    );
  }));
