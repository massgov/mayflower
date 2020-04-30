import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Address from './index';

storiesOf('atoms/contact', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('Address (simple)', () => {
    const props = {
      address: text('address', '324-R Clark Street, Worcester, MA 01606'),
      directionLink: text('directionLink', 'https://maps.google.com/?q=324-R+Clark+Street%2C+Worcester%2C+MA+01606'),
      details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
    };
    return(
      <Address {...props} />
    );
  })
  .add('Address (split)', () => {
    const props = {
      address: {
        streetAddress: text('streetAddress', '324-R Clark Street'),
        muni: text('muni', 'Worcester'),
        state: text('state', 'MA'),
        zip: text('zip', '01606')
      },
      directionLink: text('directionLink', 'https://maps.google.com/?q=324-R+Clark+Street%2C+Worcester%2C+MA+01606'),
      details: text('details', 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.')
    };
    return(
      <Address {...props} />
    );
  });
