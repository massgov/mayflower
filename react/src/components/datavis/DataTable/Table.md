### Description
The Mayflower Table component is using ReactTable. See [ReactTable](https://www.npmjs.com/package/react-table) for its full API.

### Variables
#### Data

Simply pass the `data` prop anything that resembles an array or object. Client-side sorting and pagination are built in, and your table will update gracefully as you change any props. [Server-side data](#server-side-data) is also supported!

```javascript
<ReactTable
  data={[...]}
/>
```

**Pro Tip: Using the `resolveData` prop** - Any time the `data` prop value changes (using a `===` comparison), the table will update, but sometimes you need to materialize, alter, or shape this data before it enters the table. To do this, you can use the `resolveData` prop! It recieves the `data` prop as the only parameter and returns the resolved data.

```javascript
<ReactTable
  data={myData} // The data prop should be immutable and only change when you want to update the table
  resolveData={data => data.map(row => row)} // But you can break immutability here because `resolveData` runs when the `data` prop changes!
/>
```

#### Props

These are all of the available props (and their default values) for the main `<ReactTable />` component.

```javascript
{
  // General
  data: [],
  resolveData: data => resolvedData,
  loading: false,
  showPagination: true,
  showPaginationTop: false,
  showPaginationBottom: true
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  defaultPageSize: 20,
  minRows: undefined, // controls the minimum number of rows to display - default will be `pageSize`
  // NOTE: if you set minRows to 0 then you get rid of empty padding rows BUT your table formatting will also look strange when there are ZERO rows in the table
  showPageJump: true,
  collapseOnSortingChange: true,
  collapseOnPageChange: true,
  collapseOnDataChange: true,
  freezeWhenExpanded: false,
  sortable: true,
  multiSort: true,
  resizable: true,
  filterable: false,
  defaultSortDesc: false,
  defaultSorted: [],
  defaultFiltered: [],
  defaultResized: [],
  defaultExpanded: {},
  defaultFilterMethod: (filter, row, column) => {
    const id = filter.pivotId || filter.id
    return row[id] !== undefined ? String(row[id]).startsWith(filter.value) : true
  },
  defaultSortMethod: (a, b, desc) => {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? '' : a
    b = b === null || b === undefined ? '' : b
    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a
    b = typeof b === 'string' ? b.toLowerCase() : b
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0
  },
  PadRowComponent: () => <span>&nbsp;</span>, // the content rendered inside of a padding row

  // Controlled State Overrides (see Fully Controlled Component section)
  page: undefined,
  pageSize: undefined,
  sorted: [],
  filtered: [],
  resized: [],
  expanded: {},

  // Controlled State Callbacks
  onPageChange: undefined,
  onPageSizeChange: undefined,
  onSortedChange: undefined,
  onFilteredChange: undefined,
  onResizedChange: undefined,
  onExpandedChange: undefined,

  // Pivoting
  pivotBy: undefined,

  // Key Constants
  pivotValKey: '_pivotVal',
  pivotIDKey: '_pivotID',
  subRowsKey: '_subRows',
  aggregatedKey: '_aggregated',
  nestingLevelKey: '_nestingLevel',
  originalKey: '_original',
  indexKey: '_index',
  groupedByPivotKey: '_groupedByPivot',

  // Server-side callbacks
  onFetchData: () => null,

  // Classes
  className: '',
  style: {},

  // Component decorators
  getProps: () => ({}),
  getTableProps: () => ({}),
  getTheadGroupProps: () => ({}),
  getTheadGroupTrProps: () => ({}),
  getTheadGroupThProps: () => ({}),
  getTheadProps: () => ({}),
  getTheadTrProps: () => ({}),
  getTheadThProps: () => ({}),
  getTheadFilterProps: () => ({}),
  getTheadFilterTrProps: () => ({}),
  getTheadFilterThProps: () => ({}),
  getTbodyProps: () => ({}),
  getTrGroupProps: () => ({}),
  getTrProps: () => ({}),
  getThProps: () => ({}),
  getTdProps: () => ({}),
  getTfootProps: () => ({}),
  getTfootTrProps: () => ({}),
  getTfootThProps: () => ({}),
  getPaginationProps: () => ({}),
  getLoadingProps: () => ({}),
  getNoDataProps: () => ({}),
  getResizerProps: () => ({}),

  // Global Column Defaults
  // To override only some values, import { ReactTableDefaults } from 'react-table'
  // and construct your overrides (e.g. {...ReactTableDefaults.column, className: 'react-table-cell'})
  column: {
    // Renderers
    Cell: undefined,
    Header: undefined,
    Footer: undefined,
    Aggregated: undefined,
    Pivot: undefined,
    PivotValue: undefined,
    Expander: undefined,
    Filter: undefined,
    // Standard options
    sortable: undefined, // use table default
    resizable: undefined, // use table default
    filterable: undefined, // use table default
    show: true,
    minWidth: 100,
    // Cells only
    className: '',
    style: {},
    getProps: () => ({}),
    // Headers only
    headerClassName: '',
    headerStyle: {},
    getHeaderProps: () => ({})
    // Footers only
    footerClassName: '',
    footerStyle: {},
    getFooterProps: () => ({}),
    filterAll: false,
    filterMethod: undefined,
    sortMethod: undefined,
    defaultSortDesc: undefined,
  },

  // Global Expander Column Defaults
  // To override only some values, import { ReactTableDefaults } from 'react-table'
  // and construct your overrides (e.g. {...ReactTableDefaults.expanderDefaults, sortable: true})
  expanderDefaults: {
    sortable: false,
    resizable: false,
    filterable: false,
    width: 35
  },

  // Global Pivot Column Defaults
  pivotDefaults: {},

  // Text
  previousText: 'Previous',
  nextText: 'Next',
  loadingText: 'Loading...',
  noDataText: 'No rows found',
  pageText: 'Page',
  ofText: 'of',
  rowsText: 'rows',
}
```

You can easily override the core defaults like so:

```javascript
import { ReactTableDefaults } from "react-table";

Object.assign(ReactTableDefaults, {
  defaultPageSize: 10,
  minRows: 3
  // etc...
});
```

Or just define them as props

```javascript
<ReactTable
  defaultPageSize={10}
  minRows={3}
  // etc...
/>
```

#### Columns

`<ReactTable />` requires a `columns` prop, which is an array of objects containing the following properties

```javascript
[{
  // Renderers - For more information, see "Renderers" section below
  Cell: JSX | String | Function // Used to render a standard cell, defaults to the accessed value
  Header: JSX | String | Function // Used to render the header of a column or column group
  Footer: JSX | String | Function // Used to render the footer of a column
  Filter: JSX | cellInfo => ( // Used to render the filter UI of a filter-enabled column
    <select onChange={event => onFiltersChange(event.target.value)} value={filter ? filter.value : ''}></select>
    // The value passed to onFiltersChange will be the value passed to filter.value of the filterMethod
  )
  Aggregated: JSX | String | Function // Used to render aggregated cells. Defaults to a comma separated list of values.
  Pivot: JSX | String | Function | cellInfo => ( // Used to render a pivoted cell
    <span>
      <Expander /><PivotValue /> // By default, will utilize the the PivotValue and Expander components at run time
    </span>
  ),
  PivotValue: JSX | String | Function // Used to render the value inside of a Pivot cell
  Expander: JSX | String | Function // Used to render the expander in both Pivot and Expander cells

  // General
  accessor: 'propertyName', // or Accessor eg. (row) => row.propertyName (see "Accessors" section for more details)
  id: 'myProperty', // Conditional - A unique ID is required if the accessor is not a string or if you would like to override the column name used in server-side calls
  sortable: boolean, // Overrides the table option
  resizable: boolean, // Overrides the table option
  filterable: boolean, // Overrides the table option
  show: true, // can be used to hide a column
  width: undefined, // A hardcoded width for the column. This overrides both min and max width options
  minWidth: 100, // A minimum width for this column. If there is extra room, column will flex to fill available space (up to the max-width, if set)
  maxWidth: undefined, // A maximum width for this column.

  // Special
  pivot: false,
  // Turns this column into a special column for specifying pivot position in your column definitions.
  // The `pivotDefaults` options will be applied on top of this column's options.
  // It will also let you specify rendering of the header (and header group if this special column is placed in the `columns` option of another column)
  expander: false,
  // Turns this column into a special column for specifying expander position and options in your column definitions.
  // The `expanderDefaults` options will be applied on top of this column's options.
  // It will also let you specify rendering of the header (and header group if this special column is placed in the `columns` option of another column) and
  // the rendering of the expander itself via the `Expander` property

  // Cell Options
  className: '', // Set the classname of the `td` element of the column
  style: {}, // Set the style of the `td` element of the column
  // Header & HeaderGroup Options
  headerClassName: '', // Set the classname of the `th` element of the column
  headerStyle: {}, // Set the style of the `th` element of the column
  getHeaderProps: (state, rowInfo, column, instance) => ({}), // a function that returns props to decorate the `th` element of the column

  // Header Groups only
  columns: [...], // See Header Groups section below

  // Footer
  footerClassName: '', // Set the classname of the `td` element of the column's footer
  footerStyle: {}, // Set the style of the `td` element of the column's footer
  getFooterProps: (state, rowInfo, column, instance) => ({}), // A function that returns props to decorate the `td` element of the column's footer

  // Filtering
  filterMethod: (filter, row || rows, column) => {return true}, // A function returning a boolean that specifies the filtering logic for the column
    // 'filter' == an object specifying which filter is being applied. Format: {id: [the filter column's id], value: [the value the user typed in the filter field], pivotId: [if filtering on a pivot column, the pivotId will be set to the pivot column's id and the `id` field will be set to the top level pivoting column]}
    // 'row' || 'rows' == the row (or rows, if filterAll is set to true) of data supplied to the table
    // 'column' == the column that the filter is on
  filterAll: false
}]
```

## Renderers

React Table supports very flexible renderers for just about everything:

* `Cell` - Renders a standard cell
* `Header` - Renders a column header or column group header
* `Footer` - Renders a column footer
* `Filter` - Renders a column's filter UI
* `Aggregated` - Renders an aggregated cell
* `Pivot` - Renders a pivoted cell (by default, will utilize `Expander` and `PivotValue` renderers)
* `PivotValue` - Renders the value inside a `Pivot` renderer
* `Expander` - Renders the Expander used in both the default `Pivot` renderer and any expander-designated column

Any of these renderers can be one of the following:

* A React Class
* JSX or any rendered react component
* Stateless functional component
* Function that returns any primitive

All of these formats receive the following props:

```javascript
{
  // Row-level props
  row: Object, // the materialized row of data
  original: , // the original row of data
  index: '', // the index of the row in the original array
  viewIndex: '', // the index of the row relative to the current view
  level: '', // the nesting level of this row
  nestingPath: '', // the nesting path of this row
  aggregated: '', // true if this row's values were aggregated
  groupedByPivot: '', // true if this row was produced by a pivot
  subRows: '', // any sub rows defined by the `subRowKey` prop

  // Cells-level props
  isExpanded: '', // true if this row is expanded
  value: '', // the materialized value of this cell
  resized: '', // the resize information for this cell's column
  show: '', // true if the column is visible
  width: '', // the resolved width of this cell
  maxWidth: '', // the resolved maxWidth of this cell
  tdProps: '', // the resolved tdProps from `getTdProps` for this cell
  columnProps: '', // the resolved column props from 'getProps' for this cell's column
  classes: '', // the resolved array of classes for this cell
  styles: '' // the resolved styles for this cell
}
```

## Accessors

Accessors are functions that return the value to populate the row's value for the column.
This lets the render function not have to worry about accessing the correct data, the value is automatically populated in it's props.

If a `string` or `array` is passed the default accessor is used.
The default accessor will parse the input into an array and recursively flatten it.
Any values that contain a dot (`.`) will be split.
Any values that contain bracket (`[]`) will be split.
This array is then used as the path to the value to return.

("$" is the placeholder value that would be returned by the default accessor)

| value        | path            | data                   |
| ------------ | --------------- | ---------------------- |
| "a"          | ["a"]           | {"a": $}               |
| "a.b"        | ["a", "b"]      | {"a": {"b": $}}        |
| "a[0]"       | ["a", "0"]      | {"a": [$]}             |
| ["a.b", "c"] | ["a", "b", "c"] | {"a": {"b": {"c": $}}} |

_NOTE_
If your data has a field/key with a dot (`.`) you will need to supply a custom accessor.

#### Column Header Groups

To group columns with another header column, just nest your columns in a header column. Header columns utilize the same header properties as regular columns.

```javascript
const columns = [{
  Header: 'Favorites',
  headerClassName: 'my-favorites-column-header-group'
  columns: [{
    Header: 'Color',
    accessor: 'favorites.color'
  }, {
    Header: 'Food',
    accessor: 'favorites.food'
  }, {
    Header: 'Actor',
    accessor: 'favorites.actor'
  }]
}]
```

#### Custom Cell, Header and Footer Rendering

You can use any react component or JSX to display content in column headers, cells and footers. Any component you use will be passed the following props (if available):

* `row` - Original row from your data
* `original` - The post-accessed values from the original row
* `index` - The index of the row
* `viewIndex` - the index of the row relative to the current page
* `level` - The nesting depth (zero-indexed)
* `nestingPath` - The nesting path of the row
* `aggregated` - A boolean stating if the row is an aggregation row
* `subRows` - An array of any expandable sub-rows contained in this row

```javascript
// This column uses a stateless component to produce a different colored bar depending on the value
// You can also use stateful components or any other function that returns JSX
const columns = [
  {
    Header: () => (
      <span>
        <i className="fa-tasks" /> Progress
      </span>
    ),
    accessor: "progress",
    Cell: row => (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#dadada",
          borderRadius: "2px"
        }}
      >
        <div
          style={{
            width: `${row.value}%`,
            height: "100%",
            backgroundColor:
              row.value > 66
                ? "#85cc00"
                : row.value > 33
                  ? "#ffbf00"
                  : "#ff2e00",
            borderRadius: "2px",
            transition: "all .2s ease-out"
          }}
        />
      </div>
    )
  }
];
```