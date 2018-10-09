import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean, object } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import round from '../helper';

import countyData from './county.data.json';
import townData from './town.data.json';

import DataTable from './index';
import DataTableDocs from './DataTable.md';

storiesOf('dataviz/DataTable', module).addDecorator(withKnobs)
  .add('DataTable Simple', withInfo(`<div>${DataTableDocs}</div>`)(() => {
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
    const isStriped = boolean('DataTable.isStriped', true);
    const props = {
      data: countyData,
      columns,
      defaultPageSize: 14,
      showPaginationBottom: false,
      className: isStriped && '-striped'
    };
    return(
      <DataTable {...props} />
    );
  }))
  .add('DataTable with Filter', withInfo()(() => {
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
    const isStriped = boolean('DataTable.isStriped', true);
    const props = {
      data: townData,
      filterable: boolean('DataTable.filterable', true),
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
  }));
