/**
 * PageFlipper module.
 * @module @massds/mayflower-react/PageFlipper
 * @requires module:@massds/mayflower-assets/scss/03-organisms/page-flipper
 */
import React from 'react';
import PropTypes from 'prop-types';
import airPropTypes from 'airbnb-prop-types';

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
  /** Introduction section containing a label and / or a link:<ul>
   * `label:` Optional label. <br />
   * `introDecorativeLink:` Optional DecorativeLink. <br />
   * </ul>
  */
  intro: PropTypes.shape({
    /** Optional label */
    label: PropTypes.string,
    /** Optional DecorativeLink */
    introDecorativeLink: airPropTypes.componentWithName('DecorativeLink')
  }),
  /** Previous Link (or left button) */
  previousLink: airPropTypes.componentWithName('ArrowNav'),
  /** Next Link (or right button) */
  nextLink: airPropTypes.componentWithName('ArrowNav')
};

export default PageFlipper;
