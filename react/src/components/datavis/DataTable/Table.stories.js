import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import countyData from './county.data.json';
import townData from './town.data.json';

import DataTable from './index';
import TableDocs from './Table.md';

storiesOf('dataviz/DataTable', module).addDecorator(withKnobs)
  .add('DataTable Simple', withInfo(`<div>${TableDocs}</div>`)(() => {
    const columns = [{
      Header: 'County',
      accessor: 'COUNTY' 
    },{
      Header: 'Trips started',
      accessor: 'ORIGIN_TRIPS' // String-based value accessors!
    }, {
      Header: 'Trips started per person',
      accessor: 'ORIGIN_TRIPS_PER_PERSON'
    }]
    const props = {
      data: countyData,
      columns,
      defaultPageSize: 14,
      showPaginationBottom: false
    }
    return(
      <DataTable {...props}/>
    );
  }))
  .add('DataTable with Filter', withInfo()(() => {
    const columnsConfig = (header) => {
      return  [
          {
            Header: "Municipality",
            id: "Municipality",
            accessor: d => d[header],
            filterMethod: (filter, row) =>{
              return row[filter.id].startsWith(filter.value.toUpperCase())
            },
            Filter: ({filter, onChange}) => (
            <input
                   placeholder="Enter a municipality name ..."
                   value={filter ? filter.value : ''}
                   onChange={event => onChange(event.target.value)}
              />
            )
          },
          {
            Header: "Trips started",
            id: "originTrips",
            accessor: d => d.ORIGIN_TRIPS,
            Cell: row => (<div>{row.value.toLocaleString()}</div>)
          },
          {
            Header: "Trips started per person",
            id: "originTripsPerCap",
            accessor: d => d.ORIGIN_TRIPS_PER_PERSON
          },
        ]
    }
    const props = {
      data: townData,
      filterable: true,
      columns: columnsConfig('TOWN'),
      defaultPageSize: 10,
      defaultSorted: [
        {
          id: "originTrips",
          desc: true
        }
      ],
      className: "-striped -highlight",
      showPaginationBottom: true
    }
    return(
      <DataTable {...props}/>
    );
  }));
