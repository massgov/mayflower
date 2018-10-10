import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PageFlipper = (props) => {
  const contextLink = props.context ? (
    <div className="ma__page-flipper__context">
      <span className="ma__page-flipper__context-label">{props.context.label}</span>
      {props.context.DecorativeLink}
    </div>
  ) : '';
  const blank = (<div className="ma__page-flipper__blank">&nbsp;</div>);
  const prev = props.PreviousLink ? props.PreviousLink : blank;
  const next = props.NextLink ? props.NextLink : blank;
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
    DecorativeLink: (props, propName, componentName) => {
      const component = props[propName];
      const isValid = (comp) => {
        if (typeof comp.type === 'string') {
          return comp.type === 'DecorativeLink';
        }
        return comp.type.name && comp.type.name === 'DecorativeLink';
      };
      if (!component || (component && !isValid(component))) {
        return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
          component.type.name
        }. Validation failed.`);
      }
    },
  }),
  PreviousLink: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'ArrowNav';
      }
      return comp.type.name && comp.type.name === 'ArrowNav';
    };
    if (!component || (component && !isValid(component))) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
        component.type.name
      }. Validation failed.`);
    }
  },
  NextLink: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'ArrowNav';
      }
      return comp.type.name && comp.type.name === 'ArrowNav';
    };
    if (!component || (component && !isValid(component))) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
        component.type.name
      }. Validation failed.`);
    }
  }
}

export default PageFlipper;
