import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ButtonSortDocs from './ButtonSort.md';
import buttonSortOptions from './ButtonSort.knobs.options';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonSort', (() => {
      const ButtonSort = lazy(() => import('./index'));
      const props = {
        text: text('text', 'Date'),
        direction: select('direction', buttonSortOptions.direction, '')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <ButtonSort {...props} />
        </Suspense>
      );
    }),
    { info: ButtonSortDocs }
  );
