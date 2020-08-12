/**
 * InputNumber module.
 * @module @massds/mayflower-react/InputNumber
 * @requires module:@massds/mayflower-assets/scss/01-atoms/_input--button
 * @requires module:@massds/mayflower-assets/scss/01-atoms/_input-number
 * @requires module:@massds/mayflower-assets/scss/01-atoms/helper-text
 * @requires ma__input--button('number');
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import numbro from 'numbro';
import InputGroup from 'MayflowerReactForms/InputGroup';
import { countDecimals } from 'MayflowerReactForms/Input/utility';

const InputNumber = React.forwardRef((props, ref) => {
  const {
    showButtons = true,
    unit = '',
    width,
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    id,
    maxlength = 3,
    min,
    max,
    step = 1,
    onBlur = null,
    onChange = null,
    required = false,
    disabled = false
  } = inputProps;
  const {
    showError = false
  } = groupProps;
  const inputRef = React.createRef(ref);
  const upRef = React.createRef();
  const downRef = React.createRef();
  const inputClasses = classNames('ma__input', {
    'ma__input-number__control': true,
    'js-is-required': required,
    'ma__input-number__control--showButtons': showButtons
  });

  const unitClasses = classNames({
    'ma__input-number-unit': true,
    'ma__input-number-unit--disabled': disabled,
    'ma__input-number-unit--showButtons': showButtons
  });

  const wrapperClasses = classNames('ma__input-number', {
    'ma__input-number--error': showError
  });

  const handleOnBlur = (e) => {
    e.persist();
    const inputEl = inputRef.current;
    let newValue = Number(inputEl.value);
    if (is.number(max) && newValue > Number(max)) {
      newValue = max;
    }
    if (is.number(min) && newValue < Number(min)) {
      newValue = min;
    }
    if (is.number(newValue)) {
      // Since to Fixed returns a string, we have to cast it back to a Number
      newValue = Number(numbro(newValue).format({ mantissa: countDecimals(step) }));
      inputRef.current.value = newValue;
      if (is.fn(onBlur)) {
        onBlur(e, newValue);
      }
    }
  };

  const handleChange = (e) => {
    e.persist();
    const inputEl = inputRef.current;
    const newValue = Number(inputEl.value);
    if (is.number(newValue)) {
      inputRef.current.value = newValue;
      if (is.fn(onChange)) {
        onChange(e, newValue, id);
      }
    }
  };

  const handleAdjust = (e) => {
    e.persist();
    const direction = (e.currentTarget === upRef.current) ? 'up' : 'down';
    if (direction === 'up') {
      inputRef.current.stepUp();
    } else if (direction === 'down') {
      inputRef.current.stepDown();
    }
    if (is.fn(onChange)) {
      onChange(e, Number(inputRef.current.value), id);
    }
  };

  const inputAttr = {
    ...inputProps,
    ref: inputRef,
    className: inputClasses,
    type: 'number',
    maxLength: Number(maxlength),
    style: width ? { width: `${width}px` } : null,
    onChange: handleChange,
    onBlur: handleOnBlur,
    step
  };
  if (is.number(max)) {
    inputAttr.max = max;
  }
  if (is.number(min)) {
    inputAttr.min = min;
  }
  return(
    <InputGroup {...props}>
      <div className={wrapperClasses}>
        <input {...inputAttr} />
        {(unit) ? <span className={unitClasses}>{unit}</span> : null}
        {
          showButtons && (
            <div className="ma__input-number__control-buttons">
              <button
                type="button"
                aria-label="increase value"
                className="ma__input-number__control-plus"
                data-direction="up"
                onClick={handleAdjust}
                disabled={disabled}
                tabIndex={-1}
                ref={upRef}
              />
              <button
                type="button"
                aria-label="decrease value"
                className="ma__input-number__control-minus"
                data-direction="down"
                onClick={handleAdjust}
                disabled={disabled}
                tabIndex={-1}
                ref={downRef}
              />
            </div>
          )
        }
      </div>
    </InputGroup>
  );
});

InputNumber.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  required: PropTypes.bool,
  showButtons: PropTypes.bool,
  unit: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  maxlength: PropTypes.number,
  placeholder: PropTypes.string,
  width: PropTypes.number
};


// Needed with forwardRef.
InputNumber.displayName = 'InputNumber';
export default InputNumber;
