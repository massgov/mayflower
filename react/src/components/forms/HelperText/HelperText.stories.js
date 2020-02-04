import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import HelperText from './index';
import HelperTextDocs from './HelperText.md';
import HelperTextOptions from './HelperText.knobs.options';

storiesOf('forms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'HelperText', (() => {
      const props = {
        inputId: text('inputID', HelperTextOptions.inputId),
        message: text('message', HelperTextOptions.message)
      };
      return(<HelperText {...props} />);
    }),
    { info: HelperTextDocs }
  );
