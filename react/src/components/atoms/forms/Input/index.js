import React from 'react';
import PropTypes from 'prop-types';
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
      useOwnStateValue: this.props.useOwnStateValue,
      linkedInputProviders: this.props.linkedInputProviders,
      getOwnLinkedInputProviders: this.getOwnLinkedInputProviders,
      setOwnLinkedInputProviders: this.setOwnLinkedInputProviders,
      getOwnValue: this.getOwnValue,
      setOwnValue: this.setOwnValue,
      updateOwnState: this.updateOwnState,
      showError: false,
      errorMsg: this.props.errorMsg,
      disabled: this.props.disabled,
      inline: this.props.inline,
      forceOwnUpdate: this.forceOwnUpdate,
      getOwnOverrideLinkedValueFunc: this.props.overrideLinkedValue,
      getOwnOnComponentUpdateFunc: this.props.onComponentUpdate,
      setOwnOnComponentUpdateFunc: this.setOwnOnComponentUpdateFunc
    };
    this.selfRef = React.createRef();
  }
  componentDidMount() {
    this.checkFormContext(this.context);
  }
  componentDidUpdate() {
    const formProviderContext = this.context;
    if (is.fn(formProviderContext.updateLinkedInputProviders)) {
      // First, run the on update functions for this InputProvider.
      if (is.fn(this.state.getOwnOnComponentUpdateFunc)) {
        this.state.getOwnOnComponentUpdateFunc(this.state.getOwnValue());
      }
      // Then update all InputProvider components whose ids are in the linkedInputProviders array with the newly updated value.
      formProviderContext.updateLinkedInputProviders(this.props.id);
    } else if (is.fn(this.state.getOwnOnComponentUpdateFunc)) {
      // If nothing is linked, just run the on update function for this InputProvider.
      this.state.getOwnOnComponentUpdateFunc(this.state.getOwnValue());
    }
    // Finally, handle updating any InputSync components on the Form that are watching this InputProvider.
    if (is.fn(formProviderContext.checkInputSyncUpdateFunctions)) {
      formProviderContext.checkInputSyncUpdateFunctions(this.props.id);
    }
  }
  // Returns the InputProvider's current value. Used by FormContext/FormProvider.
  getOwnValue = () => {
    if (this.state.useOwnStateValue) {
      return this.state.value;
    }
    const formContext = this.context;
    const ref = formContext.getInputProviderRef(this.props.id);
    if (ref && ref.current) {
      return ref.current.value;
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
      this.setState({ value }, afterUpdate);
    } else {
      const formContext = this.context;
      const ref = formContext.getInputProviderRef(this.props.id);
      if (ref && ref.current) {
        ref.current.value = value;
        if (is.fn(afterUpdate)) {
          afterUpdate();
        }
      }
    }
  };
  // Returns the array of linkedInputProviders this component has, if any.
  // This should not be used to determine ALL InputProvider components linked to this one.
  // Use formContext.getLinkedInputProviders instead for that.
  getOwnLinkedInputProviders = () => this.state.linkedInputProviders;
  setOwnLinkedInputProviders = (ids) => {
    if (is.array(ids) && !is.array.empty(ids)) {
      const { linkedInputProviders = [] } = this.state;
      const updatedIds = linkedInputProviders.concat(ids);
      this.setState({ linkedInputProviders: updatedIds });
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
    this.setState(newState, afterUpdate);
  };
  // Checks to see if this InputProvider's FormContext is active.
  // If it is, check to see if its id has been added to FormContext's inputProviderStore.
  // If it isn't, add it now.
  checkFormContext = (formContext) => {
    if (formContext.isActive) {
      // By giving the form getters and setters and not the input value,
      // extra re-renders are avoided when context updates.
      if (!Object.prototype.hasOwnProperty.call(formContext.inputProviderStore, this.props.id)) {
        const { inputProviderStore } = formContext;
        inputProviderStore[this.props.id] = {
          getOwnValue: this.state.getOwnValue,
          setOwnValue: this.state.setOwnValue,
          updateOwnState: this.state.updateOwnState,
          selfRef: this.selfRef,
          forceOwnUpdate: this.state.forceOwnUpdate,
          useOwnStateValue: this.state.useOwnStateValue,
          setUseOwnStateValue: this.state.setUseOwnStateValue,
          getOwnLinkedInputProviders: this.state.getOwnLinkedInputProviders,
          setOwnLinkedInputProviders: this.state.setOwnLinkedInputProviders,
          getOwnOnComponentUpdateFunc: this.state.getOwnOnComponentUpdateFunc,
          setOwnOnComponentUpdateFunc: this.state.setOwnOnComponentUpdateFunc,
          getOwnOverrideLinkedValueFunc: this.state.getOwnOverrideLinkedValueFunc
        };
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
  linkedInputProviders: [],
  onComponentUpdate: null,
  overrideLinkedValue: null,
  useOwnStateValue: false
};

InputProvider.propTypes = {
  /** Controls if the component's local this.state should be used to store the value for the Input. Use this when your component does not contain an input element. */
  useOwnStateValue: PropTypes.bool,
  /** An array of InputProvider component ids. Whenever the value of any InputProvider within this array update, all InputProviders whose ids are in this array will be set to the same value. This should only be set once for any of the InputProviders that should be linked. */
  linkedInputProviders: PropTypes.arrayOf(PropTypes.string),
  /** An optional function that overrides the value that would be set to this InputProvider when linked together by any other InputProvider's linkedInputProviders. The value returned by this function becomes the newly overridden value. */
  overrideLinkedValue: PropTypes.func,
  /** An optional function that is ran during the componentDidUpdate lifecycle of this component. This function is passed the current value of the InputProvider. */
  onComponentUpdate: PropTypes.func,
  /** The default value that should be used for the input. */
  // eslint-disable-next-line react/forbid-prop-types
  defaultValue: PropTypes.any
};


InputProvider.contextType = FormContext;

export default Input;

