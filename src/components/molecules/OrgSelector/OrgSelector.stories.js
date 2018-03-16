import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import OrgSelector from './index';
import OrgSelectorDocs from './OrgSelector.md';
import orgSelectorOptions from './OrgSelector.knobs.options';
import selectBoxOptions from '../../atoms/forms/SelectBox/SelectBox.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add(
    'OrgSelector',
    withInfo(`<div>${OrgSelectorDocs}</div>`)(() => {
      const props = {
        selectBox: {
          label: text('orgSelector.selectBox.label', 'State organization'),
          id: text('orgSelector.selectBox.id', 'state-organization'),
          options: object('orgSelector.selectBox.options', selectBoxOptions.options.orgSelector),
          selected: select('orgSelector.selectBox.defaultSelected', selectBoxOptions.options.orgSelector.map((option) => option.text), selectBoxOptions.options.orgSelector[0].text)
        },
        organizations: object('orgSelector.organizations', orgSelectorOptions.organizations),
        onChangeOrgCallback: action('custom-click on select')
      };

      return(<OrgSelector {...props} />);
    })
  );
