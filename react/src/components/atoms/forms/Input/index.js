import React from 'react';
import classNames from 'classnames';

import './style.css';
import { InputContext, FormContext } from './context';

const Input = (props) => {
  const inputLabelClasses = classNames({
    ma__label: true,
    'ma__label--hidden': (props.labelText && props.hiddenLabel),
    'ma__label--required': (props.labelText && props.required),
    'ma__label--optional': (props.labelText && props.required)
  });
  // InputProvider will get the same props.children as Input.
  return(
    <React.Fragment>
      {props.labelText && <label htmlFor={props.id} className={inputLabelClasses}>{props.labelText}</label>}
      <InputProvider {...props} />
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
      value: this.props.defaultText,
      updateState: this.updateState,
      showError: false,
      errorMsg: this.props.errorMsg
    };
  }
  updateState = (newState) => {
    this.setState(newState);
  };
  checkFormContext = (formContext) => {
    if (formContext.isActive) {
      if (!Object.prototype.hasOwnProperty.call(formContext.value, this.props.id)) {
        formContext.setValue({ id: this.props.id, value: this.state.value });
      } else if (formContext.value[this.props.id] !== this.state.value) {
        formContext.setValue({ id: this.props.id, value: this.state.value });
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
        {this.props.children}
      </InputContext.Provider>
    );
  }
}


Input.contextType = InputContext;

export default Input;
