import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, date } from '@storybook/addon-knobs';

import EventTime from './index';
// import PhoneNumberDocs from './PhoneNumber.md';

const startTime = new Date('March 15, 2002 03:00:00');
const endTime = new Date('March 15, 2002 18:00:00');

storiesOf('atoms/contact', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('EventTime', (() => {
    const props = {
      startDate: date('startDate', startTime),
      emdDate: date('endDate', endTime),
      details: text('details', 'First come first serve.')
    };
    return(
      <EventTime {...props} />
    );
  }),
    // { info: PhoneNumberDocs }
  );

