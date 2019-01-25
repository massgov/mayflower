import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numbro from 'numbro';
import languages from 'numbro/dist/languages.min';

import Input from '../Input';
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
              if (validNumber(numberValue, props.min, props.max, errorMsg)) {
                errorMsg = '';
                update.showError = false;
                update.errorMsg = errorMsg;
              } else {
                update.showError = true;
                update.errorMsg = errorMsg;
              }
            } else {
              errorMsg = '';
              update.showError = false;
              update.errorMsg = errorMsg;
            }
            context.updateState(update);
            if (typeof props.onChange === 'function') {
              props.onChange(numberValue, e);
            }
          };
          const handleAdjust = (direction) => {
            let stringValue;
            if (typeof context.value !== 'string') {
              stringValue = String(context.value);
            } else {
              stringValue = context.value;
            }
            const numberValue = numbro.unformat(stringValue);
            if (!Number.isNaN(numberValue)) {
              let newValue;
              if (direction === 'up') {
                newValue = Number.parseFloat(numberValue - props.step).toFixed(2);
              } else if (direction === 'down') {
                newValue = Number.parseFloat(numberValue - props.step).toFixed(2);
              }
              const showError = !validNumber(newValue);
              context.updateState({ showError, errorMsg, value: toCurrency(newValue, 2) });
            }
            if (typeof props.onAdjust === 'function') {
              props.onAdjust(numberValue);
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
                if (validNumber(numberValue)) {
                  context.updateState({ showError: false, value: toCurrency(numberValue, 2) });
                } else {
                  context.updateState({ showError: true, errorMsg });
                }
                // invokes custom function if passed in the component
                if (typeof props.onBlur === 'function') {
                  // context.value won't be immediately changed, so pass new value over.
                  props.onBlur(numberValue);
                }
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
                  newValue = Number.parseFloat(numberValue - props.step).toFixed(2);
                  const showError = !validNumber(newValue);
                  context.updateState({ showError, errorMsg, value: toCurrency(newValue, 2) });
                } else if (e.key === 'ArrowUp') {
                  newValue = Number.parseFloat(numberValue + props.step).toFixed(2);
                  const showError = !validNumber(newValue);
                  context.updateState({ showError, errorMsg, value: toCurrency(newValue, 2) });
                }
              }
              if (typeof props.onChange === 'function') {
                props.onChange(numberValue);
              }
            },
            required: props.required,
            value: context.value,
            disabled: props.disabled
          };
          return(
            <div className="ma__input-currency">
              <input {...inputAttr} />
              <button
                type="button"
                aria-label="increase value"
                className="ma__input-currency__control-plus"
                onClick={() => handleAdjust('up')}
                disabled={props.disabled}
              />
              <button
                type="button"
                aria-label="decrease value"
                className="ma__input-currency__control-minus"
                onClick={() => handleAdjust('down')}
                disabled={props.disabled}
              />
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
    onChange: props.onChange,
    onAdjust: props.onAdjust,
    onBlur: props.onBlur,
    format,
    language,
    disabled: props.disabled
  };
  if (!Number.isNaN(inputProps.defaultValue)) {
    const currency = numbro(Number(inputProps.defaultValue));
    inputProps.defaultValue = currency.formatCurrency(format);
  }
  return<Input {...inputProps}><Currency {...currencyProps} /></Input>;
};

InputCurrency.propTypes = {
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
  /** Custom onBlur function */
  onBlur: PropTypes.func,
  /** Custom up/down button onClick function */
  onAdjust: PropTypes.func,
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
  format: PropTypes.object
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
