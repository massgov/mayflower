/**
 * PageFlipper module.
 * @module @massds/mayflower-react/PageFlipper
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-flipper
 */
import React from 'react';
import PropTypes from 'prop-types';
import componentWithName from 'airbnb-prop-types/src/componentWithName';

const PageFlipper = (props) => {
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

PageFlipper.propTypes = {
  /** Introduction section containing a label and / or a link. */
  intro: PropTypes.shape({
    /** Optional label */
    label: PropTypes.string,
    /** Optional DecorativeLink */
    introDecorativeLink: componentWithName('DecorativeLink')
  }),
  /** Previous Link (or left button) */
  previousLink: componentWithName('ArrowNav'),
  /** Nexxt Link (or right button) */
  nextLink: componentWithName('ArrowNav')
};

export default PageFlipper;
