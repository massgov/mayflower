import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ButtonCopy from './index';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('ButtonCopy', (() => {
    const props = {
      content: text('content', 'this is the content string that will be copied into the clipboard')
    };
    return(
      <ButtonCopy {...props} />
    );
  }));
