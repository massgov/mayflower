import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const ArrowNav = (props) => {
  const sectionClasses = [
    'ma__arrow-nav',
    'ma__arrow-nav--' + props.ArrowButton.props.direction
  ];
  return (
    <section className={sectionClasses.join(' ')}>
      {props.ArrowButton}
      <h2 className="ma__arrow-nav__title" data-label={ props.label }>
        <span>{props.title}</span>
      </h2>
      <div className="ma__arrow-nav__link">
        {props.Link}
      </div>
    </section>
  )
}

ArrowNav.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  ArrowButton: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'ArrowButton';
      }
      return comp.type.name && comp.type.name === 'ArrowButton';
    };
    if (!component || (component && !isValid(component))) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
        component.type.name
      }. Validation failed.`);
    }
  },
  Link: (props, propName, componentName) => {
    const component = props[propName];
    const isValid = (comp) => {
      if (typeof comp.type === 'string') {
        return comp.type === 'Link';
      }
      return comp.type.name && comp.type.name === 'Link';
    };
    if (!component || (component && !isValid(component))) {
      return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${
        component.type.name
      }. Validation failed.`);
    }
  }
}

export default ArrowNav;
