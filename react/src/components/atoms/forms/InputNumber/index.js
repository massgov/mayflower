import React from 'react';
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
    const inputText = this.props;
    const inputLabelClasses = classNames({
      ma__label: true,
      'ma__label--hidden': (inputText.labelText && inputText.hiddenLabel),
      'ma__label--required': (inputText.labelText && inputText.required),
      'ma__label--optional': (inputText.labelText && !inputText.required)
    });
    return(
      <InputContext.Provider value={this.state}>
        <React.Fragment>
          {inputText.labelText && <label htmlFor={inputText.id} className={inputLabelClasses}>{inputText.labelText}</label>}
          {this.props.children}
          {this.state.showError && inputText.errorMsg.length > 0 && <div className="ma__error-msg">{this.state.errorMsg}</div>}
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
                errorMsg = `Please enter a valid less than or equal to ${props.min}.`;
                return false;
              }
            }
            errorMsg = '';
            return true;
          };
          const getDefaultNum = (num) => {
            if (!Number.isNaN(num * 1)) {
              return parseInt(num, 10);
            }
            return null;
          };
          const handleChange = (e) => {
            let stringValue;
            if (typeof e.target.value !== 'string') {
              stringValue = String(e.target.value);
            } else {
              stringValue = e.target.value;
            }
            let showError = false;
            if (!context.showError) {
              if (stringValue.length > 0 && !Number.isNaN(numbro.unformat(stringValue)) && !validNumber(numbro.unformat(stringValue))) {
                showError = true;
              }
            }
            context.updateState({ showError, errorMsg, value: stringValue });
          };
          const inputAttr = {
            className: inputClasses,
            name: props.name,
            id: props.id,
            type: 'text',
            placeholder: props.placeholder,
            'data-type': 'text',
            maxLength: getDefaultNum(props.maxlength),
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
              if (!Number.isNaN(numberValue) && stringValue.length > 0) {
                if (validNumber(numberValue)) {
                  context.updateState({ showError: false, value: toCurrency(numberValue, 2) });
                } else {
                  context.updateState({ showError: true, errorMsg });
                }
                // invokes custom function if passed in the component
                if (typeof props.onChange === 'function') {
                  // context.value won't be immediately changed, so pass new value over.
                  props.onChange({ showError: context.showError, updateState: context.updateState, value: numberValue });
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
                const step = Number(props.step) || 1;
                if (e.key === 'ArrowDown') {
                  newValue = Number.parseFloat(numberValue - step).toFixed(2);
                  const showError = !validNumber(newValue);
                  context.updateState({ showError, errorMsg, value: newValue });
                } else if (e.key === 'ArrowUp') {
                  newValue = Number.parseFloat(numberValue + step).toFixed(2);
                  const showError = !validNumber(newValue);
                  context.updateState({ showError, value: newValue });
                }
              }
            },
            required: props.required,
            value: context.value
            //value: (Number.isNaN(Number(context.value))) ? '' : (typeof context.value !== 'string') ? String(context.value) : context.value
            //value: (context.value.toString().length > 0) ? context.value : ''
          };
          return<input {...inputAttr} />;
        }
      }
    </InputContext.Consumer>
  </React.Fragment>
);

export default Currency;
