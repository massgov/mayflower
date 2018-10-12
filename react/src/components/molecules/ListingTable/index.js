import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const ListingTable = (props) => {

  return (
    <div class="ma__listing-table">
      <div class="ma__listing-table__container">
        <table>
          {props.rows.map((row) => {
            const visibleItems = row.visibleItems || 2;
            const inlineAccordion = (row.items.length > visibleItems) ? true : false;
            const rowClasses = ClassNames({
              'ma__rich-text': true,
              'js-accordion': inlineAccordion
            });
            const shownItems = row.items.slice(0, visibleItems);
            const shownItemsContent = shownItems.map((item) => (<span class="ma__listing-table__data-item">{item}</span>));
            const invisibleItems = (inlineAccordion) ? row.items.slice(visibleItems) : [];
            const invisibleItemsContent = (invisibleItems.length) ? (
              <div class="ma__listing-table__extra js-accordion-content">
                {invisibleItems.map((item) => (<span class="ma__listing-table__data-item">{item}</span>))}
              </div>
            ) : '';
            const invisibleMore = (inlineAccordion) ? (
              <div className="ma__listing-table__expand">
                <button type="button" className="js-accordion-link" aria-expanded="false">
                  <span>{row.moreLabel || 'More'}</span>
                  <span>{row.lessLabel || 'Less'}</span>
                </button>
              </div>
            ) : '';
            return (
              <tr>
                <th scope="row">{ row.label }</th>
                <td className={rowClasses}>
                  {shownItemsContent}
                  {invisibleItemsContent}
                  {invisibleMore}
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  );
}

ListingTable.propTypes = {
  /** Rows of data. Each containing specific parameters */
  rows: PropTypes.shape({
    /** Lable of row. Required */
    label: PropTypes.string.isRequired,
    /** Number of visible items. Defaults to 2. */
    visibleItems: PropTypes.number,
    /** More Label for when items are hidden. Defaults to "More" */
    moreLabel: PropTypes.string,
    /** Less Label for when items need hiding. Defaults to "Less" */
    lessLabel: PropTypes.string,
    /** Items in the table. Strings */
    items: PropTypes.arrayOf(PropTypes.string)
  })
}

export default ListingTable;
