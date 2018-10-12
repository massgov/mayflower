import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';

import ListingTable from './index';
import ListingTableDocs from './ListingTable.md';

storiesOf('molecules', module)
  .addDecorator(withKnobs)
  .add('ListingTable', withInfo(`<div>${ListingTableDocs}</div>`)(() => {
    const props = {
      rows: object('Data Rows', [
        {
          label: 'Label 1',
          items: [
            'First item',
            'Second item'
          ]
        },
        {
          label: 'Label 2 (4 items)',
          moreLabel: 'moar',
          lessLabel: 'less',
          items: [
            'Item 1',
            'Item 2',
            'Item 3 (expand)',
            'Item 4 (expanded)'
          ]
        },
        {
          label: 'Show 4 items',
          visibleItems: 4,
          items: [
            'Item 1',
            'Item 2',
            'Item 3 (expand)',
            'Item 4 (expanded)'
          ]
        }
      ]),
    }
    return(<ListingTable {...props} />);
  }));
