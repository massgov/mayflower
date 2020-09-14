import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import PhoneNumber from './index';
import PhoneNumberDocs from './PhoneNumber.md';

storiesOf('atoms/contact', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'PhoneNumber', (() => {
      const props = {
        number: text('number', '5087985180'),
        details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
      };
      return(
        <PhoneNumber {...props} />
      );
    }),
    { info: PhoneNumberDocs }
  );
