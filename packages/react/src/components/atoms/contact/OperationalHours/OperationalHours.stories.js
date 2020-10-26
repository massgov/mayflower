import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

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

export default {
  title: 'atoms/contact/OperationalHours',
  component: OperationalHours,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};

const startTime = new Date('March 15, 2002 03:00:00');
const endTime = new Date('March 15, 2002 18:00:00');

export const OperationalHoursExample = (args) => <OperationalHours {...args} />;
OperationalHoursExample.storyName = 'Default';
OperationalHoursExample.args = {
  showActive: false,
  hours: {
    monday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    },
    tuesday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    },
    wednesday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    },
    thursday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    },
    friday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    },
    saturday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    },
    sunday: {
      status: true,
      start: new Date(startTime),
      end: new Date(endTime)
    }
  },
  listKey: 'OperationalHoursStory',
  currentDay: 'friday'
};
OperationalHoursExample.argTypes = {
  currentDay: {
    control: {
      type: 'select',
      options: weekday
    }
  }
};
