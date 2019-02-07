import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs/react';

import ButtonFixedFeedback from './index';
import ButtonFixedFeedbackDocs from './ButtonFixedFeedback.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonFixedFeedback', (() => {
      const props = {
        href: text('ButtonFixedFeedbackOptions.href', '#'),
        text: text('ButtonFixedFeedbackOptions.text', 'Feedback')
      };
      return(
        <ButtonFixedFeedback {...props} />
      );
    }),
    { info: ButtonFixedFeedbackDocs }
  );
