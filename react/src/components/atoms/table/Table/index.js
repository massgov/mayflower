import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './style.css';

const Table = (table) => {
  let tableWideClass = '';
  let tableHeaderRow = [];
  if (table.head && table.head.rows) {
    tableHeaderRow = table.head.rows[table.head.rows.length - 1];
    if (tableHeaderRow.cells.length > 3) {
      tableWideClass = ' ma__table--wide';
    }
  }
  const mergedCells = false;
  const responsiveClasses = classnames({
    'ma__table--responsive__wrapper': true,
    'ma__table--merged-cells': !!(mergedCells)
  });
  return(
    <div className="ma__table--responsive js-ma-responsive-table">
      <nav className="ma__table__horizontal-nav">
        <button className="ma__table__horizontal-nav__left" aria-controls={table.id}>
          <span className="visually-hidden">Scroll left</span>
        </button>
        <div className="ma__scroll-indicator" aria-controls={table.id} role="scrollbar" aria-orientation="horizontal">
          <div className="ma__scroll-indicator__button" />
        </div>

        <button className="ma__table__horizontal-nav__right" aria-controls={table.id}>
          <span className="visually-hidden">Scroll right</span>
        </button>
      </nav>
      <div className={responsiveClasses} role="region" id={table.id}>
        <table className={`ma__table${tableWideClass}`}>
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
                    if (tableHeaderRow.cells && tableHeaderRow.cells.length > 0) {
                      // Mayflower twig loops started at 1 - add one to index.
                      dataLabel = tableHeaderRow.cells[(cellIndex + 1) - tableIndexOffset].text;
                    }
                    const defaultCellKey = `${defaultRowKey}-cell${cellIndex}`;
                    return(cell.heading ? (
                      <th
                        key={cell.key || defaultCellKey}
                        data-label={cellIndex > 0 ? dataLabel : null}
                        scope="row"
                        colSpan={cell.colspan || null}
                        rowSpan={cell.rowspan || null}
                      >{cell.text}
                      </th>
                    ) : (
                      <td
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
          </tbody>))
          }
        </table>
      </div>
    </div>
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
