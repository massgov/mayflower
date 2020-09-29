import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ErrorMessage from './index';
import ErrorMessageDocs from './ErrorMessage.md';
import ErrorMessageOptions from './ErrorMessage.knobs.options';

export const ErrorMessageExample = (args) => (
  <ErrorMessage {...args} />
);
ErrorMessageExample.storyName = 'Default';
ErrorMessageExample.args = {
  inputId: ErrorMessageOptions.inputId,
  error: ErrorMessageOptions.error,
  status: 'error'
};
ErrorMessageExample.argTypes = {
  status: {
    control: {
      type: 'select',
      options: ErrorMessageOptions.status
    }
  }
};

export default {
  title: 'forms/atoms/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ErrorMessageDocs} />
    }
  }
};
