import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ButtonFixedFeedback from './index';
import ButtonFixedFeedbackDocs from './ButtonFixedFeedback.md';

export default {
  title: 'atoms/buttons/ButtonFixedFeedback',
  component: ButtonFixedFeedback,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ButtonFixedFeedbackDocs} />
    },
    layout: 'centered'
  }
};

export const ButtonFixedFeedbackExample = (args) => <ButtonFixedFeedback {...args} />;
ButtonFixedFeedbackExample.storyName = 'Default';
ButtonFixedFeedbackExample.args = {
  href: '#',
  text: 'Feedback'
};
