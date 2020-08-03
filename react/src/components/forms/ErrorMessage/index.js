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
import IconInputerror from 'MayflowerReactBase/Icon/IconInputerror';

const ErrorMessage = ({ inputId, error }) => (
  <div
    htmlFor={inputId}
    aria-labelledby={inputId}
    className="ma__error-msg has-error"
    role="alert"
  >
    {error && <IconInputerror width={16} height={18} />}
    {error}
  </div>
);

ErrorMessage.propTypes = {
  /** The ID of the corresponding input field */
  inputId: PropTypes.string.isRequired,
  /** The error message for the corresponding input field */
  error: PropTypes.string.isRequired,
};

export default ErrorMessage;
