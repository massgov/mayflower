import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import Table from '.';
import TableDocs from './Table.md';
import tableOptions from './Table.knobs.options';

export const TableExample = (args) => <Table {...args} />;

TableExample.storyName = 'Default';
TableExample.args = {
  id: tableOptions.id,
  ...tableOptions.feeTable
};

export default {
  title: 'atoms/Table',
  component: Table,
  parameters: {
    docs: {
      page: () => <StoryPage Description={TableDocs} />
    }
  }
};
