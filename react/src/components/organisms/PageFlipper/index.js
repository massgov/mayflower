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
  const prev = props.previousLink ? props.previousLink : blank;
  const next = props.nextLink ? props.nextLink : blank;
  return (
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
}

PageFlipper.propTypes = {
  intro: PropTypes.shape({
    label: PropTypes.string,
    introDecorativeLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'DecorativeLink')
  }),
  previousLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'ArrowNav'),
  nextLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'ArrowNav')
}

export default PageFlipper;
