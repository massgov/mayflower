import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import countyData from './county.data.json';
//import townData from './town.data.json';

import Table from './index';

storiesOf('dataviz', module).addDecorator(withKnobs)
  .add('Table', withInfo(`<div></div>`)(() => {
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
      columns
    }
    return(
      <Table {...props}/>
    );
  }));
