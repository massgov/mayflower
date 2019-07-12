import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import ErrorPage from '.';
import ErrorPageDocs from './ErrorPage.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ErrorPage', () => {
      const props = {
        type: text('type', '404'),
        label: text('label', 'Oops'),
        title: text('title', 'We can\'t find that page'),
        message: text('message', 'The link you clicked may be broken or the page may have been removed')
      };
      return(<ErrorPage {...props} />);
    },
    { info: ErrorPageDocs }
  );
