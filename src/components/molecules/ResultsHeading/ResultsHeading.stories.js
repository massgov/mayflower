import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import ResultsHeading from './index';
import ResultsHeadingDocs from './ResultsHeading.md';
//import ResultsHeadingOptions from './ResultsHeading.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('ResultsHeading', withInfo(`<div>${ResultsHeadingDocs}</div>`)(() => {
    const props = {"numResults": "1-12",
    "totalResults": "108",
    "sortResults": {
      "label": "Sort by:",
      "sortButtons": [{
        "text": "Date",
        "direction": "dsc"
      },{
        "text": "Price",
        "direction": ""
      },{
        "text": "Color",
        "direction": ""
      }]
    },
    "tags": [{
      "type": "zipcode",
      "text": "02341",
      "value": "02341"
    },{
      "type": "activity",
      "text": "Hiking",
      "value": "hiking"
    },{
      "type": "keyword",
      "text": "Beginner",
      "value": "beginner"
    },{
      "type": "tag",
      "text": "Wheelchair Accessible",
      "value": "wheelchair-accessible"
    }]}
    //const props = {
     // label: text('sortResults.label', 'Sort by:'),
    //  sortButtons: object('sortResults.sortButtons', sortResultsOptions.sortButtons)
    //};
    return(
      <ResultsHeading {...props} />
    );
  }));
