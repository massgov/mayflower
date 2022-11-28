// @ts-nocheck
/**
 * TeaserListing module.
 * @module @massds/mayflower-react/TeaserListing
 * @requires module:@massds/mayflower-assets/scss/03-organisms/teaser-listing
 */
import React from 'react';
import classNames from 'classnames';

export interface TeaserListingProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  List wrapper
  */

const TeaserListing = ({
  children
}: TeaserListingProps) => (
  <section className="ma__teaser-listing">
    <div className="ma__teaser-listing__container">
      {children}
    </div>
  </section>
);

TeaserListing.displayName = 'TeaserListing';
export default TeaserListing;

export interface TeaserListingFeaturesProps {
  /** Stacked if true, side-by-side if false. */
  stacked?: boolean
  /** React children to render */
  children: React.ReactNode
}

/**
  Feature Items wrapper
  */

const TeaserListingFeatures = ({
  children,
  stacked
}: TeaserListingFeaturesProps) => {
  const featuredClasses = classNames('ma__teaser-listing__featured-items', {
    stacked,
    'side-by-side': !stacked
  });
  return(
    <div className={featuredClasses}>
      {children}
    </div>
  );
};

TeaserListingFeatures.defaultProps = {
  stacked: false
};

TeaserListing.Features = TeaserListingFeatures;
TeaserListing.Features.displayName = 'TeaserListing.Features';

export interface TeaserListingItemsProps {
  /** Set for two column or three column layout for large screens. (Both display the same at smaller screen widths) */
  columns?: 2 | 3
  /** React children to render */
  children: React.ReactNode
}

/**
  List Items wrapper
  */

const TeaserListingItems = ({
  columns,
  children
}: TeaserListingItemsProps) => {
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

TeaserListingItems.defaultProps = {
  columns: 2
};

TeaserListing.Items = TeaserListingItems;
TeaserListing.Items.displayName = 'TeaserListing.Items';

export interface TeaserListingItemProps {
  /** React children to render */
  children: React.ReactNode
}

/**
  List Item
  */

const TeaserListingItem = ({
  children
}: TeaserListingItemProps) => (
  <li className="ma__teaser-listing__item">
    {children}
  </li>
);

TeaserListing.Item = TeaserListingItem;
TeaserListing.Item.displayName = 'TeaserListing.Item';
