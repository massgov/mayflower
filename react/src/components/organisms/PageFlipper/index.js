import React from 'react';
import PropTypes from 'prop-types';
import componentPropTypeCheck from '../../utilities/componentPropTypeCheck';
import './style.css';

const PageFlipper = (props) => {
  const contextLabel = (props.context.label) ? (<span className="ma__page-flipper__context-label">{props.context.label}</span>) : '';
  const contextDecorativeLink = (props.context.contextDecorativeLink.props.text) ? props.context.contextDecorativeLink : '';
  const contextLink = (contextLabel || contextDecorativeLink) ? (
    <div className="ma__page-flipper__context">
      {contextLabel}
      {contextDecorativeLink}
    </div>
  ) : '';
  const blank = (<div className="ma__page-flipper__blank">&nbsp;</div>);
  const prev = props.previousLink ? props.previousLink : blank;
  const next = props.nextLink ? props.nextLink : blank;
  return (
    <React.Fragment>
      {contextLink}
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
  context: PropTypes.shape({
    label: PropTypes.string,
    contextDecorativeLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'DecorativeLink')
  }),
  previousLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'ArrowNav'),
  nextLink: (props, propName, componentName) => componentPropTypeCheck(props, propName, componentName, 'ArrowNav')
}

export default PageFlipper;
