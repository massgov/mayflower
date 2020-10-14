import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';
import { action } from '@storybook/addon-actions';

import Pagination from './index';
import PaginationDocs from './Pagination.md';
import paginationOptions from './Pagination.knobs.options';

export const PaginationExample = (args) => <Pagination {...args} />;

PaginationExample.storyName = 'Default';
PaginationExample.args = {
  next: {
    disabled: false,
    text: 'Next',
    hide: false,
    onClick: action('Next Clicked.')
  },
  prev: {
    disabled: false,
    text: 'Previous',
    hide: false,
    onClick: action('Previous Clicked.')
  },
  pages: paginationOptions.pages
};


export default {
  title: 'molecules/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      page: () => <StoryPage Description={PaginationDocs} />
    }
  }
};
