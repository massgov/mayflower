import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Collapse from '../../animations/Collapse';

import './style.css';

class ListingTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  };

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const {row} = this.props;
    const visibleItems = row.visibleItems || 2;
    const inlineAccordion = (row.items.length > visibleItems);
    const rowClasses = ClassNames({
      'ma__rich-text': true,
      'js-accordion': inlineAccordion
    });
    const shownItems = row.items.slice(0, visibleItems);
    const invisibleItems = (inlineAccordion) ? row.items.slice(visibleItems) : [];
    return(
      <tr>
        <th scope="row">{ row.label }</th>
        <td className={rowClasses}>
          {shownItems.map((item, index) => (
            <span key={`${row.label}-shown-item-${index}`} className="ma__listing-table__data-item">{item}</span>
          ))}
          {(invisibleItems.length > 0) && (
            <Collapse in={this.state.open} dimension="height">
              <div className="ma__listing-table__extra collapsed">
                {invisibleItems.map((item, index) => (
                  <span key={`${row.label}-invisible-item-${index}`} className="ma__listing-table__data-item">{item}</span>
                ))}
              </div>
            </Collapse>
          )}
          {(inlineAccordion) && (
            <div className="ma__listing-table__expand">
              <button
                type="button"
                onClick={(e) => this.handleClick(e)}
                aria-expanded="false"
              >
                {(this.state.open) ?
                  (<span>{row.lessLabel || 'Less'}</span>) :
                  (<span>{row.moreLabel || 'More'}</span>)
                }
              </button>
            </div>
          )}
        </td>
      </tr>
    );
  }
}

const ListingTable = (props) => {
  const rows = props.rows;
  return(
    <div className="ma__listing-table">
      <div className="ma__listing-table__container">
        <table>
          <tbody>
            {rows.map((row, index) => (<ListingTableItem key={`listing-table-item-${index}`} row={row} />))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

ListingTable.propTypes = {
  /** Rows of data. Each containing specific parameters */
  rows: PropTypes.arrayOf(PropTypes.shape({
    /** Lable of row. Required */
    label: PropTypes.string.isRequired,
    /** Number of visible items. Defaults to 2. */
    visibleItems: PropTypes.number,
    /** More Label for when items are hidden. Defaults to "More" */
    moreLabel: PropTypes.string,
    /** Less Label for when items need hiding. Defaults to "Less" */
    lessLabel: PropTypes.string,
    /** Items in the table. */
    items: PropTypes.arrayOf(PropTypes.oneOf(PropTypes.string, PropTypes.object))
  }))
};

export default ListingTable;
