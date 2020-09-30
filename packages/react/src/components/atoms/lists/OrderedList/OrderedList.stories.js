import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import OrderedList from './index';
import OrderedListDocs from './OrderedList.md';

export const OrderedListExample = (args) => (<OrderedList {...args} />);

OrderedListExample.storyName = 'Default';
OrderedListExample.args = {
  sublist: [{
    text: 'This is a list item in an ordered list'
  }, {
    text: 'An ordered list is a list in which the sequence of items is important.'
  }, {
    text: 'Lists can be nested inside of each other',
    sublist: [{
      text: 'This is a nested list item'
    }, {
      text: 'This is another nested list item in an ordered list'
    }]
  }, {
    text: 'This is the last list item'
  }]
};

export default {
  title: 'atoms/lists/OrderedList',
  component: OrderedList,
  parameters: {
    docs: {
      page: () => <StoryPage Description={OrderedListDocs} />
    }
  }
};
