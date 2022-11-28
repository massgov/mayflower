// @ts-nocheck
/**
 * ButtonFixedFeedback module.
 * @module @massds/mayflower-react/ButtonFixedFeedback
 * @requires module:@massds/mayflower-assets/scss/01-atoms/fixed-feedback-button
 */
import React from 'react';

export interface ButtonFixedFeedbackProps {
  href?: string
  text?: string
}

const ButtonFixedFeedback = (props: ButtonFixedFeedbackProps) => (
  <div
    className="ma__fixed-feedback-button"
  >
    <a href={props.href}>{props.text}</a>
  </div>
);

ButtonFixedFeedback.defaultProps = {
  href: '#',
  text: 'Feedback'
};

export default ButtonFixedFeedback;
