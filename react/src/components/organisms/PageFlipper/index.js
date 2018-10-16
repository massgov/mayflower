import React from 'react';
import PropTypes from 'prop-types';
import componentPropTypeCheck from '../../utilities/componentPropTypeCheck';
import './style.css';

const PageFlipper = (props) => {
  const introLabel = (props.intro.label) ? (<span className="ma__page-flipper__context-label">{props.intro.label}</span>) : '';
  const introDecorativeLink = (props.intro.introDecorativeLink.props.text) ? props.intro.introDecorativeLink : '';
  const introLink = (introLabel || introDecorativeLink) ? (
    <div className="ma__page-flipper__context">
      {introLabel}
      {introDecorativeLink}
    </div>
  ) : '';
  const blank = (<div className="ma__page-flipper__blank">&nbsp;</div>);
  const prev = props.previousLink || blank;
  const next = props.nextLink || blank;
  return(
    <React.Fragment>
      {introLink}
      <div className="ma__page-flipper">
        <div className="ma__page-flipper__container">
          {prev}
          {next}
        </div>
      </div>
    </React.Fragment>
  );
};

PageFlipper.propTypes = {
  /** Introduction section containing a label and / or a link. */
  intro: PropTypes.shape({
    /** Optional label */
    label: PropTypes.string,
    /** Optional DecorativeLink */
    introDecorativeLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'DecorativeLink')
  }),
  /** Previous Link (or left button) */
  previousLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'ArrowNav'),
  /** Nexxt Link (or right button) */
  nextLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'ArrowNav')
};

export default PageFlipper;
