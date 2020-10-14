import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import HelperText from './index';
import HelperTextDocs from './HelperText.md';
import HelperTextOptions from './HelperText.knobs.options';

export const HelperTextExample = (args) => (
  <HelperText {...args} />
);
HelperTextExample.storyName = 'Default';
HelperTextExample.args = {
  inputId: HelperTextOptions.inputId,
  message: HelperTextOptions.message
};

export default {
  title: 'forms/atoms/HelperText',
  component: HelperText,
  parameters: {
    docs: {
      page: () => <StoryPage Description={HelperTextDocs} />
    }
  }
};
