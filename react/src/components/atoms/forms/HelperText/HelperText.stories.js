import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs/react';

import HelperText from './index';
import HelperTextReadme from './HelperText.md';
import HelperTextOptions from './HelperText.knobs.options';

storiesOf('atoms/forms', module).addDecorator(withKnobs)
  .add('HelperText', withInfo(`<div>${HelperTextReadme}</div>`)(() => {
    const props = {
      inputId: HelperTextOptions.inputId,
      message: HelperTextOptions.message
    };
    return (<HelperText {...props} />);
  }));
