import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ErrorMessageDocs from './ErrorMessage.md';
import ErrorMessageOptions from './ErrorMessage.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ErrorMessage', (() => {
      const ErrorMessage = lazy(() => import('./index'));
      const props = {
        inputId: text('inputID', ErrorMessageOptions.inputId),
        error: text('error', ErrorMessageOptions.error),
        success: text('success'),
        status: select('status', ErrorMessageOptions.status, 'error')
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorMessage {...props} />
        </Suspense>
      );
    }),
    { info: ErrorMessageDocs }
  );
