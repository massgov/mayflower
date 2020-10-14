import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import PhoneNumber from './index';
import PhoneNumberDocs from './PhoneNumber.md';

export default {
  title: 'atoms/contact/PhoneNumber',
  component: PhoneNumber,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PhoneNumberDocs} />
    }
  }
};

export const PhoneNumberExample = (args) => <PhoneNumber {...args} />;
PhoneNumberExample.storyName = 'Default';
PhoneNumberExample.args = {
  number: '5087985180',
  details: 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.'
};
