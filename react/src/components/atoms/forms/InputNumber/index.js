import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from '../Input';
import Error from '../Input/error';
import { InputContext } from '../Input/context';
import { validNumber } from '../Input/validate';
import { countDecimals } from '../Input/utility';
import { numberCharacterPropTypeCheck } from '../../../utilities/componentPropTypeCheck';
import './style.css';

const NumberInput = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const hasValue = context.value || context.value === 0;

          const inputClasses = classNames({
            'ma__input-number__control': true,
            'js-is-required': props.required,
            'ma__input-number__control--showButtons': props.showButtons || (props.unit && hasValue)
          });

          const unitClasses = classNames({
            'ma__input-number-unit': true,
            'ma__input-number-unit--disabled': props.disabled,
            'ma__input-number-unit--showButtons': props.showButtons
          });

          const decimalPlaces = countDecimals(props.step);

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

          const handleOnBlur = (e) => {
            e.persist();
            const { value } = e.target;
            const floatValue = Number(Number.parseFloat(value).toFixed(decimalPlaces));
            if (typeof props.onBlur === 'function') {
              props.onBlur(e, floatValue);
            }
          };

          const handleChange = (e) => {
            e.persist();
            const { value } = e.target;
            const floatValue = Number(Number.parseFloat(value).toFixed(decimalPlaces));
            const updateError = displayErrorMessage(value, props.min, props.max, props.required);
            context.updateOwnState({ value: floatValue, ...updateError }, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(e, floatValue, props.id);
              }
            });
          };

          const handleAdjust = (e, direction) => {
            e.persist();
            let newValue;
            // default to 0 if defaultValue is NaN
            const baseValue = Number(context.value) ? Number(context.value) : 0;
            if (direction === 'up') {
              newValue = Number(Number.parseFloat(baseValue + props.step).toFixed(decimalPlaces));
            } else if (direction === 'down') {
              newValue = Number(Number.parseFloat(baseValue - props.step).toFixed(decimalPlaces));
            }
            const updateError = displayErrorMessage(newValue, props.min, props.max, props.required);
            context.updateOwnState({ value: newValue, ...updateError }, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(e, newValue, props.id);
              }
            });
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
            onBlur: handleOnBlur,
            required: props.required,
            disabled: props.disabled,
            step: props.step
          };

          if (hasValue) {
            inputAttr.value = context.getOwnValue();
          }

          return(
            <div className="ma__input-number">
              <input {...inputAttr} />
              {
                (props.unit && hasValue) ? <span className={unitClasses}>{props.unit}</span> : null
              }
              {
                props.showButtons && (
                  <div className="ma__input-number__control-buttons">
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
                )
              }
            </div>
          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputNumber = (props) => {
  const {
    max, min, step, name, onChange, onBlur, placeholder, width, maxlength, showButtons, ...inputProps
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
    onBlur,
    disabled: props.disabled,
    unit: props.unit,
    showButtons
  };
  return(
    <Input {...inputProps}>
      <NumberInput {...numberProps} />
      <Error id={props.id} />
    </Input>
  );
};

InputNumber.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  /** The label text for the input field, can be a string or a component */
  labelText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
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
  /** Custom onBlur function */
  onBlur: PropTypes.func,
  /** Default input value */
  defaultValue: PropTypes.number,
  /** Max value for the field. */
  max: PropTypes.number,
  /** Min value for the field. */
  min: PropTypes.number,
  /** Using the up/down arrow keys will increment/decrement the input value by this number. */
  step: PropTypes.number,
  /** Inline label and input field */
  inline: PropTypes.bool,
  /** A unit that is a string of no more than 2 characters renders in the input after the value, e.g. %  */
  unit: (props, propName) => numberCharacterPropTypeCheck(props, propName, 2),
  /** Whether to render up/down buttons */
  showButtons: PropTypes.bool
};

InputNumber.defaultProps = {
  hiddenLabel: false,
  required: false,
  onChange: null,
  step: 1,
  showButtons: true,
  unit: ''
};

export default InputNumber;
