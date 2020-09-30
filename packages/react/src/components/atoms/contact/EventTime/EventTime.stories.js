import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import EventTime from './index';

export default {
  title: 'atoms/contact/EventTime',
  component: EventTime,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};

export const EventTimeExample = (args) => <EventTime {...args} />;
EventTimeExample.storyName = 'Default';
EventTimeExample.args = {
  startDate: new Date('March 15, 2002 03:00:00'),
  endDate: new Date('March 15, 2002 12:00:00'),
  details: 'First come first serve.'
};
EventTimeExample.argTypes = {
  startDate: {
    control: {
      type: 'date'
    }
  },
  endDate: {
    control: {
      type: 'date'
    }
  }
};
