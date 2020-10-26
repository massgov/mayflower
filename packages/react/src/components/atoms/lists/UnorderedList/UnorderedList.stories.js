import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import UnorderedList from './index';
import UnorderedListDocs from './UnorderedList.md';

export const UnorderedListExample = (args) => (<UnorderedList {...args} />);

UnorderedListExample.storyName = 'Default';
UnorderedListExample.args = {
  sublist: [{
    text: 'This is a list item in an unordered list'
  }, {
    text: 'An unordered list is a list in which the sequence of items is not important. Sometimes, an unordered list is a bulleted list. And this is a long list item in an unordered list that can wrap onto a new line.'
  }, {
    text: 'Lists can be nested inside of each other',
    sublist: [{
      text: 'This is a nested list item'
    }, {
      text: 'This is another nested list item in an unordered list'
    }]
  }, {
    text: 'This is the last list item'
  }]
};

export default {
  title: 'atoms/lists/UnorderedList',
  component: UnorderedList,
  parameters: {
    docs: {
      page: () => <StoryPage Description={UnorderedListDocs} />
    }
  }
};
