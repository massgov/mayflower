import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Email from './index';

export default {
  title: 'atoms/contact/Email',
  component: Email,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};

export const EmailExample = (args) => <Email {...args} />;
EmailExample.storyName = 'Default';
EmailExample.args = {
  email: 'ago@state.ma.us',
  details: 'Open Monday through Friday from 9:00 a.m. to 5:00 p.m.'
};
