import React from 'react';
import classNames from 'classnames';

import './style.css';
import { InputContext, FormContext } from './context';

const Input = (props) => {
  const inputClasses = classNames({
    'ma__input-group': true,
    'ma__input-group--inline': props.inline
  });
  const inputLabelClasses = classNames({
    ma__label: true,
    'ma__label--hidden': (props.labelText && props.hiddenLabel),
    'ma__label--required': (props.labelText && props.required),
    'ma__label--optional': (props.labelText && !props.required),
    'ma__label--disabled': (props.labelText && props.disabled)
  });
  // InputProvider will get the same props.children as Input.
  return(
    <React.Fragment>
      <div className={inputClasses}>
        {props.labelText && <label htmlFor={props.id} className={inputLabelClasses}>{props.labelText}</label>}
        <InputProvider {...props} />
      </div>
    </React.Fragment>
  );
};

// Anything within a provider always re-renders when state changes.
// Using keys will not prevent this because each child in the provider
// is created with React.createElement, which makes a new object every render.
// This class is so that the label does not re-render for every state change.
class InputProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      getValue: this.getValue,
      setValue: this.setValue,
      updateState: this.updateState,
      showError: false,
      errorMsg: this.props.errorMsg,
      disabled: this.props.disabled,
      inline: this.props.inline
    };
  }
  getValue = () => this.state.value;
  setValue = (value, afterUpdate) => {
    this.setState({ value }, afterUpdate);
  };
  updateState = (newState, afterUpdate) => {
    this.setState(newState, afterUpdate);
  };
  checkFormContext = (formContext) => {
    if (formContext.isActive) {
      if (!Object.prototype.hasOwnProperty.call(formContext.value, this.props.id)) {
        const { value } = formContext;
        value[this.props.id] = { getValue: this.getValue, setValue: this.setValue };
        formContext.updateState({ value });
      }
    }
  };
  render() {
    return(
      <InputContext.Provider value={this.state}>
        <FormContext.Consumer>
          {
            // Currently, this is called on every render of InputProvider.
            // @TODO: Pull this out of here when InputProvider.contextType is supported
            // and do this logic in componentDidUpdate.
            // InputProvider.contextType should be set to FormContext.
            this.checkFormContext
          }
        </FormContext.Consumer>
        <div className="ma__input-group-right">
          {this.props.children}
        </div>
      </InputContext.Provider>
    );
  }
}


Input.contextType = InputContext;

export default Input;
