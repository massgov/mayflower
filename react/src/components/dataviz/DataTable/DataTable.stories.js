import React from 'react';
import { StoryPage } from 'StorybookConfig/preview';

import round from 'MayflowerReactDataviz/helper';
import countyData from './DataTableCounty.json';
import townData from './DataTableTown.json';
import DataTable from './index';
import DataTableDocs from './DataTable.md';

export const DataTableExample = (args) => {
  const { isStriped, ...rest } = args;
  const props = {
    ...rest
  };
  if (isStriped) {
    props.className = '-striped';
  }
  return<DataTable {...props} />;
};
DataTableExample.storyName = 'Default';
DataTableExample.args = {
  isStriped: true,
  data: countyData,
  columns: [{
    Header: 'County',
    accessor: 'COUNTY'
  }, {
    Header: 'Trips started',
    accessor: 'ORIGIN_TRIPS', // String-based value accessors!
    className: 'data-align-right'
  }, {
    Header: 'Trips started per person',
    id: 'originTripsPerCap', // id is required for non string-based accessor
    accessor: (d) => Math.round(d.ORIGIN_TRIPS_PER_PERSON * 100) / 100,
    className: 'data-align-right'
  }],
  defaultPageSize: 14,
  showPaginationBottom: false
};
DataTableExample.argTypes = {
  isStriped: {
    control: {
      type: 'boolean'
    }
  },
  showPaginationBottom: {
    control: {
      type: 'boolean'
    }
  }
};
DataTableExample.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={DataTableExample} Description={DataTableDocs} />
  }
};
export const DataTableWithFilter = (args) => {
  const { isStriped, ...rest } = args;
  const props = {
    ...rest
  };
  if (isStriped) {
    props.className = '-striped';
  }
  return<DataTable {...props} />;
};
DataTableWithFilter.storyName = 'DataTable with Filter';
DataTableWithFilter.args = {
  columns: [{
    Header: 'Municipality',
    id: 'Municipality',
    accessor: 'TOWN',
    filterMethod: (filter, row) => row[filter.id].startsWith(filter.value.toUpperCase()),
    Filter: ({ filter, onChange }) => (
      <input
        placeholder="Enter a municipality name ..."
        value={filter ? filter.value : ''}
        onChange={(event) => onChange(event.target.value)}
      />
    )
  },
  {
    Header: 'Trips started',
    id: 'originTrips',
    accessor: (d) => round(d.ORIGIN_TRIPS, 2),
    className: 'data-align-right',
    Cell: (row) => (<div>{row.value.toLocaleString()}</div>)
  },
  {
    Header: 'Trips started per person',
    id: 'originTripsPerCap',
    className: 'data-align-right',
    accessor: (d) => Math.round(d.ORIGIN_TRIPS_PER_PERSON * 100) / 100
  }],
  data: townData,
  filterable: true,
  defaultPageSize: 10,
  defaultSorted: [
    {
      id: 'originTrips',
      desc: true
    }
  ],
  showPaginationBottom: true
};
DataTableWithFilter.argTypes = {
  isStriped: {
    control: {
      type: 'boolean'
    }
  },
  showPaginationBottom: {
    control: {
      type: 'boolean'
    }
  }
};
DataTableWithFilter.parameters = {
  docs: {
    page: () => <StoryPage StoryComponent={DataTableWithFilter} Description={DataTableDocs} />
  }
};
export default {
  title: 'dataviz/DataTable',
  component: DataTable,
  parameters: {
    docs: {
      page: () => <StoryPage Description={DataTableDocs} />
    }
  }
};
