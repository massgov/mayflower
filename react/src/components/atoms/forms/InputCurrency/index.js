import React, { useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numbro from 'numbro';
import languages from 'numbro/dist/languages.min';
import is from 'is';

import Input from '../Input';
import { countDecimals } from '../Input/utility';
import Error from '../Input/error';
import { FormContext, InputContext } from '../Input/context';
import { validNumber } from '../Input/validate';
import './style.css';

const Currency = forwardRef((props, ref) => {
  return(
    <InputContext.Consumer>
      {
        (context) => {
          const upRef = React.createRef();
          const downRef = React.createRef();
          const inputClasses = classNames({
            'ma__input-currency__control': true,
            'js-is-required': props.required
          });
          let errorMsg = '';
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
          const hasProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property) && !is.nil(obj[property]);
          const handleChange = (e) => {
            const { type } = e;
            const stringValue = ref.current.value;
            let numberValue;
            const update = {};
            if (is.empty(stringValue)) {
              numberValue = 0;
            } else {
              numberValue = Number(numbro.unformat(stringValue));
            }
            // This validation is needed here as onKeyDown does not
            // get the new value in the input after a key press.
            if (props.required && is.empty(stringValue)) {
              errorMsg = 'Please enter a value.';
              update.showError = true;
              update.errorMsg = errorMsg;
            } else if (is.number(numberValue) && !is.empty(stringValue)) {
              const validate = validNumber(numberValue, props.min, props.max);
              update.showError = validate.showError;
              update.errorMsg = validate.errorMsg;
            } else {
              errorMsg = '';
              update.showError = false;
              update.errorMsg = errorMsg;
            }
            context.updateOwnState(update, () => {
              if (typeof props.onChange === 'function') {
                props.onChange(numberValue, props.id, type);
              }
            });
          };
          const handleAdjust = (e) => {
            const direction = (e.currentTarget === upRef.current) ? 'up' : 'down';
            const { type } = e;
            const inputEl = ref.current;
            let numberValue;
            const stringValue = inputEl.value;
            if (is.empty(stringValue)) {
              numberValue = 0;
            } else {
              numberValue = Number(numbro.unformat(inputEl.value));
            }
            if (is.number(numberValue)) {
              let newValue;
              if (direction === 'up') {
                newValue = Number(numbro(numberValue).add(props.step).format({ mantissa: countDecimals(props.step) }));
              } else if (direction === 'down') {
                newValue = Number(numbro(numberValue).subtract(props.step).format({ mantissa: countDecimals(props.step) }));
              }
              if ((!hasProperty(props, 'min') || newValue >= props.min) && (!hasProperty(props, 'max') || (newValue <= props.max))) {
                const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
                context.setOwnValue(
                  // This will not cause a double render because InputCurrency uses input references.
                  toCurrency(newValue, countDecimals(props.step)),
                  () => {
                    context.updateOwnState({
                      showError,
                      errorMsg
                    }, () => {
                      if (typeof props.onChange === 'function') {
                        props.onChange(newValue, props.id, type, direction);
                      }
                    });
                  }
                );
              }
            }
          };
          const handleKeyDown = (e) => {
            const { type, key } = e;
            const inputEl = ref.current;
            const stringValue = inputEl.value;
            let numberValue;
            if (is.empty(stringValue)) {
              numberValue = 0;
            } else {
              numberValue = Number(numbro.unformat(stringValue));
            }
            // default to 0 if defaultValue is NaN
            if (is.number(numberValue) && !is.empty(stringValue)) {
              let newValue = numberValue;
              if (key === 'ArrowDown') {
                newValue = Number(numbro(numberValue).subtract(props.step).format({ mantissa: countDecimals(props.step) }));
                if ((!hasProperty(props, 'min') || newValue >= props.min) && (!hasProperty(props, 'max') || (newValue <= props.max))) {
                  const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
                  context.setOwnValue(
                    // This will not cause a double render because InputCurrency uses input references.
                    toCurrency(newValue, countDecimals(props.step)),
                    () => {
                      context.updateOwnState({
                        showError,
                        errorMsg
                      }, () => {
                        if (typeof props.onChange === 'function') {
                          props.onChange(newValue, props.id, type, key);
                        }
                      });
                    }
                  );
                }
              } else if (key === 'ArrowUp') {
                newValue = Number(numbro(numberValue).add(props.step).format({ mantissa: countDecimals(props.step) }));
                if ((!hasProperty(props, 'min') || newValue >= props.min) && (!hasProperty(props, 'max') || (newValue <= props.max))) {
                  const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
                  context.setOwnValue(
                    // This will not cause a double render because InputCurrency uses input references.
                    toCurrency(newValue, countDecimals(props.step)),
                    () => {
                      context.updateOwnState({
                        showError,
                        errorMsg
                      }, () => {
                        if (typeof props.onChange === 'function') {
                          props.onChange(newValue, props.id, type, key);
                        }
                      });
                    }
                  );
                }
              }
            }
          };
          const handleBlur = () => {
            const inputEl = ref.current;
            if (is.empty(inputEl.value)) {
              inputEl.setAttribute('placeholder', props.placeholder);
            }
            const stringValue = inputEl.value;
            const numberValue = Number(numbro.unformat(stringValue));
            if (props.required && is.empty(stringValue)) {
              errorMsg = 'Please enter a value.';
              context.updateOwnState({ showError: true, errorMsg });
            } else if (!is.empty(stringValue)) {
              let newValue = numberValue;
              if (hasProperty(props, 'max') && newValue > props.max) {
                newValue = props.max;
              }
              if (hasProperty(props, 'min') && newValue < props.min) {
                newValue = props.min;
              }
              const { showError, errorMsg } = validNumber(newValue, props.min, props.max);
              context.setOwnValue(
                toCurrency(newValue, countDecimals(props.step)),
                () => {
                  context.updateOwnState({ showError, errorMsg }, () => {
                    // invokes custom function if passed in the component
                    if (is.fn(props.onBlur)) {
                      // context.value won't be immediately changed, so pass new value over.
                      props.onBlur(numberValue);
                    }
                  });
                }
              );
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
            defaultValue: props.defaultValue,
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
            </div>
          );
        }
      }
    </InputContext.Consumer>
  );
});

const InputCurrency = (props) => {
  const {
    max, min, step, name, onChange, onBlur, placeholder, width, maxlength, format, language, ...inputProps
  } = props;
  const formContext = useContext(FormContext);
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
    defaultValue: props.defaultValue
  };
  if (!is.empty(inputProps.defaultValue)) {
    const currency = numbro(inputProps.defaultValue);
    inputProps.defaultValue = currency.formatCurrency(format);
  }
  if (formContext && !is.nil(formContext.getInputProviderRef(props.id))) {
    currencyProps.ref = formContext.getInputProviderRef(props.id);
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
