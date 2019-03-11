import React from 'react';
import classNames from 'classnames';
import is from 'is';

import './style.css';
import { InputContext, FormContext } from './context';

const Input = (props) => {
  if (is.fn(props.shouldRender) && !props.shouldRender()) {
    return null;
  }
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
  componentDidMount() {
    this.checkFormContext(this.context);
  }
  componentDidUpdate() {
    if (is.fn(this.context.syncContent)) {
      this.context.syncContent(this.props.id);
    }
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
      // By giving the form getters and setters and not the input value,
      // extra re-renders are avoided when context updates.
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
        <div className="ma__input-group-right">
          {this.props.children}
        </div>
      </InputContext.Provider>
    );
  }
}


InputProvider.contextType = FormContext;

export default Input;

class InputSync extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      syncContent: this.syncContent,
      children: this.props.children
    };
  }
  componentDidMount() {
    this.checkFormContext(this.context);
  }
  checkFormContext = (formContext) => {
    if (formContext.isActive) {
      if (!Object.prototype.hasOwnProperty.call(formContext.value[this.props.id], 'syncContent')) {
        const { value } = formContext;
        value[this.props.id].syncContent = [];
        value[this.props.id].syncContent.push(this.syncContent);
        formContext.updateState({ value });
      } else {
        const { value } = formContext;
        value[this.props.id].syncContent.push(this.syncContent);
        formContext.updateState({ value });
      }
    }
  };
  syncContent = (nextValue) => {
    if (is.fn(this.props.syncCondition)) {
      if (this.props.syncCondition(this.state.value)) {
        this.setState({ value: nextValue });
      }
    }
  };
  render() {
    return(
      this.state.children()
    );
  }
}
InputSync.contextType = FormContext;
export { InputSync };
