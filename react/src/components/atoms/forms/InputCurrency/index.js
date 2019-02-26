import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numbro from 'numbro';
import languages from 'numbro/dist/languages.min';

import Input from '../Input';
import Error from '../Input/error';
import { InputContext } from '../Input/context';
import { validNumber } from '../Input/validate';
import './style.css';

const Currency = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const inputClasses = classNames({
            'ma__input-currency__control': true,
            'js-is-required': props.required
          });
          let errorMsg = '';
          const toCurrency = (number, decimal) => {
            if (!Number.isNaN(number)) {
              if (props.language) {
                let i = 0;
                const langKeys = Object.keys(languages);
                const langMax = langKeys.length;
                for (; i < langMax; i += 1) {
                  const langKey = langKeys[i];
                  const lang = languages[langKey];
                  numbro.registerLanguage(lang);
                }
                numbro.setLanguage(props.language);
              }
              const currency = numbro(number);
              const { format } = props;
              if (decimal) {
                format.mantissa = decimal;
              }
              return currency.formatCurrency(format);
            }
            return number;
          };
          const handleChange = (e) => {
            let stringValue;
            if (typeof e.target.value !== 'string') {
              stringValue = String(e.target.value);
            } else {
              stringValue = e.target.value;
            }
            const update = {
              value: stringValue
            };
            const numberValue = numbro.unformat(stringValue);
            // This validation is needed here as onKeyDown does not
            // get the new value in the input after a key press.
            if (props.required && stringValue.length === 0) {
              errorMsg = 'Please enter a value.';
              update.showError = true;
              update.errorMsg = errorMsg;
            } else if (!Number.isNaN(numberValue) && stringValue.length > 0) {
              const validate = validNumber(numberValue, props.min, props.max);
                update.showError = validate.showError;
                update.errorMsg = validate.errorMsg;
            } else {
              errorMsg = '';
              update.showError = false;
              update.errorMsg = errorMsg;
            }
            context.updateState(update, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(numberValue, props.id);
              }
            });
          };
          const handleAdjust = (e, direction) => {
            let stringValue;
            if (typeof context.value !== 'string') {
              stringValue = String(context.value);
            } else {
              stringValue = context.value;
            }
            const numberValue = numbro.unformat(stringValue);
            // default to 0 if defaultValue is NaN
            const baseValue = numberValue || 0;
            if (!Number.isNaN(numberValue)) {
              let newValue;
              if (direction === 'up') {
                newValue = Number(Number.parseFloat(baseValue + props.step).toFixed(2));
              } else if (direction === 'down') {
                newValue = Number(Number.parseFloat(baseValue - props.step).toFixed(2));
              }
              const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
              context.updateState({ showError, errorMsg, value: toCurrency(newValue, 2) }, () => {
                if (typeof props.onChange === 'function') {
                  props.onChange(newValue, props.id);
                }
              });
            }
          };
          const inputAttr = {
            className: inputClasses,
            name: props.name,
            id: props.id,
            type: 'text',
            placeholder: props.placeholder,
            'data-type': 'text',
            maxLength: !Number.isNaN(Number(props.maxlength)) ? Number(props.maxlength) : null,
            style: props.width ? { width: `${props.width}px` } : null,
            onChange: handleChange,
            onBlur: (e) => {
              let stringValue;
              if (typeof e.target.value !== 'string') {
                stringValue = String(e.target.value);
              } else {
                stringValue = e.target.value;
              }
              const numberValue = numbro.unformat(stringValue);
              if (props.required && stringValue.length === 0) {
                errorMsg = 'Please enter a value.';
                context.updateState({ showError: true, errorMsg });
              }
              if (!Number.isNaN(numberValue) && stringValue.length > 0) {
                const { showError, errorMsg } = validNumber(numberValue, props.min, props.max);
                context.updateState({ showError, errorMsg, value: toCurrency(numberValue, 2) }, () => {
                  // invokes custom function if passed in the component
                  if (typeof props.onBlur === 'function') {
                    // context.value won't be immediately changed, so pass new value over.
                    props.onBlur(numberValue);
                  }
                });
              }
            },
            onFocus: (e) => {
              let stringValue;
              if (typeof e.target.value !== 'string') {
                stringValue = String(e.target.value);
              } else {
                stringValue = e.target.value;
              }
              if (!Number.isNaN(numbro.unformat(stringValue)) && stringValue.length > 0) {
                context.updateState({ value: numbro.unformat(stringValue) });
              }
            },
            onKeyDown: (e) => {
              let stringValue;
              if (typeof context.value !== 'string') {
                stringValue = String(context.value);
              } else {
                stringValue = context.value;
              }
              const numberValue = numbro.unformat(stringValue);
              if (!Number.isNaN(numberValue) && stringValue.length > 0) {
                let newValue;
                if (e.key === 'ArrowDown') {
                  newValue = Number(Number.parseFloat(numberValue - props.step).toFixed(2));
                  const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
                  context.updateState({ showError, errorMsg, value: toCurrency(newValue, 2) }, () => {
                    if (typeof props.onChange === 'function') {
                      props.onChange(newValue, props.id);
                    }
                  });
                } else if (e.key === 'ArrowUp') {
                  newValue = Number(Number.parseFloat(numberValue + props.step).toFixed(2));
                  const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
                  context.updateState({ showError, errorMsg, value: toCurrency(newValue, 2) }, () => {
                    if (typeof props.onChange === 'function') {
                      props.onChange(newValue, props.id);
                    }
                  });
                }
              }
            },
            required: props.required,
            value: context.getValue(),
            disabled: props.disabled
          };
          return(
            <div className="ma__input-currency">
              <input {...inputAttr} />
              <div className="ma__input-number__control-buttons">
                <button
                  type="button"
                  aria-label="increase value"
                  className="ma__input-currency__control-plus"
                  onClick={(e) => handleAdjust(e, 'up')}
                  disabled={props.disabled}
                  tabIndex={-1}
                />
                <button
                  type="button"
                  aria-label="decrease value"
                  className="ma__input-currency__control-minus"
                  onClick={(e) => handleAdjust(e, 'down')}
                  disabled={props.disabled}
                  tabIndex={-1}
                />
              </div>
            </div>
          );
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputCurrency = (props) => {
  const {
    max, min, step, name, onChange, onBlur, placeholder, width, maxlength, format, language, ...inputProps
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
    onBlur,
    format,
    language,
    disabled: props.disabled
  };
  if (inputProps.defaultValue || inputProps.defaultValue === 0) {
    const currency = numbro(inputProps.defaultValue);
    inputProps.defaultValue = currency.formatCurrency(format);
  }
  return(
    <Input {...inputProps}>
      <Currency {...currencyProps} />
      <Error id={props.id} />
    </Input>
  );
};

InputCurrency.propTypes = {
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
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Max value for the field. */
  max: PropTypes.number,
  /** Min value for the field. */
  min: PropTypes.number,
  /** Using the up/down arrow keys will increment/decrement the input value by this number. */
  step: PropTypes.number,
  /** A language tag that represents what country the currency should display. Comes from IETF BCP 47: https://numbrojs.com/languages.html */
  language: PropTypes.string,
  /** Numbro Formatting options for displaying the currency. See https://numbrojs.com/format.html */
  format: PropTypes.object,
  /** Inline label and input field */
  inline: PropTypes.bool
};
InputCurrency.defaultProps = {
  hiddenLabel: false,
  required: false,
  onChange: null,
  onBlur: null,
  language: 'en-US',
  format: {
    mantissa: 2,
    trimMantissa: false,
    thousandSeparated: true,
    negative: 'parenthesis'
  },
  step: 0.01
};

export default InputCurrency;
