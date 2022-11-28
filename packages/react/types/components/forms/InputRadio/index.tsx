// @ts-nocheck
/**
 * InputRadio module.
 * @module @massds/mayflower-react/InputRadio
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-radio
 */
import React from 'react';
import classNames from 'classnames';

export interface InputRadioProps {
  /** The name of the input radio. */
  name: string
  /** The id of the input radio. Defaults to the value if not provided. */
  id?: string
  /** The value of the input radio */
  value: string | number
  /** The input radio label */
  label: string
  /** Whether the input radio is checked or not  */
  checked?: boolean
  /** Whether radio input is required or not */
  required?: boolean
  /** Whether you want the radio input outlined */
  outline?: boolean
  /** OnChange function */
  onChange?(...args: unknown[]): unknown
  /** Whether the radio button is disabled or not */
  disabled?: boolean
  /** Whether the input is in an error state */
  error?: boolean
}

const InputRadio = (props: InputRadioProps) => {
  const radioClasses = classNames({
    'ma__input-radio': !props.outline,
    'ma__input-radio--outline': props.outline
  });
  const inputClasses = classNames({
    'ma__input-radio__control': !props.outline,
    'ma__input-radio--outline__control': props.outline,
    'ma__input-radio--outline__control--error': props.error
  });
  const labelClasses = classNames({
    'ma__input-radio__label': !props.outline,
    'ma__input-radio__label--error': props.error && !props.outline,
    'ma__input-radio--outline__label': props.outline,
    'ma__input-radio--outline__label--error': props.error && props.outline
  });
  return(
    <div className={radioClasses}>
      <input
        checked={props.checked}
        name={props.name}
        type="radio"
        value={props.value}
        id={props.id || props.value}
        required={props.required}
        onChange={props.onChange}
        disabled={props.disabled}
        className={inputClasses}
      />
      <label htmlFor={props.id || props.value} className={labelClasses}>
        <span>{props.label}</span>
      </label>
    </div>
  );
};

InputRadio.defaultProps = {
  outline: false,
  required: false,
  onChange: () => {},
  disabled: false,
  error: false
};

export default InputRadio;
