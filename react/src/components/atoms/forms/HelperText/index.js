import React from 'react';
import PropTypes from 'prop-types';

const HelperText = (props) => (
  <React.Fragment>
    <label
      htmlFor={props.inputId}
      aria-labelledby={props.inputId}
      className="ma__helper-text"
    >
      {props.message}
    </label>
  </React.Fragment>
);

HelperText.propTypes = {
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The help text for the corresponding input field */
  message: PropTypes.string.isRequired
};

export default HelperText;
