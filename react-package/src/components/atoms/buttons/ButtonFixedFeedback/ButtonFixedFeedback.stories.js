import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ButtonFixedFeedback from './index';
import ButtonFixedFeedbackDocs from './ButtonFixedFeedback.md';

storiesOf('atoms/buttons', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ButtonFixedFeedback', (() => {
      const props = {
        href: text('href', '#'),
        text: text('text', 'Feedback')
      };
      return(
        <ButtonFixedFeedback {...props} />
      );
    }),
    { info: ButtonFixedFeedbackDocs }
  );
