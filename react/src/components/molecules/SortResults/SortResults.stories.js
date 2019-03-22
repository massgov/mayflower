import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs';

import SortResults from './index';
import SortResultsDocs from './SortResults.md';
import sortResultsOptions from './SortResults.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'SortResults', (() => {
      const props = {
        label: text('label', 'Sort by:'),
        sortButtons: object('sortButtons', sortResultsOptions.sortButtons)
      };
      return(
        <SortResults {...props} />
      );
    }),
    { info: SortResultsDocs }
  );
