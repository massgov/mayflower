import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Email from './index';

storiesOf('atoms/contact', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Email', (() => {
    const props = {
      email: text('email', 'ago@state.ma.us'),
      details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
    };
    return(
      <Email {...props} />
    );
  }));
