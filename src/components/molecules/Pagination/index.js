import React from 'react';
import PropTypes from 'prop-types';


const Pagination = pagination => (
  <div className="ma__pagination js-pagination">
    <div className="ma__pagination__container">
      <button
        className="ma__pagination__prev js-pagination-prev"
        type="button"
        disabled={pagination.prev.disabled}
      >
        {pagination.prev.text}
      </button>
      { pagination.pages.map(page => (
            page.text === 'spacer' ?
              <span className="ma__pagination__spacer">&hellip;</span> :
              <button
                className={page.active ? 'ma__pagination__page js-pagination-page is-active' : 'ma__pagination__page js-pagination-page'}
                type="button"
                data-page={page.text}
              >
                {page.text}
              </button>
          ))}
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
  next: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired
  }),
  prev: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired
  }),
  pages: PropTypes.shape({
    active: PropTypes.bool,
    text: PropTypes.string.isRequired
  })
};

export default Pagination;
