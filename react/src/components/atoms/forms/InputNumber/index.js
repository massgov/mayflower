import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input';
import { InputContext } from '../Input/context';
import { validNumber } from '../Input/validate';
import './style.css';

const Number = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const inputClasses = classNames({
            'ma__input-currency__control': true,
            'js-is-required': props.required
          });

          const displayErrorMessage = (val, min, max, isRequired) => {
            if (isRequired && val.length === 0) {
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
            const updateError = displayErrorMessage(value, props.min, props.max, props.required);
            context.updateState({ value, ...updateError });

            if (typeof props.onChange === 'function') {
              props.onChange(e);
            }
          };

          const handleAdjust = (e, direction) => {
            let newValue;
            if (direction === 'up') {
              newValue = +context.value + props.step;
            } else if (direction === 'down') {
              newValue = +context.value - props.step;
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
            disabled: props.disabled
          };
          return(
            <div className="ma__input-number">
              <input {...inputAttr} />
              <button
                type="button"
                aria-label="increase value"
                className="ma__input-number__control-plus"
                onClick={(e) => handleAdjust(e, 'up')}
                disabled={props.disabled}
              />
              <button
                type="button"
                aria-label="decrease value"
                className="ma__input-number__control-minus"
                onClick={(e) => handleAdjust(e, 'down')}
                disabled={props.disabled}
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
  // Input and Currency share the props.required and props.id values.
  const currencyProps = {
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
    disabled: props.disabled
  };
  return<Input {...inputProps}><Number {...currencyProps} /></Input>;
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
  step: PropTypes.number
};

InputNumber.defaultProps = {
  hiddenLabel: false,
  required: false,
  onChange: null,
  step: 1
};

export default InputNumber;
