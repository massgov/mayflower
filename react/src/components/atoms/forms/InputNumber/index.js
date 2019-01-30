import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input';
import { InputContext } from '../Input/context';
import { validNumber } from '../Input/validate';
import { singleCharacterPropTypeCheck } from '../../../utilities/componentPropTypeCheck';
import './style.css';

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}

const NumberInput = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const inputClasses = classNames({
            'ma__input-currency__control': true,
            'js-is-required': props.required
          });

          const decimalPlaces = props.step.countDecimals();

          const displayErrorMessage = (val, min, max, isRequired) => {
            if (isRequired && String(val).length === 0) {
              const errorMsg = 'Please enter a value.';
              return{
                showError: true,
                errorMsg
              };
            } else if (String(val).length > 0) {
              const { showError, errorMsg } = validNumber(val, min, max);
              return{
                showError, errorMsg
              };
            }
            return{
              showError: false,
              errorMsg: ''
            };
          };

          const handleChange = (e) => {
            const { value } = e.target;
            const floatValue = Number.parseFloat(value).toFixed(decimalPlaces);
            const updateError = displayErrorMessage(value, props.min, props.max, props.required);
            context.updateState({ value: floatValue, ...updateError });

            if (typeof props.onChange === 'function') {
              props.onChange(e);
            }
          };

          const handleAdjust = (e, direction) => {
            let newValue;
            if (direction === 'up') {
              newValue = Number.parseFloat(Number(context.value) + props.step).toFixed(decimalPlaces);
            } else if (direction === 'down') {
              newValue = Number.parseFloat(Number(context.value) - props.step).toFixed(decimalPlaces);
            }
            const updateError = displayErrorMessage(newValue, props.min, props.max, props.required);
            context.updateState({ value: newValue, ...updateError });
            if (typeof props.onChange === 'function') {
              props.onChange(e);
            }
          };

          const inputAttr = {
            className: inputClasses,
            name: props.name,
            id: props.id,
            type: 'number',
            placeholder: props.placeholder,
            maxLength: Number(props.maxlength),
            style: props.width ? { width: `${props.width}px` } : null,
            onChange: handleChange,
            required: props.required,
            value: context.value,
            disabled: props.disabled,
            step: props.step
          };
          return(
            <div className="ma__input-number">
              <input {...inputAttr} />
              {
                <span className="ma__input-number-unit">{props.unit}</span>
              }
              <button
                type="button"
                aria-label="increase value"
                className="ma__input-number__control-plus"
                onClick={(e) => handleAdjust(e, 'up')}
                disabled={props.disabled}
                tabIndex={-1}
              />
              <button
                type="button"
                aria-label="decrease value"
                className="ma__input-number__control-minus"
                onClick={(e) => handleAdjust(e, 'down')}
                disabled={props.disabled}
                tabIndex={-1}
              />
            </div>
          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputNumber = (props) => {
  const {
    max, min, step, name, onChange, placeholder, width, maxlength, ...inputProps
  } = props;
  // Input and Number share the props.required, props.id and props.disabled values.
  const numberProps = {
    max,
    min,
    step,
    name,
    placeholder,
    width,
    maxlength,
    required: props.required,
    id: props.id,
    onChange,
    disabled: props.disabled,
    unit: props.unit
  };
  return<Input {...inputProps}><NumberInput {...numberProps} /></Input>;
};

InputNumber.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  /** The label text for the input field */
  labelText: PropTypes.string.isRequired,
  /** Whether the field is required or not */
  required: PropTypes.bool,
  /** Whether the field is disabled or not */
  disabled: PropTypes.bool,
  /** The unique ID for the input field */
  id: PropTypes.string.isRequired,
  /** The name for the input field */
  name: PropTypes.string.isRequired,
  /** The max acceptable input length */
  maxlength: PropTypes.number,
  /** The pattern to filter input against, e.g. "[0-9]" for numbers only */
  pattern: PropTypes.string,
  /** The number of characters wide to make the input field */
  width: PropTypes.number,
  /** The placeholder text for the input field */
  placeholder: PropTypes.string,
  /** The message to be displayed in the event of an error. */
  errorMsg: PropTypes.string,
  /** Custom change function */
  onChange: PropTypes.func,
  /** Default input value */
  defaultValue: PropTypes.number,
  /** Max value for the field. */
  max: PropTypes.number,
  /** Min value for the field. */
  min: PropTypes.number,
  /** Using the up/down arrow keys will increment/decrement the input value by this number. */
  step: PropTypes.number,
  /** A single character unit that renders in the input after the value, e.g. %  */
  unit: (props, propName) => singleCharacterPropTypeCheck(props, propName)
};

InputNumber.defaultProps = {
  hiddenLabel: false,
  required: false,
  onChange: null,
  step: 1
};

export default InputNumber;
