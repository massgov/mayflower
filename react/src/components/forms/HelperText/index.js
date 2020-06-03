/**
 * HelperText module.
 * @module @massds/mayflower-react/HelperText
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';
import PropTypes from 'prop-types';

const HelperText = (props) => (
  <label
    htmlFor={props.inputId}
    aria-labelledby={props.inputId}
    className="ma__helper-text"
  >
    {props.message}
  </label>
);

HelperText.propTypes = {
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The help text for the corresponding input field */
  message: PropTypes.string.isRequired
};

export default HelperText;
