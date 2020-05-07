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
     const {
       heading, description, stacked, contained, gridTwoColumns, featuredItems, showItems, items, lessLabel, moreLabel, more
     } = this.props;
     const featuredClasses = classNames({
       'ma__teaser-listing__featured-items': true,
       stacked: stacked,
       'side-by-side': !stacked
     });
     const columnCount = (contained && gridTwoColumns) ? 2 : 3;
     const itemsClasses = classNames({
       'ma__teaser-listing__items': true,
       'ma__teaser-listing__2-col-grid': columnCount === 2,
       'ma__teaser-listing__3-col-grid': columnCount === 3
     });
     const shownNumber = shownItems || null;
     const shownItems = shownNumber ? items.slice(0, shownNumber) : null;
     const invisibleItems = (shownNumber) ? items.slice(shownNumber) : [];
     const teaserHeading = 2;

     return(
       <section className="ma__teaser-listing">
         <div className="ma__teaser-listing__container">
           {heading && heading()}
           {(description) && (
             <div className="ma__teaser-listing__description">
               <Paragraph {...description} />
             </div>
           )}
           {(featuredItems) && (
             <div className={featuredClasses}>
               FeatureTeaser
             </div>
           )}
           {(invisibleItems.length > 0) && (
             <React.Fragment>
               <ul className={itemsClasses}>
                 {shownItems.map((item, index) => {
                   const key = `teaser-listing--item-${index}`;
                   return(
                     <li className="ma__teaser-listing__item" key={key}>
                       Teaser
                     </li>
                   );
                 })}
               </ul>
               <Collapse in={this.state.open} dimension="height">
                 <div className="ma__teaser-listing__extra">
                   <ul className={itemsClasses}>
                     {invisibleItems.map((item, index) => {
                       const key = `hidden-teaser-listing--item-${index}`;
                       return(
                         <li className="ma__teaser-listing__item" key={key}>
                           Teaser
                         </li>
                       );
                     })}
                   </ul>
                 </div>
               </Collapse>
               <button
                 className="ma__content-link ma__content-link--chevron ma__content-link__acordion-toggle js-accordion-link"
                 aria-label={(this.state.open) ? lessLabel : moreLabel}
                 onClick={this.handleClick}
               >
                 {(this.state.open)
                   ? (<span className="less">{lessLabel}</span>)
                   : (<span className="more">{moreLabel}</span>)
                 }
               </button>
             </React.Fragment>
           )}
           {(invisibleItems.length === 0) && (
             <ul className={itemsClasses}>
               {items.map((item, index) => {
                 const key = `teaser-listing--item-${index}`;
                 return(
                   <li key={key} className="ma__teaser-listing__item">
                     Teaser
                   </li>
                 );
               })}
             </ul>
           )}
           {(more) && (
             <div className="ma__teaser-listing__more">
               <Link {...more} />
             </div>
           )}
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
  /** Grid display of secondary items or three column grid. */
  contained: PropTypes.bool,
  /** Set for an alternative two column layout for large screens. (Both display the same at smaller screen widths) */
  gridTwoColumns: PropTypes.bool,
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
  stacked: false,
  contained: true,
  gridTwoColumns: true,
  moreLabel: 'More',
  lessLabel: 'Less',
  items: []
};

export default TeaserListing;


const TeaserListingFeatures = (props) => {
  const { children, stacked } = props;
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
