// @ts-nocheck
/**
 * PageFlipper module.
 * @module @massds/mayflower-react/PageFlipper
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-flipper
 */
import React from 'react';

export interface PageFlipperProps {
  /** Introduction section containing a label and / or a link:<ul>
   * `label:` Optional label. <br />
   * `introDecorativeLink:` Optional DecorativeLink. <br />
   * </ul>
  */
  intro?: {
    /** Optional label */
    label?: string
    /** Optional DecorativeLink */
    introDecorativeLink?: React.ReactElement
  }
  /** Previous Link (or left button) */
  previousLink?: React.ReactElement
  /** Next Link (or right button) */
  nextLink?: React.ReactElement
}

const PageFlipper = (props: PageFlipperProps) => {
  const blank = (<div className="ma__page-flipper__blank">&nbsp;</div>);
  const prev = props.previousLink || blank;
  const next = props.nextLink || blank;
  return(
    <>
      { props.intro && (
        <div className="ma__page-flipper__context">
          { props.intro.label && <span className="ma__page-flipper__context-label">{props.intro.label}</span> }
          { (props.intro.introDecorativeLink && props.intro.introDecorativeLink.props.text) && props.intro.introDecorativeLink }
        </div>
      )}
      <div className="ma__page-flipper">
        <div className="ma__page-flipper__container">
          {prev}
          {next}
        </div>
      </div>
    </>
  );
};

export default PageFlipper;
