import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ResultsHeading from './index';
import ResultsHeadingDocs from './ResultsHeading.md';
import TagsData from '../../molecules/Tags/Tags.knobs.options';
import { SortData } from './ResultsHeading.knobs.options';
import buttonToggleOptions from '../../atoms/buttons/ButtonToggle/ButtonToggle.knobs.options';

storiesOf('molecules/ResultsHeading', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ResultsHeading with ButtonToggle', (() => {
      const props = {
        numResults: text('ResultsHeading numResults', '1-12'),
        totalResults: text('ResultsHeading totalResults', '108'),
        tags: {
          tags: object('ResultsHeading tags', TagsData.tags),
          onClearCallback: action('resultsHeading tags on clearAll'),
          onClearThisCallback: action('resultsHeading tags on clearThis')
        }
      };
      props.buttonToggle = {
        option1: object('ResultsHeading buttonToggle: option1', buttonToggleOptions.options[0]),
        option2: object('ResultsHeading buttonToggle: option2', buttonToggleOptions.options[1]),
        id: text('ResultsHeading buttonToggle: id', 'sort'),
        labelText: text('ResultsHeading buttonToggle: labelText', 'Sort by:'),
        onChangeCallback: action('resultsHeading buttontoggle on change'),
        defaultValue: select('ResultsHeading buttonToggle: defaultValue', [buttonToggleOptions.options[0].value, buttonToggleOptions.options[1].value], 'date')
      };
      return(
        <ResultsHeading {...props} />
      );
    }),
    { info: ResultsHeadingDocs }
  )
  .add(
    'ResultsHeading with SelectBox', (() => {
      const props = {
        numResults: text('ResultsHeading numResults', '1-12'),
        totalResults: text('ResultsHeading totalResults', '108'),
        tags: {
          tags: object('ResultsHeading tags', TagsData.tags),
          onClearCallback: action('resultsHeading tags on clearAll'),
          onClearThisCallback: action('resultsHeading tags on clearThis')
        }
      };
      props.selectBox = {
        label: text('ResultsHeading selectBox: label', 'Sort by:', 'SelectBox'),
        stackLabel: boolean('ResultsHeading selectBox: stackLabel', false, 'SelectBox'),
        required: boolean('ResultsHeading selectBox: required', true, 'SelectBox'),
        id: text('ResultsHeading selectBox: id', 'sort-select', 'SelectBox'),
        options: object('ResultsHeading selectBox: options', SortData.sort, 'SelectBox'),
        selected: select('ResultsHeading selectBox: defaultSelected', SortData.sort.map((option) => option.text), SortData.sort[0].text, 'SelectBox'),
        onChangeCallback: action('custom-click on select')
      };
      return(
        <ResultsHeading {...props} />
      );
    }),
    { info: ResultsHeadingDocs }
  );
