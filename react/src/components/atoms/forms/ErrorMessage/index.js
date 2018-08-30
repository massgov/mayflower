import React from 'react';
import PropTypes from 'prop-types';
import SvgInputError from '../../icons/SvgInputError';
import SvgInputSuccess from '../../icons/SvgInputSuccess';
import './style.css';

const ErrorMessage = ({
  inputId, error, success, status
}) => {
  const isSuccessful = status === 'success';
  return(
    <div
      htmlFor={inputId}
      aria-labelledby={inputId}
      className={`ma__error-msg has-error ${isSuccessful ? 'ma__error-msg--success' : ''}`}
      role={isSuccessful ? 'presentation' : 'alert'}
    >
      {isSuccessful ? <SvgInputSuccess /> : <SvgInputError />}&nbsp;
      {isSuccessful ? success : error }
    </div>
  );
};

ErrorMessage.propTypes = {
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The error message for the corresponding input field */
  error: PropTypes.string.isRequired,
  /** The sucess message for the corresponding input field */
  success: PropTypes.string,
  /** Validation status */
  status: PropTypes.oneOf(['error', 'success'])
};

ErrorMessage.defaultProps = {
  status: 'error',
  success: 'Success!'
};

export default ErrorMessage;
