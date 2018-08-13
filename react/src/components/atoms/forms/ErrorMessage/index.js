import React from 'react';
import PropTypes from 'prop-types';
import SvgInputError from '../../icons/SvgInputError';
import SvgInputSuccess from '../../icons/SvgInputSuccess';

const ErrorMessage = (props) => {
  return(
    <div
      htmlFor={props.inputId}
      aria-labelledby={props.inputId}
      className="ma__error-msg has-error"
    >
      <SvgInputError /> &nbsp;
      {props.message}
    </div>
  )
};

ErrorMessage.propTypes = {
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The help text for the corresponding input field */
  message: PropTypes.string.isRequired
};

export default ErrorMessage;
