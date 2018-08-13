import React from 'react';
import PropTypes from 'prop-types';
import SvgInputError from '../../icons/SvgInputError';
import SvgInputSuccess from '../../icons/SvgInputSuccess';

const ErrorMessage = ({inputId, message, status}) => {
  return(
    <div
      htmlFor={inputId}
      aria-labelledby={inputId}
      className="ma__error-msg has-error"
    >
      {status === 'success' ? <SvgInputSuccess /> : <SvgInputError />
      }&nbsp;
      {message}
    </div>
  )
};

ErrorMessage.propTypes = {
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The help text for the corresponding input field */
  message: PropTypes.string.isRequired,
  /** Validation status */
  status: PropTypes.oneOf(['error, success'])
};

ErrorMessage.defaultProps = {
  status: 'error'
};

export default ErrorMessage;
