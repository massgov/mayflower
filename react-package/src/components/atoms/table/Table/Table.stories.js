import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object, text } from '@storybook/addon-knobs';

import Table from '.';
import TableDocs from './Table.md';
import tableOptions from './Table.knobs.options';


storiesOf('atoms/table', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'Table', (() => {
      tableOptions.feeTable = object('feeTable', tableOptions.feeTable);
      const tableProps = JSON.parse(JSON.stringify(tableOptions));
      tableProps.id = text('id', tableOptions.id);
      return(<Table {...tableProps.feeTable} />);
    }),
    { info: TableDocs }
  );
