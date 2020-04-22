import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import FeedbackForm from '.';

storiesOf('forms|organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('FeedbackForm', () => {
    const props = {
      formId: number('formId', 2521317),
      radioId: number('radioId', 47054416),
      yesFeedbackId: number('yesFeedbackId', 52940022),
      noFeedbackId: number('noFeedbackId', 47054414),
      refererId: number('refererId', 47056299),
      nodeId: number('nodeId', undefined),
      successMessage: () => <p>This is a custom success messasge! You can put HTML in here or use a component.</p>
    };
    return(<FeedbackForm {...props} />);
  });
