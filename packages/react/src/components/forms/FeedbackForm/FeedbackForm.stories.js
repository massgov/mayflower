import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import FeedbackForm from '.';

export const FeedbackFormExample = (args) => (
  <FeedbackForm {...args} />
);
FeedbackFormExample.storyName = 'Default';
FeedbackFormExample.args = {
  formId: 2521317,
  radioId: 47054416,
  yesFeedbackId: 52940022,
  noFeedbackId: 47054414,
  refererId: 47056299,
  nodeId: undefined,
  successMessage: () => <p>This is a custom success messasge! You can put HTML in here or use a component.</p>
};
FeedbackFormExample.argTypes = {
  formRef: {
    control: {
      disable: true
    }
  }
};

export default {
  title: 'forms/organisms/FeedbackForm',
  component: FeedbackForm,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};
