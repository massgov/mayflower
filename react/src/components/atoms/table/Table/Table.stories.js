import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object, text } from '@storybook/addon-knobs/react';

import Table from '.';
import TableDocs from './Table.md';
import tableOptions from './Table.knobs.options';


storiesOf('atoms/table', module)
  .addDecorator(withInfo)
  .addDecorator(withKnobs({escapeHTML: false}))
  .add('Table', withInfo(`<div>${tableReadme}</div>`)(() => {
    tableOptions.feeTable = object('tableOptions.feeTable', tableOptions.feeTable);
    const tableProps = JSON.parse(JSON.stringify(tableOptions));
    tableProps.id = text('Table.id', tableOptions.id);
    return(<Table {...tableProps.feeTable} />);
  }),
    { info: TableDocs }
  );
