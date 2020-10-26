import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import SidebarHeadingDocs from './SidebarHeading.md';
import SidebarHeading from './index';

export const SidebarHeadingExample = (args) => (<SidebarHeading {...args} />);

SidebarHeadingExample.storyName = 'Default';

SidebarHeadingExample.args = {
  title: 'Key Agencies',
  level: 2
};

SidebarHeadingExample.argTypes = {
  level: {
    control: {
      type: 'select',
      options: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6
      }
    }
  }
};

export default {
  title: 'atoms/headings/SidebarHeading',
  component: SidebarHeading,
  parameters: {
    docs: {
      page: () => <StoryPage Description={SidebarHeadingDocs} />
    }
  }
};
