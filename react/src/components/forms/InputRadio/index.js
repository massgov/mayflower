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
  const {
    label = '',
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    id,
    className: inputClassName = null,
    value
  } = inputProps;
  const {
    outline = false,
    showError = false
  } = groupProps;
  const inputRef = React.useRef(ref);
  const radioClasses = classNames(inputClassName, {
    'ma__input-radio': !outline,
    'ma__input-radio--outline': outline
  });
  const inputClasses = classNames({
    'has-error': showError,
    'ma__input-radio__control': !outline,
    'ma__input-radio--outline__control': outline,
    'ma__input-radio--outline__control--error': showError
  });
  const labelClasses = classNames({
    'ma__input-radio__label': !outline,
    'ma__input-radio__label--error': showError && !outline,
    'ma__input-radio--outline__label': outline,
    'ma__input-radio--outline__label--error': showError && outline
  });
  const inputElementProps = {
    ...inputProps,
    ref: inputRef,
    id: id || value,
    type: 'radio',
    className: inputClasses
  };
  return(
    <InputGroup {...props}>
      <div className={radioClasses}>
        <input {...inputElementProps} />
        <Label inputId={id || value} className={labelClasses}>
          {label}
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
  defaultChecked: PropTypes.bool,
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

export default InputRadio;
