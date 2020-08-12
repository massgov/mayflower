import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import round from 'MayflowerReactDataviz/helper';
import countyData from './DataTableCounty.json';
import townData from './DataTableTown.json';
import DataTable from './index';
import DataTableDocs from './DataTable.md';

/* eslint-disable react/prop-types */

storiesOf('dataviz/DataTable', module)
  .addDecorator(withKnobs({ escapeHTML: false }))
  .add(
    'DataTable Simple', (() => {
      const columns = [{
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
      }];
      const isStriped = boolean('isStriped', true);
      const props = {
        data: countyData,
        columns,
        defaultPageSize: 14,
        showPaginationBottom: false,
        className: isStriped ? '-striped' : null
      };
      return(
        <DataTable {...props} />
      );
    }),
    { info: DataTableDocs }
  )
  .add(
    'DataTable with Filter', (() => {
      const columns = [{
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
      }];
      const isStriped = boolean('isStriped', true);
      const props = {
        data: townData,
        filterable: boolean('filterable', true),
        columns,
        defaultPageSize: 10,
        defaultSorted: [
          {
            id: 'originTrips',
            desc: true
          }
        ],
        className: isStriped && '-striped',
        showPaginationBottom: true
      };
      return(
        <DataTable {...props} />
      );
    }),
    { info: DataTableDocs }
  );
