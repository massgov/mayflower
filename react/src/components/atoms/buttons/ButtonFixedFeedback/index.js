/**
 * ButtonFixedFeedback module.
 * @module @massds/mayflower-react/ButtonFixedFeedback
 * @requires module:@massds/mayflower-assets/scss/01-atoms/fixed-feedback-button
 */
import React from 'react';
import PropTypes from 'prop-types';

const ButtonFixedFeedback = (props) => (
  <div
    className="ma__fixed-feedback-button"
  >
    <a href={props.href}>{props.text}</a>
  </div>
);

ButtonFixedFeedback.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string
};

ButtonFixedFeedback.defaultProps = {
  href: '#',
  text: 'Feedback'
};

export default ButtonFixedFeedback;
