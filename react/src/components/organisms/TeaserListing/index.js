import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.css';

/**
  List wrapper
  */

class TeaserListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
   handleClick = (e) => {
     e.preventDefault();
     this.setState((currentState) => ({
       open: !currentState.open
     }));
   };

   render() {
     const { children } = this.props;

     return(
       <section className="ma__teaser-listing">
         <div className="ma__teaser-listing__container">
           {children}

         </div>
       </section>
     );
   }
}


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

const TeaserListingItems = ({ gridTwoColumns, children }) => {
  const columnCount = (gridTwoColumns) ? 2 : 3;
  const itemsClasses = classNames({
    'ma__teaser-listing__items': true,
    [`ma__teaser-listing__${columnCount}-col-grid`]: columnCount
  });
  return(
    <ul className={itemsClasses}>
      {children}
    </ul>
  );
};

TeaserListingItems.propTypes = {
  /** Set for an alternative two column layout for large screens. (Both display the same at smaller screen widths) */
  gridTwoColumns: PropTypes.bool,
  /** React children to render */
  children: PropTypes.node.isRequired
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
