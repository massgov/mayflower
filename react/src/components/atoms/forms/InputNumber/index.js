import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import numbro from 'numbro';

import './style.css';
import { InputContext } from './context';

export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultText,
      updateState: (newState) => this.setState(newState),
      showError: false,
      errorMsg: this.props.errorMsg
    };
  }
  render() {
    const inputLabelClasses = classNames({
      ma__label: true,
      'ma__label--hidden': (this.props.labelText && this.props.hiddenLabel),
      'ma__label--required': (this.props.labelText && this.props.required),
      'ma__label--optional': (this.props.labelText && !this.props.required)
    });
    return(
      <InputContext.Provider value={this.state}>
        <React.Fragment>
          {this.props.labelText && <label htmlFor={this.props.id} className={inputLabelClasses}>{this.props.labelText}</label>}
          {this.props.children}
          {this.state.showError && this.props.errorMsg.length > 0 && <div className="ma__error-msg">{this.state.errorMsg}</div>}
        </React.Fragment>
      </InputContext.Provider>
    );
  }
}

Input.defaultProps = {
  hiddenLabel: false,
  required: false,
  readonly: false
};


const Currency = (props) => (
  <React.Fragment>
    <InputContext.Consumer>
      {
        (context) => {
          const inputClasses = classNames({
            ma__input: true,
            'js-is-required': props.required
          });
          let errorMsg = '';
          const toCurrency = (number, decimal) => {
            if (!Number.isNaN(number)) {
              const currency = numbro(number);
              return currency.format({
                mantissa: decimal || 0,
                trimMantissa: false,
                thousandSeparated: true,
                negative: 'parenthesis'
              });
            }
            return number;
          };
          const validNumber = (num) => {
            if (!Number.isNaN(Number(props.min))) {
              // Make sure the new value isn't less than the min value.
              if (num < Number(props.min)) {
                errorMsg = `Please enter a valid greater than or equal to ${props.min}.`;
                return false;
              }
            }
            if (!Number.isNaN(Number(props.max))) {
              if (num > Number(props.max)) {
                errorMsg = `Please enter a valid less than or equal to ${props.max}.`;
                return false;
              }
            }
            return true;
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
              if (validNumber(numberValue)) {
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
              props.onChange(numberValue);
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
              if (typeof e.target.value !== 'string') {
                stringValue = String(e.target.value);
              } else {
                stringValue = e.target.value;
              }
              const numberValue = numbro.unformat(stringValue);
              if (!Number.isNaN(numberValue) && stringValue.length > 0) {
                let newValue;
                const step = !Number.isNaN(Number(props.step)) ? Number(props.step) : 1;
                if (e.key === 'ArrowDown') {
                  newValue = Number.parseFloat(numberValue - step).toFixed(2);
                  const showError = !validNumber(newValue);
                  context.updateState({ showError, errorMsg, value: newValue });
                } else if (e.key === 'ArrowUp') {
                  newValue = Number.parseFloat(numberValue + step).toFixed(2);
                  const showError = !validNumber(newValue);
                  context.updateState({ showError, errorMsg, value: newValue });
                }
              }
            },
            required: props.required,
            value: context.value
          };
          return<input {...inputAttr} />;
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

const InputCurrency = (props) => {
  const {
    max, min, step, name, onChange, onBlur, placeholder, width, maxlength, ...inputProps
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
    onBlur
  };
  return<Input {...inputProps}><Currency {...currencyProps} /></Input>;
};

InputCurrency.propTypes = {
  /** Whether the label should be hidden or not */
  hiddenLabel: PropTypes.bool,
  /** The label text for the input field */
  labelText: PropTypes.string.isRequired,
  /** Whether the field is required or not */
  required: PropTypes.bool,
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
  onBlur: PropTypes.func,
  /** Default input text value */
  defaultText: PropTypes.string,
  /** Max value for the field. */
  max: PropTypes.number,
  /** Min value for the field. */
  min: PropTypes.number,
  /** Using the up/down arrow keys will increment/decrement the input value by this number. */
  step: PropTypes.number
};
InputCurrency.defaultProps = {
  hiddenLabel: false,
  required: false,
  onChange: null,
  onBlur: null
};

export default InputCurrency;
