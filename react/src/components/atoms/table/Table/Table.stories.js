import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Table from '.';
import TableDocs from './Table.md';
import tableOptions from './Table.knobs.options';

storiesOf('atoms/table', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({escapeHTML: false}))
  .add(
    'Table', (() => (
      <Table {...object('tableOptions.feeTable', tableOptions.feeTable)} />
    )),
    { info: TableDocs }
  );
