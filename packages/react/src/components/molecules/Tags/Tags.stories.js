import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import Tags from './index';
import TagsDocs from './Tags.md';
import TagsData from './Tags.knobs.options';

export const TagsExample = (args) => <Tags {...args} />;

TagsExample.storyName = 'Default';
TagsExample.args = {
  tags: TagsData.tags,
  onClearCallback: action('Tags tags on clearAll'),
  onClearThisCallback: action('Tags tags on clearThis')
};


export default {
  title: 'molecules/Tags',
  component: Tags,
  parameters: {
    docs: {
      page: () => <StoryPage Description={TagsDocs} />
    }
  }
};
