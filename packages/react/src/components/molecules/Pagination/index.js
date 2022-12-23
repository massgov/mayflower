/**
 * Pagination module.
 * @module @massds/mayflower-react/Pagination
 * @requires module:@massds/mayflower-assets/scss/02-molecules/pagination
 */
import React from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import classNames from 'classnames';

const Pagination = (props) => {
  const {
    prev,
    next,
    pages,
    backToTop,
    className
  } = props;
  const hasPrev = !!(prev && !prev.hide);
  const hasNext = !!(next && !next.hide);
  const hasPages = !!(pages && pages.length);

  const classes = classNames(
    'ma__pagination js-pagination',
    className
  );

  const handleClick = (event, handleAnchorClick) => {
    event.preventDefault();
    if (is.fn(handleAnchorClick)) {
      handleAnchorClick(event);
    }
  };

  const handleKeyDown = (event, handleAnchorClick) => {
    if (event.key === ' ' && is.fn(handleAnchorClick)) {
      event.preventDefault();
      handleAnchorClick(event);
    }
  };

  if (!hasPrev && !hasNext && !hasPages) {
    return null;
  }

  return(
    <div className={classes} role="navigation" aria-label="Pagination Navigation">
      <nav className="ma__pagination__container">
        {backToTop && backToTop.description
          && (<div className="ma__visually-hidden">{backToTop.description}</div>)}
        {hasPrev && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className={`ma__pagination__prev ${prev.disabled && ' disabled'}`}
            role="button"
            href={prev.href || '#'}
            onClick={(e) => handleClick(e, prev.onClick)}
            onKeyDown={(e) => handleKeyDown(e, prev.onClick)}
            aria-label={`Go to ${prev.text} page`}
            aria-disabled={prev.disabled}
            tabIndex={prev.disabled ? -1 : 0}
          >
            {prev.text}
          </a>
        )}
        {hasPages && pages.map((page, pageIndex) => {
          const key = `pagination.item.${pageIndex}`;
          return page.text === 'spacer' ? (
            <span key={key} className="ma__pagination__spacer">&hellip;</span>
          ) : (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              className={page.active ? 'ma__pagination__page is-active' : 'ma__pagination__page'}
              role="button"
              href={page.href || '#'}
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
        {hasNext && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a
            className={`ma__pagination__next ${next.disabled && ' disabled'}`}
            role="button"
            href={next.href || '#'}
            onClick={(e) => handleClick(e, next.onClick)}
            onKeyDown={(e) => handleKeyDown(e, next.onClick)}
            aria-label={`Go to ${next.text} page`}
            aria-disabled={next.disabled}
            tabIndex={next.disabled ? -1 : 0}
          >
            {next.text}
          </a>
        )}
        {backToTop && backToTop.text
          && (
            <a
              className="visually-hidden back-to-top-link"
              href={backToTop.fragment || '#'}
            >
              {backToTop.text}
            </a>
          )}
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  /** Custom class to add to the root element. */
  className: PropTypes.string,
  /** next.disabled: Defines whether the next button is available or not to users.
      next.text: Defines the text shown for the next button. */
  next: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    hide: PropTypes.bool,
    onClick: PropTypes.func
  }),
  /** prev.disabled: Defines whether the prev button is available or not to users.
      prev.text: Defines the text shown for the previous button. */
  prev: PropTypes.shape({
    disabled: PropTypes.bool,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    hide: PropTypes.bool,
    onClick: PropTypes.func
  }),
  /** prev.text: Defines the text shown for the previous button for screen readers.
   prev.description: Define the description shown before the first pagination link for screen readers
   prev.fragement: Defines id of the element to go back to */
  backToTop: PropTypes.shape({
    text: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fragment: PropTypes.string
  }),
  /** Pages is an array that defines what page numbers users are able to paginate through.
      pages.active: Defines whether the page number is active or not.
      pages.text: Defines the text shown for page number. */
  pages: PropTypes.arrayOf(PropTypes.shape({
    active: PropTypes.bool,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    hide: PropTypes.bool,
    onClick: PropTypes.func
  }))
};

export default Pagination;
