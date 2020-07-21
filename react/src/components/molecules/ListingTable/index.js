/**
 * ListingTable module.
 * @module @massds/mayflower-react/ListingTable
 * @requires module:@massds/mayflower-assets/scss/02-molecules/listing-table
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-with-icon
 * @requires module:@massds/mayflower-assets/scss/01-atoms/button-search
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import Collapse from 'MayflowerReactAnimations/Collapse';
import ButtonWithIcon from 'MayflowerReactButtons/ButtonWithIcon';
import Chevron from 'MayflowerReactBase/Icon/Chevron';

class ListingTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClick = () => {
    this.setState((state) => ({
      open: !state.open
    }));
  };

  render() {
    const { row } = this.props;
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
            /* eslint-disable-next-line react/no-array-index-key */
            <span key={`${row.label}-shown-item-${index}`} className="ma__listing-table__data-item">{item}</span>
          ))}
          {(invisibleItems.length > 0) && (
            <Collapse in={this.state.open} dimension="height">
              <div className="ma__listing-table__extra collapsed">
                {invisibleItems.map((item, index) => (
                  /* eslint-disable-next-line react/no-array-index-key */
                  <span key={`${row.label}-invisible-item-${index}`} className="ma__listing-table__data-item">{item}</span>
                ))}
              </div>
            </Collapse>
          )}
          {(inlineAccordion) && (
            <div className="ma__listing-table__expand-button">
              <ButtonWithIcon
                text={this.state.open ? (row.lessLabel || 'Less') : (row.moreLabel || 'More')}
                theme="c-primary"
                usage="quaternary-simple"
                type="button"
                icon={<Chevron height={20} width={20} />}
                onClick={(e) => this.handleClick(e)}
                expanded={this.state.open}
                capitalized
              />
            </div>
          )}
        </td>
      </tr>
    );
  }
}

ListingTableItem.propTypes = {
  row: PropTypes.shape({
    /** Lable of row. Required */
    label: PropTypes.string.isRequired,
    /** Number of visible items. Defaults to 2. */
    visibleItems: PropTypes.number,
    /** More Label for when items are hidden. Defaults to "More" */
    moreLabel: PropTypes.string,
    /** Less Label for when items need hiding. Defaults to "Less" */
    lessLabel: PropTypes.string,
    /** Items in the table. */
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  })
};

const ListingTable = (props) => {
  const rows = props.rows;
  return(
    <div className="ma__listing-table">
      <div className="ma__listing-table__container">
        <table>
          <tbody>
            {rows.map((row, index) => (
              /* eslint-disable-next-line react/no-array-index-key */
              <ListingTableItem key={`listing-table-item-${index}`} row={row} />
            ))}
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
    items: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object]))
  }))
};

export default ListingTable;
