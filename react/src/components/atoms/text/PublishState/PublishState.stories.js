import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import PublishStateDocs from './PublishState.md';
import PublishState from './index';

export const PublishStateExample = (args) => <PublishState {...args} />;

PublishStateExample.storyName = 'Default';
PublishStateExample.args = {
  text: 'Draft'
};

export default {
  title: 'atoms/text/PublishState',
  component: PublishState,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PublishStateDocs} />
    }
  }
};
