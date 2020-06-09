/**
 * TeaserListing module.
 * @module @massds/mayflower-react/TeaserListing
 * @requires module:@massds/mayflower-assets/scss/03-organisms/teaser
 * @requires module:@massds/mayflower-assets/scss/03-organisms/teaser-listing
 * @requires module:@massds/mayflower-assets/scss/01-atoms/sidebar-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/comp-heading
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Collapse from 'MayflowerReactAnimations/Collapse';
import SidebarHeading from 'MayflowerReactHeadings/SidebarHeading';
import CompHeading from 'MayflowerReactHeadings/CompHeading';
import Paragraph from 'MayflowerReactText/Paragraph';
import Link from 'MayflowerReactMolecules/Link';
import GeneralTeaser from 'MayflowerReactOrganisms/GeneralTeaser';

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
     const teaser = this.props;
     const featuredClasses = classNames({
       'ma__teaser-listing__featured-items': true,
       stacked: teaser.stacked,
       'side-by-side': !teaser.stacked
     });
     const columnCount = (teaser.contained && teaser.gridTwoColumns) ? 2 : 3;
     const itemsClasses = classNames({
       'ma__teaser-listing__items': true,
       'ma__teaser-listing__2-col-grid': columnCount === 2,
       'ma__teaser-listing__3-col-grid': columnCount === 3
     });
     const shownNumber = teaser.shownItems || null;
     const shownItems = shownNumber ? teaser.items.slice(0, shownNumber) : null;
     const invisibleItems = (shownNumber) ? teaser.items.slice(shownNumber) : [];

     let teaserHeading = 2;
     teaserHeading = parseInt(((teaser.compHeading && teaser.compHeading.level) ? teaser.compHeading.level : teaserHeading), 10) + 1;
     teaserHeading = parseInt(((teaser.sidebarHeading && teaser.sidebarHeading.level) ? teaser.sidebarHeading.level : teaserHeading), 10) + 1;

     return(
       <section className="ma__teaser-listing">
         <div className="ma__teaser-listing__container">
           {(teaser.compHeading) && (<CompHeading {...teaser.compHeading} />)}
           {(teaser.sidebarHeading) && (<SidebarHeading {...teaser.sidebarHeading} />)}
           {(teaser.description) && (
             <div className="ma__teaser-listing__description">
               <Paragraph {...teaser.description} />
             </div>
           )}
           {(teaser.featuredItems) && (
             <div className={featuredClasses}>
               {teaser.featuredItems.map((item, index) => {
                 const key = `featured-listing--item-${index}`;
                 const teaserProps = {
                   key,
                   level: teaserHeading,
                   ...item
                 };
                 return<GeneralTeaser {...teaserProps} />;
               })}
             </div>
           )}
           {(invisibleItems.length > 0) && (
             <>
               <ul className={itemsClasses}>
                 {shownItems.map((item, index) => {
                   const key = `teaser-listing--item-${index}`;
                   return(
                     <li className="ma__teaser-listing__item" key={key}>
                       <GeneralTeaser level={teaserHeading} {...item} />
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
                           <GeneralTeaser level={teaserHeading} {...item} />
                         </li>
                       );
                     })}
                   </ul>
                 </div>
               </Collapse>
               <button
                 className="ma__content-link ma__content-link--chevron ma__content-link__acordion-toggle js-accordion-link"
                 aria-label={(this.state.open) ? teaser.lessLabel : teaser.moreLabel}
                 onClick={this.handleClick}
               >
                 {(this.state.open)
                   ? (<span className="less">{teaser.lessLabel}</span>)
                   : (<span className="more">{teaser.moreLabel}</span>)}
               </button>
             </>
           )}
           {(invisibleItems.length === 0) && (
             <ul className={itemsClasses}>
               {teaser.items.map((item, index) => {
                 const key = `teaser-listing--item-${index}`;
                 return(
                   <li key={key} className="ma__teaser-listing__item">
                     <GeneralTeaser {...item} />
                   </li>
                 );
               })}
             </ul>
           )}
           {(teaser.more) && (
             <div className="ma__teaser-listing__more">
               <Link {...teaser.more} />
             </div>
           )}
         </div>
       </section>
     );
   }
}

TeaserListing.propTypes = {
  /** Optional CompHeading component */
  compHeading: PropTypes.shape(CompHeading.propTypes),
  /** Optional SidebarHeading component */
  sidebarHeading: PropTypes.shape(SidebarHeading.propTypes),
  /** Descriptive paragraph */
  description: PropTypes.shape({
    text: PropTypes.string
  }),
  /** Stacked if true, side-by-side if false. */
  stacked: PropTypes.bool,
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
  featuredItems: PropTypes.arrayOf(PropTypes.shape(GeneralTeaser.propTypes)),
  /** Array of GeneralTeaser Componets */
  items: PropTypes.arrayOf(PropTypes.shape(GeneralTeaser.propTypes)),
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
