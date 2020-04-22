import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs';

import Pagination from './index';
import PaginationDocs from './Pagination.md';
import paginationOptions from './Pagination.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Pagination', (() => {
      const props = {
        next: {
          disabled: boolean('Pagination next: disabled', false, 'Next'),
          text: text('Pagination next: text', 'Next', 'Next'),
          hide: boolean('Pagination next: hide', false, 'Next'),
          onClick: action('Next Clicked.')
        },
        prev: {
          disabled: boolean('Pagination prev: disabled', false, 'Previous'),
          text: text('Pagination prev: text', 'Previous', 'Previous'),
          hide: boolean('Pagination prev: hide', false, 'Previous'),
          onClick: action('Previous Clicked.')
        },
        pages: object('Pagination pages', paginationOptions.pages)
      };
      return(
        <Pagination {...props} />
      );
    }),
    { info: PaginationDocs }
  );
