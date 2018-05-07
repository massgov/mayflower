import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import OrgSelector from './index';
import OrgSelectorDocs from './OrgSelector.md';
import orgSelectorOptions from './OrgSelector.knobs.options';
import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add(
    'OrgSelector',
    withInfo(`<div>${OrgSelectorDocs}</div>`)(() => {
      const input = select('orgSelector.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const props = {
        organizations: object('orgSelector.organizations', orgSelectorOptions.organizations),
        onChangeOrgCallback: action('OrgSelector onChangeOrgCallback')
      };
      if (input === 'selectbox') {
        props.selectBox = {
          label: text('orgSelector.selectBox.label', 'State organization'),
          stackLabel: boolean('orgSelector.selectBox.stackLabel', true),
          id: text('orgSelector.selectBox.id', 'state-organization'),
          options: object('orgSelector.selectBox.options', selectBoxOptions.options.orgSelector),
          selected: select('orgSelector.selectBox.defaultSelected', selectBoxOptions.options.orgSelector.map((option) => option.text), selectBoxOptions.options.orgSelector[0].text)
        };
      } else {
        props.typeAhead = {
          label: text('orgSelector.typeAhead.label', 'State organization'),
          id: text('orgSelector.typeAhead.id', 'state-organization'),
          options: object('orgSelector.typeAhead.options', selectBoxOptions.options.orgSelector),
          selected: select('orgSelector.typeAhead.defaultSelected', selectBoxOptions.options.orgSelector.map((option) => option.text), selectBoxOptions.options.orgSelector[0].text),
          placeholder: text('orgSelector.typeAhead.placeholder', 'Sample Placeholder Text')
        };
      }

      return(<OrgSelector {...props} />);
    })
  );
