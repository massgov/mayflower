import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

/**
  List wrapper
  */

const TeaserListing = ({ children }) => (
  <section className="ma__teaser-listing">
    <div className="ma__teaser-listing__container">
      {children}
    </div>
  </section>
);


TeaserListing.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

TeaserListing.displayName = 'TeaserListing';
export default TeaserListing;

/**
  Feature Items wrapper
  */

const TeaserListingFeatures = ({ children, stacked }) => {
  const featuredClasses = classNames({
    'ma__teaser-listing__featured-items': true,
    stacked,
    'side-by-side': !stacked
  });
  return(
    <div className={featuredClasses}>
      {children}
    </div>
  );
};

TeaserListingFeatures.propTypes = {
  /** Stacked if true, side-by-side if false. */
  stacked: PropTypes.bool,
  /** React children to render */
  children: PropTypes.node.isRequired
};

TeaserListingFeatures.defaultProps = {
  stacked: false
};

TeaserListing.Features = TeaserListingFeatures;
TeaserListing.Features.displayName = 'TeaserListing.Features';

/**
  List Items wrapper
  */

const TeaserListingItems = ({ columns, children }) => {
  const itemsClasses = classNames({
    'ma__teaser-listing__items': true,
    [`ma__teaser-listing__${columns}-col-grid`]: columns
  });
  return(
    <ul className={itemsClasses}>
      {children}
    </ul>
  );
};

TeaserListingItems.propTypes = {
  /** Set for two column or three column layout for large screens. (Both display the same at smaller screen widths) */
  columns: PropTypes.oneOf([2, 3]),
  /** React children to render */
  children: PropTypes.node.isRequired
};

TeaserListingItems.defaultProps = {
  columns: 2
};

TeaserListing.Items = TeaserListingItems;
TeaserListing.Items.displayName = 'TeaserListing.Items';

/**
  List Item
  */

const TeaserListingItem = ({ children }) => (
  <li className="ma__teaser-listing__item">
    {children}
  </li>
);

TeaserListingItem.propTypes = {
  /** React children to render */
  children: PropTypes.node.isRequired
};

TeaserListing.Item = TeaserListingItem;
TeaserListing.Item.displayName = 'TeaserListing.Item';
