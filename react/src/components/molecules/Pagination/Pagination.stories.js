import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';

import Pagination from './index';
import PaginationDocs from './Pagination.md';
import paginationOptions from './Pagination.knobs.options';

storiesOf('molecules', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs)
  .add(
    'Pagination', (() => {
      const props = {
        next: {
          disabled: boolean('pagination.next.disabled', false),
          text: text('pagination.next.text', 'Next'),
          hide: boolean('pagination.next.hide', false),
          onClick: action('Next Clicked.'),
          ariaLabel: text('pagination.next.ariaLabel', 'Go to Next Search Results Page')
        },
        prev: {
          disabled: boolean('pagination.prev.disabled', false),
          text: text('pagination.prev.text', 'Previous'),
          hide: boolean('pagination.prev.hide', false),
          onClick: action('Previous Clicked.'),
          ariaLabel: text('pagination.prev.ariaLabel', 'Go to Previous Search Results Page')
        },
        pages: object('pagination.pages', paginationOptions.pages)
      };
      return(
        <Pagination {...props} />
      );
    }),
    { info: PaginationDocs }
  );
