/**
 * ErrorMessage module.
 * @module @massds/mayflower-react/ErrorMessage
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'MayflowerReactBase/Icon';

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
      {isSuccessful ? <Icon name="inputsuccess" svgWidth={16} svgHeight={18} /> : <Icon name="inputerror" svgWidth={16} svgHeight={18} />}
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
