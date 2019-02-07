import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import OrgSelector from './index';
import OrgSelectorDocs from './OrgSelector.md';
import orgSelectorOptions from './OrgSelector.knobs.options';
import inputOptions from '../../atoms/forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'OrgSelector', (() => {
      const input = select('orgSelector.inputType', { '': 'Choose', selectbox: 'SelectBox', typeahead: 'TypeAhead' }, 'typeahead');
      const props = {
        organizations: object('orgSelector.organizations', orgSelectorOptions.organizations),
        onChangeOrgCallback: action('OrgSelector onChangeOrgCallback')
      };
      if (input === 'selectbox') {
        props.selectBox = {
          label: text('orgSelector.selectBox.label', 'State Organization'),
          stackLabel: boolean('orgSelector.selectBox.stackLabel', true),
          id: text('orgSelector.selectBox.id', 'state-organization'),
          options: object('orgSelector.selectBox.options', inputOptions.options.orgSelector),
          selected: select('orgSelector.selectBox.defaultSelected', inputOptions.options.orgSelector.map((option) => option.text), inputOptions.options.orgSelector[0].text)
        };
      } else {
        props.typeAhead = {
          label: text('orgSelector.typeAhead.label', 'State Organization'),
          id: text('orgSelector.typeAhead.id', 'state-organization'),
          options: object('orgSelector.typeAhead.options', inputOptions.options.orgSelector),
          selected: select(
            'orgSelector.typeAhead.defaultSelected',
            inputOptions.options.orgSelector.map((option) => option.text),
            ''
          ),
          placeholder: text('orgSelector.typeAhead.placeholder', 'All Organizations')
        };
      }

      return(<OrgSelector {...props} />);
    }),
    { info: OrgSelectorDocs }
  );
