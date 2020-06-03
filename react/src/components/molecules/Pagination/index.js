/**
 * Pagination module.
 * @module @massds/mayflower-react/Pagination
 * @requires module:@massds/mayflower-assets/scss/02-molecules/pagination
 */
import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';

const Pagination = (props) => {
  const { prev, next, pages } = props;

  const handleClick = (event, handleAnchorClick) => {
    event.preventDefault();
    if (is.fn(handleClick)) {
      handleAnchorClick(event);
    }
  };

  const handleKeyDown = (event, handleAnchorClick) => {
    if (event.key === ' ' && is.fn(handleClick)) {
      event.preventDefault();
      handleAnchorClick(event);
    }
  };

  return(
    <div className="ma__pagination js-pagination" role="navigation" aria-label="Pagination Navigation">
      <nav className="ma__pagination__container">
        {!prev.hide && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className={`ma__pagination__prev ${prev.disabled && ' disabled'}`}
            role="button"
            href="#"
            onClick={(e) => handleClick(e, prev.onClick)}
            onKeyDown={(e) => handleKeyDown(e, prev.onClick)}
            aria-label={`Go to ${prev.text} page`}
            aria-disabled={prev.disabled}
            tabIndex={prev.disabled ? -1 : 0}
          >
            {prev.text}
          </a>
        )}
        {pages.map((page, pageIndex) => {
          const key = `pagination.item.${pageIndex}`;
          return page.text === 'spacer' ? (
            <span key={key} className="ma__pagination__spacer">&hellip;</span>
          ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className={page.active ? 'ma__pagination__page is-active' : 'ma__pagination__page'}
              role="button"
              href="#"
              data-page={page.text}
              onClick={(e) => handleClick(e, page.onClick)}
              onKeyDown={(e) => handleKeyDown(e, page.onClick)}
              key={key}
              aria-label={`Go to Page ${page.text}`}
              tabIndex={0}
            >
              {page.text}
            </a>
            );
        })}
        {!next.hide && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className={`ma__pagination__next ${next.disabled && ' disabled'}`}
            role="button"
            href="#"
            onClick={(e) => handleClick(e, next.onClick)}
            onKeyDown={(e) => handleKeyDown(e, next.onClick)}
            aria-label={`Go to ${next.text} page`}
            aria-disabled={next.disabled}
            tabIndex={next.disabled ? -1 : 0}
          >
            {next.text}
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
    hide: PropTypes.bool,
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
