import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, date } from '@storybook/addon-knobs/react';
import OperationalHours from '.';

storiesOf('atoms/time', module).addDecorator(withKnobs)
  .add('OperationalHours', withInfo('<div></div>')(() => {
    const startTime = new Date('March 15, 2002 03:00:00');
    const endTime = new Date('March 15, 2002 18:00:00');
    const hours = {
      monday: {
        status: true,
        start: new Date(date('OperationalHours.hours.monday.start', startTime)),
        end: new Date(date('OperationalHours.hours.monday.end', endTime))
      },
      tuesday: {
        status: true,
        start: new Date(date('OperationalHours.hours.tuesday.start', startTime)),
        end: new Date(date('OperationalHours.hours.tuesday.end', endTime))
      },
      wednesday: {
        status: true,
        start: new Date(date('OperationalHours.hours.wednesday.start', startTime)),
        end: new Date(date('OperationalHours.hours.wednesday.end', endTime))
      },
      thursday: {
        status: true,
        start: new Date(date('OperationalHours.hours.thursday.start', startTime)),
        end: new Date(date('OperationalHours.hours.thursday.end', endTime))
      },
      friday: {
        status: true,
        start: new Date(date('OperationalHours.hours.friday.start', startTime)),
        end: new Date(date('OperationalHours.hours.friday.end', endTime))
      },
      saturday: {
        status: true,
        start: new Date(date('OperationalHours.hours.saturday.start', startTime)),
        end: new Date(date('OperationalHours.hours.saturday.end', endTime))
      },
      sunday: {
        status: true,
        start: new Date(date('OperationalHours.hours.sunday.start', startTime)),
        end: new Date(date('OperationalHours.hours.sunday.end', endTime))
      },
    };
    const props = {
      hours,
      listKey: 'OperationalHoursStory'
    };

    return(
      <OperationalHours {...props} />
    );
  }));
