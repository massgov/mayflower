import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import CalloutLink from 'MayflowerReactMolecules/CalloutLink';
import DecorativeLink from 'MayflowerReactLinks/DecorativeLink';
import SectionLinks from './index';

export const SectionLinksExample = (args) => (
  <SectionLinks {...args}>
    <CalloutLink text="This is a CalloutLink" />
    <DecorativeLink text="This is a DecorativeLink" />
  </SectionLinks>
);

SectionLinksExample.storyName = 'Default';
SectionLinksExample.args = {
  title: {
    href: '',
    text: 'Title'
  },
  seeAll: {
    href: '',
    text: 'See all'
  },
  description: 'This is a group of links',
  index: 0
};
SectionLinksExample.argTypes = {
  children: {
    control: {
      disable: true
    }
  }
};


export default {
  title: 'molecules/SectionLinks',
  component: SectionLinks,
  parameters: {
    docs: {
      page: () => <StoryPage StoryComponent={SectionLinksExample} />
    }
  }
};
