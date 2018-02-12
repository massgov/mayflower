import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import ResultsHeading from './index';
import ResultsHeadingDocs from './ResultsHeading.md';
import resultsHeadingOptions from './ResultsHeading.knobs.options';
import sortResultsOptions from '../SortResults/SortResults.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('ResultsHeading', withInfo(`<div>${ResultsHeadingDocs}</div>`)(() => {
    const props = {
      numResults: text('resultsHeading.numResults', '1-12'),
      totalResults: text('resultsHeading.totalResults', '108'),
      sortResults: {
        label: text('resultsHeading.sortResults.label', 'Sort by:'),
        sortButtons: object('resultsHeading.sortResults.sortButtons', sortResultsOptions.sortButtons)
      },
      tags: object('resultsHeading.tags', resultsHeadingOptions.tags)
    };
    return(
      <ResultsHeading {...props} />
    );
  }));
