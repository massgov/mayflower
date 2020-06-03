/**
 * InputNumber module.
 * @module @massds/mayflower-react/InputNumber
 * @requires module:@massds/mayflower-assets/scss/01-atoms/_input--button
 * @requires module:@massds/mayflower-assets/scss/01-atoms/01-atoms/helper-text
 * @requires ma__input--button('number');
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';

import Input from 'MayflowerReactForms/Input';
import Error from 'MayflowerReactForms/Input/error';
import { InputContext } from 'MayflowerReactForms/Input/context';
import { validNumber } from 'MayflowerReactForms/Input/validate';
import { countDecimals } from 'MayflowerReactForms/Input/utility';
import { numberCharacterPropTypeCheck } from 'MayflowerReactComponents/utilities/componentPropTypeCheck';

const NumberInput = (props) => {
  const ref = React.createRef();
  const upRef = React.createRef();
  const downRef = React.createRef();
  return(
    <InputContext.Consumer>
      {
        (context) => {
          const hasValue = is.number(context.getValue());
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

          const hasNumberProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property) && is.number(obj[property]);

          const handleOnBlur = (e) => {
            e.persist();
            const inputEl = ref.current;
            let newValue = inputEl.value ? Number(inputEl.value) : inputEl.value;
            if (hasNumberProperty(props, 'max') && newValue > props.max) {
              newValue = props.max;
            }
            if (hasNumberProperty(props, 'min') && newValue < props.min) {
              newValue = props.min;
            }
            if (is.number(newValue)) {
              // Since to Fixed returns a string, we have to cast it back to a Number
              newValue = Number(newValue.toFixed(countDecimals(props.step)));
              const updateError = displayErrorMessage(newValue);
              context.updateState({ value: newValue, ...updateError }, () => {
                if (is.fn(props.onBlur)) {
                  props.onBlur(e, newValue);
                }
              });
            }
          };

          const handleChange = (e) => {
            e.persist();
            const inputEl = ref.current;
            const newValue = inputEl.value ? Number(inputEl.value) : inputEl.value;
            const updateError = displayErrorMessage(newValue);
            context.updateState({ value: newValue, ...updateError }, () => {
              if (is.fn(props.onChange)) {
                props.onChange(e, newValue, props.id);
              }
            });
          };

          const handleAdjust = (e) => {
            e.persist();
            let direction;
            if (e.currentTarget === upRef.current) {
              direction = 'up';
            } else {
              direction = 'down';
            }
            const inputEl = ref.current;
            let newValue = inputEl.value ? Number(inputEl.value) : inputEl.value;
            if (direction === 'up' && (!hasNumberProperty(props, 'max') || newValue < props.max)) {
              // Since to Fixed returns a string, we have to cast it back to a Number
              newValue = newValue ? Number((newValue + props.step).toFixed(countDecimals(props.step))) : props.step;
              const updateError = displayErrorMessage(newValue);
              context.updateState({ value: newValue, ...updateError }, () => {
                if (is.fn(props.onChange)) {
                  props.onChange(e, newValue, props.id);
                }
              });
            } else if (direction === 'down' && (!hasNumberProperty(props, 'min') || newValue > props.min)) {
              // Since to Fixed returns a string, we have to cast it back to a Number
              newValue = newValue ? Number((newValue + (props.step * -1)).toFixed(countDecimals(props.step))) : (props.step * -1);
              const updateError = displayErrorMessage(newValue);
              context.updateState({ value: newValue, ...updateError }, () => {
                if (is.fn(props.onChange)) {
                  props.onChange(e, newValue, props.id);
                }
              });
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
          inputAttr.value = context.getValue();
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

NumberInput.propTypes = {
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
