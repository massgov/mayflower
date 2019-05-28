import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ArrowButtonDocs from './ArrowButton.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ArrowButton', (() => {
      const ArrowButton = lazy(() => import('./index'));
      const props = {
        direction: select('direction', ['left', 'right']),
        href: text('href', ''),
        info: text('info', 'Left'),
        onClick: action('Button Clicked')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <ArrowButton {...props} />
        </Suspense>
      );
    }),
    { info: ArrowButtonDocs }
  );
