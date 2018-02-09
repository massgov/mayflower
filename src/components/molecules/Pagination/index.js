import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (pagination) => (
  <div className="ma__pagination js-pagination">
    <div className="ma__pagination__container">
      <button
        className="ma__pagination__prev js-pagination-prev"
        type="button"
        disabled={pagination.prev.disabled}
      >
        {pagination.prev.text}
      </button>
      { pagination.pages.map((page) => (
          page.text === 'spacer' ?
            <span className="ma__pagination__spacer">&hellip;</span> :
            <button
              className={page.active ? 'ma__pagination__page js-pagination-page is-active' : 'ma__pagination__page js-pagination-page'}
              type="button"
              data-page={page.text}
            >
              {page.text}
            </button>
        ))
      }
      <button
        className="ma__pagination__next js-pagination-next"
        type="button"
        disabled={pagination.next.disabled}
      >
        {pagination.next.text}
      </button>
    </div>
  </div>
);

Pagination.propTypes = {
  /** next.disabled: Defines whether the next button is available or not to users.
      next.text: Defines the text shown for the next button. */
  next: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired
  }),
  /** prev.disabled: Defines whether the prev button is available or not to users.
      prev.text: Defines the text shown for the previous button. */
  prev: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired
  }),
  /** Pages is an array that defines what page numbers users are able to paginate through.
      pages.active: Defines whether the page number is active or not.
      pages.text: Defines the text shown for page number. */
  pages: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    text: PropTypes.string.isRequired
  }))
};

export default Pagination;
