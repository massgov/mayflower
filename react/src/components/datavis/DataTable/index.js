import React from 'react';
import ReactTable from 'react-table';

import '../../../../node_modules/react-table/react-table.css';

const DataTable = (props) => {
    return(
      <ReactTable {...props} />
    )
}

export default DataTable;