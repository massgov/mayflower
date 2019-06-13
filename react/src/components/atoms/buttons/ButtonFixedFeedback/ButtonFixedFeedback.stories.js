import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ButtonFixedFeedbackDocs from './ButtonFixedFeedback.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonFixedFeedback', (() => {
      const ButtonFixedFeedback = lazy(() => import('./index'));
      const props = {
        href: text('href', '#'),
        text: text('text', 'Feedback')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <ButtonFixedFeedback {...props} />
        </Suspense>
      );
    }),
    { info: ButtonFixedFeedbackDocs }
  );
