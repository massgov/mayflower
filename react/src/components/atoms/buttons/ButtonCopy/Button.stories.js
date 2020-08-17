import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ButtonCopy from './index';

export default {
  title: 'atoms/buttons/ButtonCopy',
  component: ButtonCopy,
  parameters: {
    docs: {
      page: () => <StoryPage />
    }
  }
};

export const ButtonCopyExample = (args) => <ButtonCopy {...args} />;

ButtonCopyExample.storyName = 'Default';
ButtonCopyExample.args = {
  content: 'this is the content string that will be copied into the clipboard'
};
