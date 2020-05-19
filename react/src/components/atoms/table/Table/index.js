import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.scss';

const Table = (table) => {
  let tableWideClass = '';
  let tableHeaderRow = [];
  if (table.head && table.head.rows) {
    tableHeaderRow = table.head.rows[table.head.rows.length - 1];
    if (tableHeaderRow.cells.length > 3) {
      tableWideClass = ' ma__table--wide';
    }
  }
  return(
    <table id={table.id} className={`ma__table${tableWideClass}`}>
      {
        (table.head && table.head.rows) &&
        <thead>
          { table.head.rows.map((row, rowIndex) => (
            <tr key={row.key || `thead-row${rowIndex}`}>
              { row.cells.map((cell, cellIndex) => (
                <th
                  key={cell.key || `thead-row${rowIndex}-cell${cellIndex}`}
                  scope="col"
                  colSpan={cell.colspan || null}
                  rowSpan={cell.rowspan || null}
                >{cell.text}
                </th>
            ))}
            </tr>
          ))}
        </thead>
    }{table.bodies.map((body, bodyIndex) => (
      <tbody key={body.key || `tbody${bodyIndex}`}>
        { body.rows.map((row, rowIndex) => {
          const tableIndexOffset = row.rowSpanOffset ? 0 : 1;
          const defaultRowKey = `tbody${bodyIndex}-row${rowIndex}`;
          return(
            <tr key={row.key || defaultRowKey} className={row.rowSpanOffset ? 'is-offset' : null}>
              { row.cells.map((cell, cellIndex) => {
                let dataLabel = null;
                const headerCellIndex = (cellIndex + 1) - tableIndexOffset;
                if (tableHeaderRow.cells && tableHeaderRow.cells.length > 0 && headerCellIndex > 0) {
                  // Mayflower twig loops started at 1 - add one to index.
                  dataLabel = tableHeaderRow.cells[headerCellIndex] ? tableHeaderRow.cells[headerCellIndex].text : '';
                }
                const defaultCellKey = `${defaultRowKey}-cell${cellIndex}`;
                const cellClasses = classnames({
                  'ma__table-cell': true,
                  'no-left-pad': (!row.rowSpanOffset && !cell.heading && cellIndex === 1)
                });
                return(cell.heading ? (
                  <th
                    className={cellClasses}
                    key={cell.key || defaultCellKey}
                    data-label={dataLabel}
                    scope="row"
                    colSpan={cell.colspan || null}
                    rowSpan={cell.rowspan || null}
                  >{cell.text}
                  </th>
                ) : (
                  <td
                    className={cellClasses}
                    key={cell.key || defaultCellKey}
                    data-label={dataLabel}
                    colSpan={cell.colspan || null}
                    rowSpan={cell.rowspan || null}
                  >
                    {cell.text}
                  </td>
                ));
            })}
            </tr>
          );
        })
        }
      </tbody>
    ))
      }
    </table>
  );
};

Table.propTypes = {
  id: PropTypes.string,
  head: PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({
      rowSpanOffset: PropTypes.bool,
      cells: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.bool.isRequired,
        colspan: PropTypes.string,
        rowspan: PropTypes.string,
        text: PropTypes.string.isRequired,
        // Optional key for cell in case the table is dynamic.
        key: PropTypes.string
      })),
      // Optional key for row in case the table is dynamic.
      key: PropTypes.string
    }))
  }),
  bodies: PropTypes.arrayOf(PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.shape({
      // If true, padding-left is set to zero on the first th/td.
      rowSpanOffset: PropTypes.bool,
      cells: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.bool.isRequired,
        colspan: PropTypes.string,
        rowspan: PropTypes.string,
        text: PropTypes.string.isRequired,
        // Optional key for cell in case the table is dynamic.
        key: PropTypes.string
      })),
      // Optional key for row in case the table is dynamic.
      key: PropTypes.string
    })),
    key: PropTypes.string
  }))
};

Table.defaultProps = {
};

export default Table;
