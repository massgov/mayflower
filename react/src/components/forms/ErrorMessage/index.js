/**
 * ErrorMessage module.
 * @module @massds/mayflower-react/ErrorMessage
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import IconInputsuccess from 'MayflowerReactBase/Icon/IconInputsuccess';
// eslint-disable-next-line import/no-unresolved
import IconInputerror from 'MayflowerReactBase/Icon/IconInputerror';

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
      {isSuccessful ? <IconInputsuccess width={16} height={18} /> : <IconInputerror width={16} height={18} />}
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
