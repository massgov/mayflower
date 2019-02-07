import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';

import ErrorPage from '.';
import ErrorPageDocs from './ErrorPage.md';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ErrorPage', (() => {
      const props = {
        type: text('errorPage.type', '404'),
        label: text('errorPage.label', 'Oops'),
        title: text('errorPage.title', 'We can\'t find that page'),
        message: text('errorPage.message', 'The link you clicked may be broken or the page may have been removed')
      };
      return(<ErrorPage {...props} />);
    }),
    { info: ErrorPageDocs }
  );
