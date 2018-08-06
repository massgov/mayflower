import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import HelperText from './index';
import HelperTextReadme from './HelperText.md';
import HelperTextOptions from './HelperText.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('HelperText', withInfo(`<div>${HelperTextReadme}</div>`)(() => {
    const props = {
      inputId: text('helperText.inputID', HelperTextOptions.inputId),
      message: text('helperText.message', HelperTextOptions.message)
    };
    return(<HelperText {...props} />);
  }));
