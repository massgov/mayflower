import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, object } from '@storybook/addon-knobs/react';

import Table from '.';
import tableReadme from './Table.md';
import tableOptions from './Table.knobs.options';

tableOptions.feeTable.head.rows[0].cells.push({
  heading: false,
  colspan: '',
  rowspan: '',
  text: 'Testing'
});
tableOptions.feeTable.bodies.rows = tableOptions.feeTable.bodies.map((body) => {
  return body.rows.map((row) => {
    row.cells.push({
      heading: false,
      colspan: '',
      rowspan: '',
      text: 'testtest'
    });
    return row;
  });
});

storiesOf('atoms/table', module).addDecorator(withKnobs)
  .add('Table', withInfo(`<div>${tableReadme}</div>`)(() => (<Table {...object('tableOptions.feeTable', tableOptions.feeTable)} />)));
