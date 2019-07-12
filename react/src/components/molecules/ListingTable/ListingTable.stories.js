import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import ListingTable from './index';
import ListingTableDocs from './ListingTable.md';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'ListingTable', (() => {
      const props = {
        rows: object('Data Rows', [
          {
            label: 'Show 2 items',
            items: [
              'First item',
              'Second item'
            ]
          },
          {
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
            label: 'Four items, show 3, default lables',
            visibleItems: 3,
            items: [
              'Item 1',
              'Item 2',
              'Item 3 (expand)',
              'Item 4 (expand)'
            ]
          },
          {
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
    }),
    { info: ListingTableDocs }
  );
