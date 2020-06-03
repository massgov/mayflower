import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

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
  message: PropTypes.node.isRequired
};

export default HelperText;
