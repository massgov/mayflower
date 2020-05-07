import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Collapse from '../../animations/Collapse';
import Paragraph from '../../atoms/text/Paragraph';
import Link from '../../molecules/Link';

import './style.css';

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

     // const shownNumber = shownItems || null;
     // const shownItems = shownNumber ? items.slice(0, shownNumber) : null;
     // const invisibleItems = (shownNumber) ? items.slice(shownNumber) : [];
     // const teaserHeading = 2;

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
  /** Descriptive paragraph */
  description: PropTypes.shape({
    text: PropTypes.string
  }),
  /** Number of items to show. If set, Collapse is used to make an accordion. */
  shownItems: PropTypes.number,
  /** Accordion Label */
  moreLabel: PropTypes.string,
  /** Items Label */
  lessLabel: PropTypes.string,
  /** Array of Featured GeneralTeaser Components. */
  /** Array of GeneralTeaser Componets */
  /** Optional Link for more. */
  more: PropTypes.shape(Link.propTypes)
};

TeaserListing.defaultProps = {
  contained: true,
  gridTwoColumns: true,
  moreLabel: 'More',
  lessLabel: 'Less',
  items: []
};

TeaserListing.displayName = 'TeaserListing';
export default TeaserListing;


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

const TeaserListingItems = ({ contained, gridTwoColumns, children }) => {
  const columnCount = (contained && gridTwoColumns) ? 2 : 3;
  const itemsClasses = classNames({
    'ma__teaser-listing__items': true,
    'ma__teaser-listing__2-col-grid': columnCount === 2,
    'ma__teaser-listing__3-col-grid': columnCount === 3
  });
  return(
    <ul className={itemsClasses}>
      {children}
    </ul>
  );
};

TeaserListingItems.propTypes = {
  /** Grid display of secondary items or three column grid. */
  contained: PropTypes.bool,
  /** Set for an alternative two column layout for large screens. (Both display the same at smaller screen widths) */
  gridTwoColumns: PropTypes.bool,
  /** React children to render */
  children: PropTypes.node.isRequired
};

TeaserListing.Items = TeaserListingItems;
TeaserListing.Items.displayName = 'TeaserListing.Items';
