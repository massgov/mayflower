import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select } from '@storybook/addon-knobs/react';

import ErrorMessage from './index';
import ErrorMessageReadme from './ErrorMessage.md';
import ErrorMessageOptions from './ErrorMessage.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('ErrorMessage', withInfo(`<div>${ErrorMessageReadme}</div>`)(() => {
    const props = {
      inputId: text('errorMessage.inputID', ErrorMessageOptions.inputId),
      error: text('errorMessage.error', ErrorMessageOptions.error),
      success: text('errorMessage.success'),
      status: select('errorMessage.status', ErrorMessageOptions.status, 'error')
    };
    return(<ErrorMessage {...props} />);
  }));
