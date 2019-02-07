import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, object } from '@storybook/addon-knobs/react';

import SortResults from './index';
import SortResultsDocs from './SortResults.md';
import sortResultsOptions from './SortResults.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'SortResults', (() => {
      const props = {
        label: text('sortResults.label', 'Sort by:'),
        sortButtons: object('sortResults.sortButtons', sortResultsOptions.sortButtons)
      };
      return(
        <SortResults {...props} />
      );
    }),
    { info: SortResultsDocs }
  );
