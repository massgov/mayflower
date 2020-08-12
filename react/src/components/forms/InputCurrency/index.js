/**
 * InputCurrency module.
 * @module @massds/mayflower-react/InputCurrency
 * @requires module:@massds/mayflower-assets/scss/01-atoms/_input--button
 * @requires module:@massds/mayflower-assets/scss/01-atoms/01-atoms/helper-text
 * @requires ma__input--button('currency');
 */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numbro from 'numbro';
import languages from 'numbro/dist/languages.min';
import is from 'is';

import InputGroup, { getInputGroupProps } from 'MayflowerReactForms/InputGroup';
import { countDecimals } from 'MayflowerReactForms/Input/utility';

const InputCurrency = React.forwardRef((props, ref) => {
  const {
    format = {
      mantissa: 2,
      trimMantissa: false,
      thousandSeparated: true,
      negative: 'parenthesis'
    },
    language = 'en-US',
    showButtons = true,
    inputProps = {},
    groupProps = {}
  } = props;
  const {
    id,
    max,
    min,
    step = 0.01,
    onChange = null,
    onBlur = null,
    placeholder = '',
    required = false,
    maxlength = null,
    defaultValue = '',
    disabled = false,
    width
  } = inputProps;
  const {
    showError = false
  } = groupProps;

  let formattedDefault = defaultValue;
  if (formattedDefault !== null && formattedDefault !== '') {
    const currency = numbro(formattedDefault);
    formattedDefault = currency.formatCurrency(format);
  }
  const inputRef = React.useRef(ref);
  const upRef = React.useRef();
  const downRef = React.useRef();
  const inputClasses = classNames({
    'ma__input-currency__control': true,
    'js-is-required': required,
    'ma__input-currency__control--showButtons': showButtons
  });
  const toCurrency = (number, decimal) => {
    if (is.number(number)) {
      if (language) {
        let i = 0;
        const langKeys = Object.keys(languages);
        const langMax = langKeys.length;
        for (; i < langMax; i += 1) {
          const langKey = langKeys[i];
          const lang = languages[langKey];
          numbro.registerLanguage(lang);
        }
        numbro.setLanguage(language);
      }
      const currency = numbro(number);
      if (decimal) {
        format.mantissa = decimal;
      }
      return currency.formatCurrency(format);
    }
    return number;
  };
  const hasNumberProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property) && is.number(obj[property]);
  const greaterThanMin = (val) => !hasNumberProperty(props, 'min') || (val >= min);
  const lessThanMax = (val) => !hasNumberProperty(props, 'max') || (val <= max);

  const handleChange = (e) => {
    const { type } = e;
    const stringValue = inputRef.current.value;
    const numberValue = stringValue ? Number(numbro.unformat(stringValue)) : 0;
    // If the stringvalue is empty, set to empty string so the required error
    // message is rendered. Otherwise pass the number value for the min/max check.
    if (is.fn(onChange)) {
      onChange(numberValue, id, type);
    }
  };

  const handleAdjust = (e) => {
    const direction = (e.currentTarget === upRef.current) ? 'up' : 'down';
    const { type } = e;
    const stringValue = inputRef.current.value;
    const numberValue = stringValue ? Number(numbro.unformat(stringValue)) : 0;
    let newValue;
    if (direction === 'up') {
      newValue = Number(numbro(numberValue).add(step).format({ mantissa: countDecimals(step) }));
    } else if (direction === 'down') {
      newValue = Number(numbro(numberValue).subtract(step).format({ mantissa: countDecimals(step) }));
    }
    if (greaterThanMin(newValue) && lessThanMax(newValue)) {
      inputRef.current.value = toCurrency(newValue, countDecimals(step));
      if (is.fn(onChange)) {
        onChange(newValue, id, type, direction);
      }
    }
  };

  const handleKeyDown = (e) => {
    const { type, key } = e;
    const stringValue = inputRef.current.value;
    const numberValue = stringValue ? Number(numbro.unformat(stringValue)) : 0;
    // default to 0 if defaultValue is NaN
    if (is.number(numberValue) && !is.empty(stringValue)) {
      let newValue = numberValue;
      if (key === 'ArrowDown') {
        newValue = Number(numbro(numberValue).subtract(step).format({ mantissa: countDecimals(step) }));
        if (greaterThanMin(newValue) && lessThanMax(newValue)) {
          inputRef.current.value = toCurrency(newValue, countDecimals(step));
          if (is.fn(onChange)) {
            onChange(newValue, id, type, key);
          }
        }
      } else if (key === 'ArrowUp') {
        newValue = Number(numbro(numberValue).add(step).format({ mantissa: countDecimals(step) }));
        if (greaterThanMin(newValue) && lessThanMax(newValue)) {
          inputRef.current.value = toCurrency(newValue, countDecimals(step));
          if (is.fn(onChange)) {
            onChange(newValue, id, type, key);
          }
        }
      }
    }
  };

  const handleBlur = (e) => {
    const { type } = e;
    const inputEl = inputRef.current;
    const stringValue = inputEl.value;
    // isNotNumber returns true if stringValue is null, undefined or 'NaN'
    /* eslint-disable-next-line   no-restricted-globals */
    const isNotNumber = !stringValue || isNaN(Number(numbro.unformat(stringValue)));
    if (isNotNumber) {
      inputEl.setAttribute('placeholder', placeholder);
    }
    let newValue = isNotNumber ? '' : Number(numbro.unformat(stringValue));
    if (!is.empty(newValue)) {
      if (hasNumberProperty(props, 'max') && newValue > max) {
        newValue = max;
      }
      if (hasNumberProperty(props, 'min') && newValue < min) {
        newValue = min;
      }
      inputRef.current.value = toCurrency(newValue, countDecimals(step));
      if (is.fn(onBlur)) {
        onBlur(newValue, { id, type });
      }
    }
  };

  const handleFocus = () => {
    const inputEl = inputRef.current;
    if (is.empty(inputEl.value)) {
      inputEl.removeAttribute('placeholder');
    }
  };

  const inputAttr = {
    ...inputProps,
    step,
    className: inputClasses,
    type: 'text',
    placeholder,
    'data-type': 'text',
    style: !is.empty(width) ? { width: `${width}px` } : null,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    required,
    disabled,
    defaultValue: formattedDefault
  };
  if (is.number(maxlength)) {
    inputAttr.maxLength = maxlength;
  }
  const wrapperClasses = classNames('ma__input-currency', {
    'ma__input-number--error': showError
  });
  return(
    <InputGroup {...props}>
      <div className={wrapperClasses}>
        <input {...inputAttr} ref={inputRef} />
        {
          showButtons && (
            <div className="ma__input-number__control-buttons">
              <button
                type="button"
                aria-label="increase value"
                className="ma__input-currency__control-plus"
                onClick={handleAdjust}
                disabled={disabled}
                tabIndex={-1}
                ref={upRef}
              />
              <button
                type="button"
                aria-label="decrease value"
                className="ma__input-currency__control-minus"
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
  /* eslint-disable-next-line react/forbid-prop-types */
  format: PropTypes.object,
  /** Inline label and input field */
  inline: PropTypes.bool,
  /** Whether to render up/down buttons */
  showButtons: PropTypes.bool
};

InputCurrency.displayName = 'Currency';
export default InputCurrency;
