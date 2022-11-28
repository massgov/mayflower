// @ts-nocheck
/**
 * InputCurrency module.
 * @module @massds/mayflower-react/InputCurrency
 * @requires module:@massds/mayflower-assets/scss/01-atoms/_input--button
 * @requires module:@massds/mayflower-assets/scss/01-atoms/01-atoms/helper-text
 * @requires ma__input--button('currency');
 */
import React from 'react';
import classNames from 'classnames';
import numbro from 'numbro';
import languages from 'numbro/dist/languages.min';
import is from 'is';

import Input from 'MayflowerReactForms/Input';
import { countDecimals } from 'MayflowerReactForms/Input/utility';
import Error from 'MayflowerReactForms/Input/error';
import { InputContext } from 'MayflowerReactForms/Input/context';
import { validNumber } from 'MayflowerReactForms/Input/validate';

export interface CurrencyProps {
  required?: boolean
  showButtons?: boolean
  language?: string
  /* eslint-disable-next-line react/forbid-prop-types */
  format?: object
  max?: number
  min?: number
  onChange?(...args: unknown[]): unknown
  onBlur?(...args: unknown[]): unknown
  step?: number
  placeholder?: string
  id: string
  name: string
  maxlength?: number
  width?: number
  disabled?: boolean
}

const Currency = (props: CurrencyProps) => {
  const ref = React.createRef();
  return(
    <InputContext.Consumer>
      {
        (context) => {
          const upRef = React.createRef();
          const downRef = React.createRef();
          const inputClasses = classNames({
            'ma__input-currency__control': true,
            'js-is-required': props.required,
            'ma__input-currency__control--showButtons': props.showButtons
          });
          const toCurrency = (number, decimal) => {
            if (is.number(number)) {
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
          const hasNumberProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property) && is.number(obj[property]);
          const greaterThanMin = (val) => !hasNumberProperty(props, 'min') || (val >= props.min);
          const lessThanMax = (val) => !hasNumberProperty(props, 'max') || (val <= props.max);

          const displayErrorMessage = (val) => {
            const { min, max, required } = props;
            if (required && !is.number(val)) {
              const errorMsg = 'Please enter a value.';
              return{
                showError: true,
                errorMsg
              };
            } if (is.number(val)) {
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
            const { type } = e;
            const stringValue = ref.current.value;
            const numberValue = stringValue ? Number(numbro.unformat(stringValue)) : 0;
            // If the stringvalue is empty, set to empty string so the required error
            // message is rendered. Otherwise pass the number value for the min/max check.
            const updateError = displayErrorMessage(!is.empty(stringValue) ? numberValue : '');
            context.updateState({ value: stringValue, ...updateError }, () => {
              if (is.fn(props.onChange)) {
                props.onChange(numberValue, props.id, type);
              }
            });
          };

          const handleAdjust = (e) => {
            const direction = (e.currentTarget === upRef.current) ? 'up' : 'down';
            const { type } = e;
            const stringValue = ref.current.value;
            const numberValue = stringValue ? Number(numbro.unformat(stringValue)) : 0;
            let newValue;
            if (direction === 'up') {
              newValue = Number(numbro(numberValue).add(props.step).format({ mantissa: countDecimals(props.step) }));
            } else if (direction === 'down') {
              newValue = Number(numbro(numberValue).subtract(props.step).format({ mantissa: countDecimals(props.step) }));
            }
            if (greaterThanMin(newValue) && lessThanMax(newValue)) {
              const updateError = displayErrorMessage(!is.empty(stringValue) ? newValue : '');
              context.updateState({ value: toCurrency(newValue, countDecimals(props.step)), ...updateError }, () => {
                if (is.fn(props.onChange)) {
                  props.onChange(newValue, props.id, type, direction);
                }
              });
            }
          };

          const handleKeyDown = (e) => {
            const { type, key } = e;
            const stringValue = ref.current.value;
            const numberValue = stringValue ? Number(numbro.unformat(stringValue)) : 0;
            // default to 0 if defaultValue is NaN
            if (is.number(numberValue) && !is.empty(stringValue)) {
              let newValue = numberValue;
              if (key === 'ArrowDown') {
                newValue = Number(numbro(numberValue).subtract(props.step).format({ mantissa: countDecimals(props.step) }));
                if (greaterThanMin(newValue) && lessThanMax(newValue)) {
                  const updateError = displayErrorMessage(!is.empty(stringValue) ? newValue : '');
                  context.updateState({ value: toCurrency(newValue, countDecimals(props.step)), ...updateError }, () => {
                    if (is.fn(props.onChange)) {
                      props.onChange(newValue, props.id, type, key);
                    }
                  });
                }
              } else if (key === 'ArrowUp') {
                newValue = Number(numbro(numberValue).add(props.step).format({ mantissa: countDecimals(props.step) }));
                if (greaterThanMin(newValue) && lessThanMax(newValue)) {
                  const updateError = displayErrorMessage(!is.empty(stringValue) ? newValue : '');
                  context.updateState({ value: toCurrency(newValue, countDecimals(props.step)), ...updateError }, () => {
                    if (is.fn(props.onChange)) {
                      props.onChange(newValue, props.id, type, key);
                    }
                  });
                }
              }
            }
          };

          const handleBlur = (e) => {
            const { type } = e;
            const inputEl = ref.current;
            const value = inputEl && inputEl.value;
            const numberValue = value && Number(numbro.unformat(value.replace('$', '')));

            // isNotNumber returns true if value is null, undefined or NaN vs Number.isNaN only checks if value is NaN
            /* eslint-disable-next-line   no-restricted-globals */
            const isNotNumber = isNaN(numberValue);
            if (isNotNumber) {
              inputEl.setAttribute('placeholder', props.placeholder);
            } else {
              let newValue = numberValue;
              if (hasNumberProperty(props, 'max') && newValue > props.max) {
                newValue = props.max;
              }
              if (hasNumberProperty(props, 'min') && newValue < props.min) {
                newValue = props.min;
              }
              const updateError = displayErrorMessage(newValue);
              context.updateState({ value: toCurrency(newValue, countDecimals(props.step)), ...updateError }, () => {
                if (is.fn(props.onBlur)) {
                  props.onBlur(newValue, { id: props.id, type });
                }
              });
            }
          };

          const handleFocus = () => {
            const inputEl = ref.current;
            if (is.empty(inputEl.value)) {
              inputEl.removeAttribute('placeholder');
            }
          };

          const inputAttr = {
            className: inputClasses,
            name: props.name,
            id: props.id,
            type: 'text',
            placeholder: props.placeholder,
            'data-type': 'text',
            maxLength: is.number(props.maxlength) ? Number(props.maxlength) : null,
            style: !is.empty(props.width) ? { width: `${props.width}px` } : null,
            ref,
            onChange: handleChange,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onKeyDown: handleKeyDown,
            required: props.required,
            value: context.getValue(),
            disabled: props.disabled
          };

          return(
            <div className="ma__input-currency">
              <input {...inputAttr} />
              {
                props.showButtons && (
                  <div className="ma__input-number__control-buttons">
                    <button
                      type="button"
                      aria-label="increase value"
                      className="ma__input-currency__control-plus"
                      onClick={handleAdjust}
                      disabled={props.disabled}
                      tabIndex={-1}
                      ref={upRef}
                    />
                    <button
                      type="button"
                      aria-label="decrease value"
                      className="ma__input-currency__control-minus"
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

export interface InputCurrencyProps {
  /** Whether the label should be hidden or not */
  hiddenLabel?: boolean
  /** The label text for the input field, can be a string or a component */
  labelText: string | object
  /** Whether the field is required or not */
  required?: boolean
  /** Whether the field is disabled or not */
  disabled?: boolean
  /** The unique ID for the input field */
  id: string
  /** The name for the input field */
  name: string
  /** The max acceptable input length */
  maxlength?: number
  /** The pattern to filter input against, e.g. "[0-9]" for numbers only */
  pattern?: string
  /** The number of characters wide to make the input field */
  width?: number
  /** The placeholder text for the input field */
  placeholder?: string
  /** The message to be displayed in the event of an error. */
  errorMsg?: string
  /** Custom change function */
  onChange?(...args: unknown[]): unknown
  /** Custom onBlur function */
  onBlur?(...args: unknown[]): unknown
  /** Default input value */
  defaultValue?: string | number
  /** Max value for the field. */
  max?: number
  /** Min value for the field. */
  min?: number
  /** Using the up/down arrow keys will increment/decrement the input value by this number. */
  step?: number
  /** A language tag that represents what country the currency should display. Comes from IETF BCP 47: https://numbrojs.com/languages.html */
  language?: string
  /** Numbro Formatting options for displaying the currency. See https://numbrojs.com/format.html */
  /* eslint-disable-next-line react/forbid-prop-types */
  format?: object
  /** Inline label and input field */
  inline?: boolean
  /** Whether to render up/down buttons */
  showButtons?: boolean
}

const InputCurrency = (props: InputCurrencyProps) => {
  const {
    max, min, step, name, onChange, onBlur, placeholder, width, maxlength, format, language, showButtons, ...inputProps
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
    disabled: props.disabled,
    showButtons
  };
  if (!is.empty(inputProps.defaultValue)) {
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
  step: 0.01,
  showButtons: true
};

export default InputCurrency;
