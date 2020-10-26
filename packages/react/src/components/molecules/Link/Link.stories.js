import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Link from './index';
import LinkDocs from './Link.md';

export const LinkExample = (args) => <Link {...args} />;

LinkExample.storyName = 'Default';
LinkExample.args = {
  text: 'Lorem ipsum dolor sit amet',
};


export default {
  title: 'molecules/Link',
  component: Link,
  parameters: {
    docs: {
      page: () => <StoryPage Description={LinkDocs} />
    }
  }
};
