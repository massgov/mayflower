import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import numbro from 'numbro';

import Input from '../Input';
import Error from '../Input/error';
import { InputContext } from '../Input/context';
import { validNumber } from '../Input/validate';
import { countDecimals } from '../Input/utility';
import { numberCharacterPropTypeCheck } from '../../../utilities/componentPropTypeCheck';
import './style.css';

const NumberInput = (props) => {
  const ref = React.createRef();
  const upRef = React.createRef();
  const downRef = React.createRef();
  return(
    <InputContext.Consumer>
      {
        (context) => {
          const hasValue = is.number(context.getOwnValue());
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

          const displayErrorMessage = (val) => {
            const { min, max, required } = props;
            if (required && !is.number(val)) {
              const errorMsg = 'Please enter a value.';
              return{
                showError: true,
                errorMsg
              };
            } else if (is.number(val)) {
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
          const hasProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property) && !is.nil(obj[property]);

          const handleOnBlur = (e) => {
            e.persist();
            const inputEl = ref.current;
            let newValue = Number(inputEl.value);
            if ((hasProperty(props, 'max') && newValue > props.max) || (hasProperty(props, 'min') && newValue < props.min)) {
              if (hasProperty(props, 'max') && newValue > props.max) {
                newValue = props.max;
              }
              if (hasProperty(props, 'min') && newValue < props.min) {
                newValue = props.min;
              }
            }
            if (!is.empty(inputEl.value)) {
              inputEl.value = Number(numbro(newValue)
                .format({ mantissa: countDecimals(props.step) }));
              const updateError = displayErrorMessage(newValue);
              context.updateOwnState({ value: inputEl.value, ...updateError }, () => {
                if (is.fn(props.onBlur)) {
                  props.onBlur(e, inputEl.value);
                }
              });
            }
          };

          const handleChange = (e) => {
            const inputEl = ref.current;
            e.persist();
            let newValue;
            if (is.empty(inputEl.value)) {
              newValue = inputEl.value;
            } else {
              newValue = Number(inputEl.value);
              if (is.number(newValue)) {
                newValue = Number(numbro(inputEl.value)
                  .format({ mantissa: countDecimals(props.step) }));
              }
            }
            const updateError = displayErrorMessage(newValue);
            context.updateOwnState({ value: newValue, ...updateError }, () => {
              if (is.fn(props.onChange)) {
                props.onChange(e, newValue, props.id);
              }
            });
          };

          const handleAdjust = (e) => {
            let direction;
            if (e.currentTarget === upRef.current) {
              direction = 'up';
            } else {
              direction = 'down';
            }
            const inputEl = ref.current;
            if (direction === 'up' && (!hasProperty(props, 'max') || inputEl.value < props.max)) {
              if (is.empty(inputEl.value)) {
                inputEl.value = 1;
              } else {
                inputEl.value = Number(numbro(inputEl.value)
                  .add(props.step).value());
              }
              handleChange(e);
            } else if (direction === 'down' && (!hasProperty(props, 'min') || inputEl.value > props.min)) {
              if (is.empty(inputEl.value)) {
                inputEl.value = -1;
              } else {
                inputEl.value = Number(numbro(inputEl.value)
                  .subtract(props.step).value());
              }
              handleChange(e);
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
            onBlur: handleOnBlur,
            required: props.required,
            disabled: props.disabled,
            step: props.step,
            ref
          };
          inputAttr.value = context.getOwnValue();
          if (is.number(props.max)) {
            inputAttr.max = props.max;
          }
          if (is.number(props.min)) {
            inputAttr.min = props.min;
          }
          return(
            <div className="ma__input-number">
              <input {...inputAttr} />
              {(props.unit && hasValue) ? <span className={unitClasses}>{props.unit}</span> : null}
              {
                props.showButtons && (
                  <div className="ma__input-number__control-buttons">
                    <button
                      type="button"
                      aria-label="increase value"
                      className="ma__input-number__control-plus"
                      data-direction="up"
                      onClick={handleAdjust}
                      disabled={props.disabled}
                      tabIndex={-1}
                      ref={upRef}
                    />
                    <button
                      type="button"
                      aria-label="decrease value"
                      className="ma__input-number__control-minus"
                      data-direction="down"
                      onClick={handleAdjust}
                      disabled={props.disabled}
                      tabIndex={-1}
                      ref={downRef}
                    />
                  </div>
                )
              }
            </div>
          );
        }
      }
    </InputContext.Consumer>
  );
};

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
