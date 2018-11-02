import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Pagination = (pagination) => (
  <div className="ma__pagination js-pagination" role="navigation" aria-label="Pagination Navigation">
    <div className="ma__pagination__container">
      {!pagination.prev.hide && (
        <button
          className="ma__pagination__prev js-pagination-prev"
          type="button"
          disabled={pagination.prev.disabled}
          onClick={pagination.prev.onClick}
          aria-label={pagination.prev.ariaLabel}
        >
          {pagination.prev.text}
        </button>
    )}
      {pagination.pages.map((page, pageIndex) => {
        const key = `pagination.item.${pageIndex}`;
        return page.text === 'spacer' ? (
          <span key={key} className="ma__pagination__spacer">&hellip;</span>
        ) : (
          <button
            className={page.active ? 'ma__pagination__page js-pagination-page is-active' : 'ma__pagination__page js-pagination-page'}
            type="button"
            data-page={page.text}
            onClick={page.onClick}
            key={key}
            aria-label={page.ariaLabel}
          >
            {page.text}
          </button>
        );
      })}
      {!pagination.next.hide && (
        <button
          className="ma__pagination__next js-pagination-next"
          type="button"
          disabled={pagination.next.disabled}
          onClick={pagination.next.onClick}
          aria-label={pagination.next.ariaLabel}
        >
          {pagination.next.text}
        </button>
      )}
    </div>
  </div>
);

Pagination.propTypes = {
  /** next.disabled: Defines whether the next button is available or not to users.
      next.text: Defines the text shown for the next button. */
  next: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    onClick: PropTypes.func,
    ariaLabel: PropTypes.string
  }),
  /** prev.disabled: Defines whether the prev button is available or not to users.
      prev.text: Defines the text shown for the previous button. */
  prev: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    ariaLabel: PropTypes.string
  }),
  /** Pages is an array that defines what page numbers users are able to paginate through.
      pages.active: Defines whether the page number is active or not.
      pages.text: Defines the text shown for page number. */
  pages: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    text: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    onClick: PropTypes.func,
    ariaLabel: PropTypes.string
  }))
};

export default Pagination;
