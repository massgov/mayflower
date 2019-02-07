import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs/react';

import LinkList from './index';
import LinkListDocs from './LinkList.md';

storiesOf('organisms', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'LinkList', (() => {
      const levelOptions = [1, 2, 3, 4, 5, 6];
      const props = {
        compHeading: {
          title: text('linkList.compHeading.title', 'Link List'),
          titleContext: text('linkList.compHeading.titleContext', 'link list'),
          level: select('linkList.compHeading.level', levelOptions, levelOptions[2]),
          color: select('linkList.compHeading.color', { '': 'green (default)', yellow: 'yellow' }, ''),
          id: text('linkList.compHeading.titleContext', 'link list'),
          centered: boolean('linkList.compHeading.centered', false),
          sidebar: boolean('linkList.compHeading.sidebar', false)
        },
        description: {
          text: text('linkList.description', '')
        },
        stacked: boolean('linkList.stacked', false),
        hideBullets: boolean('linkList.hideBullets', false),
        links: object('linkList.links', [{
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
        }]),
        more: {
          href: text('linkList.more.href', '#'),
          text: text('linkList.more.text', 'See all 10 related services '),
          info: text('linkList.more.label', 'See all of the resources for Executive Office of Health and Human Services')
        }
      };
      return(<LinkList {...props} />);
    }),
    { info: LinkListDocs }
  );
