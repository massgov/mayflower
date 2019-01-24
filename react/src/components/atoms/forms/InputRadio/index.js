import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.css';

const InputRadio = (props) => {
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
    'ma__input-radio--outline__label': props.outline,
    'ma__input-radio--outline__label--error': props.error
  });
  return(
    <div className={radioClasses}>
      <input
        checked={props.checked}
        name={props.name}
        type="radio"
        value={props.value}
        id={props.id}
        required={props.required}
        onChange={(e) => {
          const selected = e.target.value;
          props.onChange(selected, props.value, e)
        }}
        disabled={props.disabled}
        className={inputClasses}
      />
      <label htmlFor={props.id} className={labelClasses}>
        <span>{props.label}</span>
      </label>
    </div>
  );
}

InputRadio.propTypes = {
  /** The name of the input radio. */
  name: PropTypes.string.isRequired,
  /** The id of the input radio. */
  id: PropTypes.string.isRequired,
  /** The value of the input radio */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /** The input radio label */
  label: PropTypes.string.isRequired,
  /** Whether the input radio is checked or not  */
  checked: PropTypes.bool,
  /** Whether radio input is required or not */
  required: PropTypes.bool,
  /** Whether you want the radio input outlined */
  outline: PropTypes.bool,
  /** OnChange function */
  onChange: PropTypes.func,
  /** Whether the radio button is disabled or not */
  disabled: PropTypes.bool,
  /** Whether the input is in an error state */
  error: PropTypes.bool
};

InputRadio.defaultProps = {
  outline: false,
  required: false,
  onChange: () => {},
  disabled: false,
  error: false
};

export default InputRadio;
