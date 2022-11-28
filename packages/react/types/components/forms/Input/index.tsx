// @ts-nocheck
/**
 * Input module.
 * @module @massds/mayflower-react/Input
 * @requires module:@massds/mayflower-assets/scss/01-atoms/01-atoms/helper-text
 */
import React from 'react';
import classNames from 'classnames';

import Label from 'MayflowerReactForms/Label';
import { InputContext, FormContext } from 'MayflowerReactForms/Input/context';

export interface InputProps {
  id?: string
  labelText?: string
  hiddenLabel?: boolean
  required?: boolean
  inline?: boolean
  disabled?: boolean
  classes?: string[]
}

/* eslint-disable react/no-unused-state */

const Input = (props: InputProps) => {
  const {
    inline, classes, labelText, hiddenLabel, required, disabled, id
  } = props;
  const inputClasses = classNames({
    'ma__input-group': true,
    'ma__input-group--inline': inline,
    [classes && classes.length > 0 && classes.join(' ')]: true
  });
  const conditionText = required ? '' : 'optional';
  // InputProvider will get the same props.children as Input.
  return(
    <>
      <div className={inputClasses}>
        {labelText && (
          <Label inputId={id} hidden={hiddenLabel} disabled={disabled} conditionText={conditionText}>
            {labelText}
          </Label>
        )}
        <InputProvider {...props} />
      </div>
    </>
  );
};

export interface InputProviderProps {
  inline?: boolean
  id?: string
  children?: React.ReactNode
  disabled?: boolean
  errorMsg?: string
  defaultValue?: string | boolean | number
  classes?: string[]
}

// Anything within a provider always re-renders when state changes.
// Using keys will not prevent this because each child in the provider
// is created with React.createElement, which makes a new object every render.
// This class is so that the label does not re-render for every state change.
class InputProvider extends React.Component<InputProviderProps> {
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
