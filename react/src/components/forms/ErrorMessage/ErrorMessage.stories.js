import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';

import ErrorMessage from './index';
import ErrorMessageDocs from './ErrorMessage.md';
import ErrorMessageOptions from './ErrorMessage.knobs.options';

storiesOf('forms/atoms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ErrorMessage', (() => {
      const props = {
        inputId: text('inputID', ErrorMessageOptions.inputId),
        error: text('error', ErrorMessageOptions.error),
        success: text('success'),
        status: select('status', ErrorMessageOptions.status, 'error')
      };
      return(<ErrorMessage {...props} />);
    }),
    { info: ErrorMessageDocs }
  );
