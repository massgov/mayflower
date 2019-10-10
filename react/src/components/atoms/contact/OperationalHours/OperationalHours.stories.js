import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, date, boolean, select } from '@storybook/addon-knobs';
import OperationalHours from '.';

const weekday = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

storiesOf('atoms/contact', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add('OperationalHours', () => {
    const showActive = boolean('showActive', false);
    const startTime = new Date('March 15, 2002 03:00:00');
    const endTime = new Date('March 15, 2002 18:00:00');
    const hours = {
      monday: {
        status: true,
        start: new Date(date('Monday starting hours', startTime)),
        end: new Date(date('Monday ending hours', endTime))
      },
      tuesday: {
        status: true,
        start: new Date(date('Tuesday starting hours', startTime)),
        end: new Date(date('Tuesday ending hours', endTime))
      },
      wednesday: {
        status: true,
        start: new Date(date('Wednesday starting hours', startTime)),
        end: new Date(date('Wednesday ending hours', endTime))
      },
      thursday: {
        status: true,
        start: new Date(date('Thursday starting hours', startTime)),
        end: new Date(date('Thursday ending hours', endTime))
      },
      friday: {
        status: true,
        start: new Date(date('Friday starting hours', startTime)),
        end: new Date(date('Friday ending hours', endTime))
      },
      saturday: {
        status: true,
        start: new Date(date('Saturday starting hours', startTime)),
        end: new Date(date('Saturday ending hours', endTime))
      },
      sunday: {
        status: true,
        start: new Date(date('Sunday starting hours', startTime)),
        end: new Date(date('Sunday ending hours', endTime))
      }
    };
    const props = {
      showActive,
      hours,
      listKey: 'OperationalHoursStory',
      currentDay: select('currentDay', weekday, 'friday')
    };

    return(
      <OperationalHours {...props} />
    );
  });
