import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import is from 'is';
import deepEqual from 'fast-deep-equal';


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
      useOwnStateValue: this.props.useOwnStateValue,
      getOwnValue: this.getOwnValue,
      setOwnValue: this.setOwnValue,
      updateOwnState: this.updateOwnState,
      showError: false,
      errorMsg: this.props.errorMsg,
      disabled: this.props.disabled,
      inline: this.props.inline,
      forceOwnUpdate: this.forceOwnUpdate,
      getOwnOnComponentUpdateFunc: this.props.onComponentUpdate,
      setOwnOnComponentUpdateFunc: this.setOwnOnComponentUpdateFunc,
      getOwnRef: this.getOwnRef
    };
    this.selfRef = React.createRef();
  }
  componentDidMount() {
    this.checkFormContext();
  }
  componentDidUpdate() {
    // run the on update functions for this InputProvider.
    if (is.fn(this.state.getOwnOnComponentUpdateFunc)) {
      this.state.getOwnOnComponentUpdateFunc(this.state.getOwnValue(), this.props.id);
    }
  }
  getOwnRef = () => this.selfRef;
  // Returns the InputProvider's current value. Used by FormContext/FormProvider.
  getOwnValue = () => {
    if (this.state.useOwnStateValue) {
      return this.state.value;
    }
    const formContext = this.context;
    if (formContext && formContext.isActive) {
      const ref = formContext.getInputProviderRef(this.props.id);
      if (ref && ref.current) {
        return ref.current.value;
      }
    }
    return this.props.defaultValue;
  };
  // Sets useOwnStateValue to the passed in value.
  // When value is true, the InputProvider will switch over to storing an input's value within this.state.value.
  // Use this for components that don't normally have an input element.
  setUseOwnStateValue = (value) => {
    if (is.bool(value)) {
      this.setState({ useOwnStateValue: value });
    }
  };
  // Sets the InputProvider's value. Used by FormContext/FormProvider.
  setOwnValue = (value, afterUpdate) => {
    if (this.state.useOwnStateValue) {
      this.setState({ value }, () => {
        if (this.context && this.context.isActive) {
          this.context.updateFormState({ [this.props.id]: value }, afterUpdate);
        } else if (is.fn(afterUpdate)) {
          afterUpdate();
        }
      });
    } else {
      const formContext = this.context;
      if (formContext && formContext.isActive) {
        const ref = formContext.getInputProviderRef(this.props.id);
        if (ref && ref.current) {
          ref.current.value = value;
          formContext.updateFormState({ [this.props.id]: value }, afterUpdate);
        }
      } else if (this.selfRef && this.selfRef.current) {
        this.selfRef.current.value = value;
        if (is.fn(afterUpdate)) {
          afterUpdate();
        }
      }
    }
  };
  setOwnOnComponentUpdateFunc = (getOwnOnComponentUpdateFunc) => {
    this.setState({ getOwnOnComponentUpdateFunc });
  };
  // Allows for forcing an update of an InputProvider through FormContext/FormProvider.
  forceOwnUpdate = () => {
    this.forceUpdate();
  };
  updateOwnState = (newState, afterUpdate) => {
    if (Object.prototype.hasOwnProperty.call(newState, 'value')) {
      const { value } = newState;
      delete newState.value;
      this.state.setOwnValue(value);
    }
    this.setState(newState, afterUpdate);
  };
  // Checks to see if this InputProvider's FormContext is active.
  // If it is, check to see if its id has been added to FormContext's inputProviderStore.
  // If it isn't, add it now.
  // By giving the form getters and setters and not the input value,
  // extra re-renders are avoided when context updates.
  checkFormContext = () => {
    const formContext = this.context;
    if (formContext && formContext.isActive) {
      const { inputProviderStore = {} } = formContext;
      if (!Object.prototype.hasOwnProperty.call(inputProviderStore, this.props.id)) {
        inputProviderStore[this.props.id] = {};
      }
      if (!Object.prototype.hasOwnProperty.call(formContext, this.props.id)) {
        formContext.updateFormState({ [this.props.id]: this.state.getOwnValue() });
      }
      // This list is only for things from this.state.
      const inputStateProperties = [
        'getOwnValue',
        'setOwnValue',
        'updateOwnState',
        'forceOwnUpdate',
        'useOwnStateValue',
        'setUseOwnStateValue',
        'getOwnOnComponentUpdateFunc',
        'setOwnOnComponentUpdateFunc'
      ];
      inputStateProperties.forEach((property) => {
        if (!Object.prototype.hasOwnProperty.call(inputProviderStore[this.props.id], property)) {
          inputProviderStore[this.props.id][property] = this.state[property];
        }
      });
      // Also check for selfRef.
      if (!Object.prototype.hasOwnProperty.call(inputProviderStore[this.props.id], 'selfRef')) {
        inputProviderStore[this.props.id].selfRef = this.selfRef;
      }
      if (!deepEqual(inputProviderStore, formContext.inputProviderStore)) {
        formContext.updateFormState({ inputProviderStore });
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
InputProvider.defaultProps = {
  onComponentUpdate: null,
  useOwnStateValue: false
};

InputProvider.propTypes = {
  /** Controls if the component's local this.state should be used to store the value for the Input. Use this when your component does not contain an input element. */
  useOwnStateValue: PropTypes.bool,
  /** An optional function that is ran during the componentDidUpdate lifecycle of this component. This function is passed the current value of the InputProvider. */
  onComponentUpdate: PropTypes.func,
  /** The default value that should be used for the input. */
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any
};


InputProvider.contextType = FormContext;

export default Input;

