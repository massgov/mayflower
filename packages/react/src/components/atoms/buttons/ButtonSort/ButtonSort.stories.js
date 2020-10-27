import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import ButtonSort from './index';
import ButtonSortDocs from './ButtonSort.md';

export default {
  title: 'atoms/buttons/ButtonSort',
  component: ButtonSort,
  parameters: {
    docs: {
      page: () => <StoryPage Description={ButtonSortDocs} />
    }
  }
};

export const ButtonSortExample = (args) => <ButtonSort {...args} />;
ButtonSortExample.storyName = 'Default';
ButtonSortExample.args = {
  text: 'Date',
  direction: ''
};
ButtonSortExample.argTypes = {
  direction: {
    control: {
      type: 'select',
      options: {
        'do not sort (default)': '',
        ascending: 'asc',
        descending: 'dsc'
      }
    }
  }
};
