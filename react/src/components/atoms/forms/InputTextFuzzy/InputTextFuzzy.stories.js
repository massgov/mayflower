import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean, array } from '@storybook/addon-knobs/react';

import InputTextFuzzy from './index';
import markdown from './InputTextFuzzy.md';
import inputOptions from './InputTextFuzzy.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add(
    'InputTextFuzzy',
    withInfo(`<div>${markdown}</div>`)(() => {
      const props = {
        boxed: boolean('InputTextFuzzy.boxed', false),
        disabled: boolean('InputTextFuzzy.disabled', false),
        label: text('InputTextFuzzy.label', 'State Organization'),
        keys: array('InputTextFuzzy.keys', ['text']),
        options: inputOptions.options.orgSelector.filter((option) => option.text !== ''),
        placeholder: text('InputTextFuzzy.placeholder', 'All Organizations'),
        id: text('InputTextFuzzy.id', 'org-typeahead'),
        selected: select(
          'InputTextFuzzy.selected',
          inputOptions.options.orgSelector.map((option) => option.text),
          ''
        ),
        fuseOptions: object('InputTextFuzzy.fuseOptions', {
          shouldSort: true,
          findAllMatches: true,
          includeMatches: true,
          threshold: 0.3,
          minMatchCharLength: 1
        })
      };
      return(<InputTextFuzzy {...props} />);
    })
  );

