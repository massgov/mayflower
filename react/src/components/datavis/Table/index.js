import React from 'react';
import ReactTable from 'react-table';

import '../../../../node_modules/react-table/react-table.css';

const Table = (props) => {
    const { data } = props
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
    
    return(
      <ReactTable
        data={data}
        columns={columns}
      />
    )
}

export default Table;