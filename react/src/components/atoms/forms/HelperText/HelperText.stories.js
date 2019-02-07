import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import HelperText from './index';
import HelperTextDocs from './HelperText.md';
import HelperTextOptions from './HelperText.knobs.options';

storiesOf('atoms/forms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'HelperText', (() => {
      const props = {
        inputId: text('helperText.inputID', HelperTextOptions.inputId),
        message: text('helperText.message', HelperTextOptions.message)
      };
      return(<HelperText {...props} />);
    }),
    { info: HelperTextDocs }
  );
