import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, object } from '@storybook/addon-knobs';

import LinkList from './index';
import LinkListDocs from './LinkList.md';

storiesOf('organisms', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'LinkList', () => {
      const levelOptions = [1, 2, 3, 4, 5, 6];
      const props = {
        compHeading: {
          title: text('LinkList compHeading: title', 'Link List', 'CompHeading'),
          titleContext: text('LinkList compHeading: titleContext', 'link list', 'CompHeading'),
          level: select('LinkList compHeading: level', levelOptions, levelOptions[2], 'CompHeading'),
          color: select('LinkList compHeading: color', { 'green (default)': '', yellow: 'yellow' }, '', 'CompHeading'),
          id: text('LinkList compHeading: titleContext', 'link list', 'CompHeading'),
          centered: boolean('LinkList compHeading: centered', false, 'CompHeading'),
          sidebar: boolean('LinkList compHeading: sidebar', false, 'CompHeading')
        },
        description: {
          text: text('LinkList description', '')
        },
        stacked: boolean('LinkList stacked', false),
        hideBullets: boolean('LinkList hideBullets', false),
        links: object('LinkList links', [{
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
          href: text('LinkList more: href', '#'),
          text: text('LinkList more: text', 'See all 10 related services '),
          info: text('LinkList more: label', 'See all of the resources for Executive Office of Health and Human Services')
        }
      };
      return(<LinkList {...props} />);
    },
    { info: LinkListDocs }
  );
