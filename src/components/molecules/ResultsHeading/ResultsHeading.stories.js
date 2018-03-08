import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import ResultsHeading from './index';
import ResultsHeadingDocs from './ResultsHeading.md';
import resultsHeadingOptions from './ResultsHeading.knobs.options';
import buttonToggleOptions from '../../atoms/buttons/ButtonToggle/ButtonToggle.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('ResultsHeading', withInfo(`<div>${ResultsHeadingDocs}</div>`)(() => {
    const props = {
      numResults: text('resultsHeading.numResults', '1-12'),
      totalResults: text('resultsHeading.totalResults', '108'),
      sortResults: {
        options: object('resultsHeading.sortResults.options', buttonToggleOptions.options),
        id: text('resultsHeading.sortResults.id', 'sort'),
        labelText: text('resultsHeading.sortResults.labelText', 'Sort by:'),
        onChangeCallback: action('resultsHeading sortResults on select'),
        defaultValue: select('resultsHeading.sortResults.defaultValue', [buttonToggleOptions.options[0].value, buttonToggleOptions.options[1].value], buttonToggleOptions.options[1].value)
      },
      tags: object('resultsHeading.tags', resultsHeadingOptions.tags)
    };
    return(
      <ResultsHeading {...props} />
    );
  }));
