// @ts-nocheck
/**
 * HelperText module.
 * @module @massds/mayflower-react/HelperText
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 */
import React from 'react';

export interface HelperTextProps {
  /** The ID of the corresponding input field */
  inputId: string
  /** The help text for the corresponding input field */
  message: React.ReactNode
}

const HelperText = (props: HelperTextProps) => (
  <label
    htmlFor={props.inputId}
    aria-labelledby={props.inputId}
    className="ma__helper-text"
  >
    {props.message}
  </label>
);

export default HelperText;
