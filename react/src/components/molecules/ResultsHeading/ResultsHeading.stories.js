import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ResultsHeading from './index';
import ResultsHeadingDocs from './ResultsHeading.md';
import { TagsData, SortData } from './ResultsHeading.knobs.options';
import buttonToggleOptions from '../../atoms/buttons/ButtonToggle/ButtonToggle.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('ResultsHeading', withInfo(`<div>${ResultsHeadingDocs}</div>`)(() => {
    const inputType = select('sortResults.inputType', { '': 'None', buttonToggle: 'buttonToggle', selectBox: 'selectBox' }, 'selectBox');
    const props = {
      resultsMessage: text('resultsHeading.resultsMessage', 'Showing 1-10 of 100 for:'),
      tags: {
        tags: object('resultsHeading.tags', TagsData.tags),
        onClearCallback: action('resultsHeading tags on clearAll'),
        onClearThisCallback: action('resultsHeading tags on clearThis')
      }
    };
    if (inputType === 'buttonToggle') {
      props.buttonToggle = {
        option1: object('buttonToggle.option1', buttonToggleOptions.options[0]),
        option2: object('buttonToggle.option2', buttonToggleOptions.options[1]),
        id: text('resultsHeading.sortResults.id', 'sort'),
        labelText: text('resultsHeading.sortResults.labelText', 'Sort by:'),
        onChangeCallback: action('resultsHeading sortResults on select'),
        defaultValue: select('resultsHeading.sortResults.defaultValue', [buttonToggleOptions.options[0].value, buttonToggleOptions.options[1].value], 'date')
      };
    } else if (inputType === 'selectBox') {
      props.selectBox = {
        label: text('sortResults.selectBox.label', 'Sort by:'),
        stackLabel: boolean('sortResults.selectBox.stackLabel', false),
        required: boolean('sortResults.selectBox.required', true),
        id: text('sortResults.selectBox.id', 'sort-select'),
        options: object('sortResults.selectBox.options', SortData.sort),
        selected: select('sortResults.selectBox.defaultSelected', SortData.sort.map((option) => option.text), SortData.sort[0].text),
        onChangeCallback: action('custom-click on select')
      };
    }
    return(
      <ResultsHeading {...props} />
    );
  }));
