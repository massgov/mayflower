import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react';

import Pagination from './index';
import PaginationDocs from './Pagination.md';
import paginationOptions from './Pagination.knobs.options';

storiesOf('molecules', module).addDecorator(withKnobs)
  .add('Pagination', withInfo(`<div>${PaginationDocs}</div>`)(() => {
    const props = {
      next: {
        disabled: boolean('pagination.next.disabled', false),
        text: text('pagination.next.text', 'Next'),
        hide: boolean('pagination.next.hide', false)
      },
      prev: {
        disabled: boolean('pagination.prev.disabled', false),
        text: text('pagination.prev.text', 'Previous'),
        hide: boolean('pagination.prev.hide', false)
      },
      pages: object('pagination.pages', paginationOptions.pages)
    };
    return(
      <Pagination {...props} />
    );
  }));
