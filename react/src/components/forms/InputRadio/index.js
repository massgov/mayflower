/**
 * InputRadio module.
 * @module @massds/mayflower-react/InputRadio
 * @requires module:@massds/mayflower-assets/scss/01-atoms/input-radio
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputGroup from 'MayflowerReactForms/InputGroup';
import Label from 'MayflowerReactForms/Label';

const InputRadio = React.forwardRef((props, ref) => {
  const inputRef = React.useRef(ref);
  const radioClasses = classNames({
    'ma__input-radio': !props.outline,
    'ma__input-radio--outline': props.outline
  });
  const inputClasses = classNames({
    'has-error': props.showError,
    'ma__input-radio__control': !props.outline,
    'ma__input-radio--outline__control': props.outline,
    'ma__input-radio--outline__control--error': props.showError
  });
  const labelClasses = classNames({
    'ma__input-radio__label': !props.outline,
    'ma__input-radio__label--error': props.showError && !props.outline,
    'ma__input-radio--outline__label': props.outline,
    'ma__input-radio--outline__label--error': props.showError && props.outline
  });
  return(
    <InputGroup {...props}>
      <div className={radioClasses}>
        <input
          ref={inputRef}
          defaultChecked={props.defaultChecked}
          name={props.name}
          type="radio"
          defaultValue={props.value}
          id={props.id || props.value}
          required={props.required}
          onChange={props.onChange}
          disabled={props.disabled}
          className={inputClasses}
        />
        <Label inputId={props.id || props.value} className={labelClasses}>
          {props.label}
        </Label>
      </div>
    </InputGroup>
  );
});

InputRadio.propTypes = {
  /** The name of the input radio. */
  name: PropTypes.string.isRequired,
  /** The id of the input radio. Defaults to the value if not provided. */
  id: PropTypes.string,
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
  showError: PropTypes.bool
};

InputRadio.defaultProps = {
  outline: false,
  required: false,
  onChange: () => {},
  disabled: false,
  showError: false
};

export default InputRadio;
