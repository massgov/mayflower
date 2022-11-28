// @ts-nocheck
/**
 * ErrorMessage module.
 * @module @massds/mayflower-react/ErrorMessage
 * @requires module:@massds/mayflower-assets/scss/01-atoms/error-msg
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-icons
 * @requires module:@massds/mayflower-assets/scss/01-atoms/svg-loc-icons
 */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import IconInputsuccess from 'MayflowerReactBase/Icon/IconInputsuccess';
// eslint-disable-next-line import/no-unresolved
import IconInputerror from 'MayflowerReactBase/Icon/IconInputerror';

export interface ErrorMessageProps {
  /** The ID of the corresponding input field */
  inputId: string
  /** The error message for the corresponding input field */
  error: string
  /** The sucess message for the corresponding input field */
  success?: string
  /** Validation status */
  status?: "error" | "success"
}

const ErrorMessage = ({
  inputId,
  error,
  success,
  status
}: ErrorMessageProps) => {
  const isSuccessful = status === 'success';
  return(
    <div
      htmlFor={inputId}
      aria-labelledby={inputId}
      className={`ma__error-msg has-error ${isSuccessful ? 'ma__error-msg--success' : ''}`}
      role={isSuccessful ? 'presentation' : 'alert'}
    >
      {isSuccessful ? <IconInputsuccess width={16} height={18} /> : <IconInputerror width={16} height={18} />}
      <span>{isSuccessful ? success : error }</span>
    </div>
  );
};

ErrorMessage.defaultProps = {
  status: 'error',
  success: 'Success!'
};

export default ErrorMessage;
