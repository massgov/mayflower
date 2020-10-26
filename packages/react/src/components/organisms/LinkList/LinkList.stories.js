import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import LinkList from './index';
import LinkListDocs from './LinkList.md';

export const LinkListExample = (args) => <LinkList {...args} />;

LinkListExample.storyName = 'Default';
LinkListExample.args = {
  compHeading: {
    title: 'Link List',
    titleContext: 'link list',
    level: 3,
    color: '',
    id: 'link list',
    centered: false,
    sidebar: false
  },
  description: {
    text: ''
  },
  stacked: false,
  hideBullets: false,
  links: [{
    href: '#',
    text: 'Lorem ipsum dolor sit amet.',
    info: ''
  }, {
    href: '#',
    text: 'Lorem ipsum dolor sit amet.',
    info: ''
  }, {
    href: '#',
    text: 'Lorem ipsum dolor sit amet.',
    info: ''
  }, {
    href: '#',
    text: 'Lorem ipsum dolor sit amet.',
    info: ''
  }, {
    href: '#',
    text: 'Lorem ipsum dolor sit amet.',
    info: ''
  }],
  more: {
    href: '#',
    text: 'See all 10 related services ',
    info: 'See all of the resources for Executive Office of Health and Human Services'
  }
};

export default {
  title: 'organisms/LinkList',
  component: LinkList,
  parameters: {
    docs: {
      page: () => <StoryPage Description={LinkListDocs} />
    }
  }
};
