import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import ButtonFixedFeedback from './index';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs)
  .add('ButtonFixedFeedback', withInfo(`<div>A fixed position feedback button</div>`)(() => {
    const props = {
      href: text('ButtonFixedFeedbackOptions.href', '#'),
      text: text('ButtonFixedFeedbackOptions.text', 'Feedback')
    };
    return(
      <ButtonFixedFeedback {...props} />
    );
  }));
