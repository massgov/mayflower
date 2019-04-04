import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const Pagination = (pagination) => {
  const handleKeyDown = (event, handleClick) => {
    if (event.key === ' ') {
      event.preventDefault();
      handleClick(event);
    }
  };
  return (
    <div className="ma__pagination js-pagination" role="navigation" aria-label="Pagination Navigation">
      <nav className="ma__pagination__container">
        {!pagination.prev.hide && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className={`ma__pagination__prev ${pagination.next.disabled && ' disabled'}`}
            role="button"
            onClick={pagination.prev.onClick}
            onKeyDown={(e) => handleKeyDown(e, pagination.prev.onClick)}
            aria-label={pagination.prev.ariaLabel}
            aria-disabled={pagination.prev.disabled}
            tabIndex={pagination.prev.disabled ? -1 : 0}
          >
            {pagination.prev.text}
          </a>
        )}
        {pagination.pages.map((page, pageIndex) => {
          const key = `pagination.item.${pageIndex}`;
          return page.text === 'spacer' ? (
            <span key={key} className="ma__pagination__spacer">&hellip;</span>
          ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                className={page.active ? 'ma__pagination__page is-active' : 'ma__pagination__page'}
                role="button"
                data-page={page.text}
                onClick={page.onClick}
                onKeyDown={(e) => handleKeyDown(e, page.onClick)}
                key={key}
                aria-label={`Go to Page ${page.text}`}
                tabIndex={0}
              >
                {page.text}
              </a>
            );
        })}
        {!pagination.next.hide && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className={`ma__pagination__next ${pagination.next.disabled && ' disabled'}`}
            role="button"
            href="#"
            onClick={pagination.next.onClick}
            onKeyDown={(e) => handleKeyDown(e, pagination.next.onClick)}
            aria-label={`Go to ${pagination.next.text} page`}
            aria-disabled={pagination.next.disabled}
            tabIndex={pagination.prev.disabled ? -1 : 0}
          >
            {pagination.next.text}
          </a>
        )}
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  /** next.disabled: Defines whether the next button is available or not to users.
      next.text: Defines the text shown for the next button. */
  next: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    onClick: PropTypes.func
  }),
  /** prev.disabled: Defines whether the prev button is available or not to users.
      prev.text: Defines the text shown for the previous button. */
  prev: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func
  }),
  /** Pages is an array that defines what page numbers users are able to paginate through.
      pages.active: Defines whether the page number is active or not.
      pages.text: Defines the text shown for page number. */
  pages: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    text: PropTypes.string.isRequired,
    hide: PropTypes.bool,
    onClick: PropTypes.func
  }))
};

export default Pagination;
