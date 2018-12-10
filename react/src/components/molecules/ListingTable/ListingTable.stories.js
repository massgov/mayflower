import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, boolean, select, text } from '@storybook/addon-knobs/react';

import ListingTable from './index';
import ListingTableDocs from './ListingTable.md';
import { CompHeading } from '../../../index';


const getCompHeading = () => {
  const props = {
    title: text(`ListingTable.heading.title`, 'Information Listing Table'),
    level: select('ListingTable.heading.level', [1, 2, 3, 4, 5, 6], 2),
    color: select(`ListingTable.heading.color`, { '': 'green (default)', yellow: 'yellow' }),
    visuallyHidden: boolean(`ListingTable.heading.visuallyHidden`, false)
  };
  return<CompHeading {...props} />;
};

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('ListingTable', withInfo(`<div>${ListingTableDocs}</div>`)(() => {
    const props = {
      heading: getCompHeading(),
      rows: object('Data Rows', [
        {
          headerLevel: select('headerLevel', [1, 2, 3, 4, 5, 6], 3),
          label: 'Show 2 items',
          items: [
            'First item',
            'Second item'
          ]
        },
        {
          headerLevel: select('headerLevel', [1, 2, 3, 4, 5, 6], 3),
          label: 'Four items, but only show 2 (default)',
          moreLabel: 'show more',
          lessLabel: 'show less',
          items: [
            'Item 1',
            'Item 2',
            'Item 3 (expand)',
            'Item 4 (expand)'
          ]
        },
        {
          headerLevel: select('headerLevel', [1, 2, 3, 4, 5, 6], 3),
          label: 'Four items, show 3, default lables',
          visibleItems: 3,
          items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4 (expand)'
          ]
        },
        {
          headerLevel: select('headerLevel', [1, 2, 3, 4, 5, 6], 3),
          label: 'Show all 4 items',
          visibleItems: 4,
          items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4'
          ]
        }
      ])
    };
    return(<ListingTable {...props} />);
  }));
