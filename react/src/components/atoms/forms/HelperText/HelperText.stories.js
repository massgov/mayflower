import React, { lazy, Suspense } from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import HelperTextDocs from './HelperText.md';
import HelperTextOptions from './HelperText.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'HelperText', (() => {
      const HelperText = lazy(() => import('./index'));
      const props = {
        inputId: text('inputID', HelperTextOptions.inputId),
        message: text('message', HelperTextOptions.message)
      };
      return(
        <Suspense fallback={<div>Loading...</div>}>
          <HelperText {...props} />
        </Suspense>
      );
    }),
    { info: HelperTextDocs }
  );
