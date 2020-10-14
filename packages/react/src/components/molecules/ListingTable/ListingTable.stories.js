import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ListingTable from './index';
import ListingTableDocs from './ListingTable.md';

export const ListingTableExample = (args) => <ListingTable {...args} />;

ListingTableExample.storyName = 'Default';
ListingTableExample.args = {
  rows: [
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
  ]
};


export default {
  title: 'molecules/ListingTable',
  component: ListingTable,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ListingTableDocs} />
    }
  }
};
