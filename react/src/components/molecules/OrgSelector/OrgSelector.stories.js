import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, boolean, optionsKnob as options } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import OrgSelector from './index';
import OrgSelectorDocs from './OrgSelector.md';
import orgSelectorOptions from './OrgSelector.knobs.options';
import inputOptions from '../../forms/InputTextTypeAhead/InputTextTypeAhead.knobs.options';

storiesOf('molecules/OrgSelector', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'OrgSelector with SelectBox', (() => {
      const props = {
        organizations: object('organizations', orgSelectorOptions.organizations, 'Organizations'),
        onChangeOrgCallback: action('OrgSelector onChangeOrgCallback')
      };
      const selected = inputOptions.options.orgSelector[0].text;
      const selectedList = inputOptions.options.orgSelector.map((option) => {
        const opt = {};
        opt[option.text] = option.text;
        return opt;
      });
      props.selectBox = {
        label: text('label', 'State Organization'),
        stackLabel: boolean('stackLabel', true),
        id: text('id', 'state-organization'),
        options: object('options', inputOptions.options.orgSelector, 'Options'),
        selected: options('defaultSelected', Object.assign({}, ...selectedList.values()), selected, { display: 'select' })
      };
      return(<OrgSelector {...props} />);
    }),
    { info: OrgSelectorDocs }
  )
  .add(
    'OrgSelector with TypeAhead', (() => {
      const props = {
        organizations: object('organizations', orgSelectorOptions.organizations, 'Organizations'),
        onChangeOrgCallback: action('OrgSelector onChangeOrgCallback')
      };
      const selectedList = inputOptions.options.orgSelector.map((option) => {
        const opt = {};
        opt[option.text] = option.text;
        return opt;
      });
      props.typeAhead = {
        label: text('label', 'State Organization'),
        id: text('id', 'state-organization'),
        options: object('options', inputOptions.options.orgSelector, 'Options'),
        selected: options('defaultSelected', Object.assign({}, ...selectedList.values()), '', { display: 'select' }),
        placeholder: text('placeholder', 'All Organizations')
      };

      return(<OrgSelector {...props} />);
    }),
    { info: OrgSelectorDocs }
  );
