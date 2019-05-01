import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import { FormContext } from '../Input/context';

const Form = (props) => {
  const formContext = useContext(FormContext);
  return(
    <form className="ma__form-page" action={props.action}>
      {props.children(formContext)}
    </form>
  );
};

Form.defaultProps = {
  action: '#'
};

class FormProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
      inputProviderStore: {},
      getInputProviderRef: this.getInputProviderRef,
      getInputProviderValue: this.getInputProviderValue,
      hasInputProviderId: this.hasInputProviderId,
      hasInputProviderIds: this.hasInputProviderIds,
      setInputProviderValue: this.setInputProviderValue,
      updateFormState: this.updateFormState,
      forceInputProviderUpdate: this.forceInputProviderUpdate,
      getInputProviderValues: this.getInputProviderValues
    };
  }
  // Returns a react ref back to the input element rendered by the InputProvider whose id matches inputId.
  getInputProviderRef = (inputId) => {
    if (this.state.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      if (is.fn(inputProvider.getOwnRef)) {
        return inputProvider.getOwnRef();
      }
    }
    return null;
  };
  // Returns an object, keyed by InputProvider ids, of values for all InputProviders within inputProviderStore.
  getInputProviderValues = () => {
    const values = {};
    Object.keys(this.state.inputProviderStore).forEach((inputId) => {
      values[inputId] = this.state.getInputProviderValue(inputId);
    });
    return values;
  };
  // Returns an InputProvider's current value.
  getInputProviderValue = (inputId) => {
    if (this.state.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      if (is.fn(inputProvider.getOwnValue)) {
        return inputProvider.getOwnValue();
      }
    }
    return null;
  };
  // Sets an InputProvider's value.
  setInputProviderValue = (input, afterInputProviderSetState) => {
    if (this.state.hasInputProviderId(input.id)) {
      const inputProvider = this.state.inputProviderStore[input.id];
      inputProvider.setOwnValue(input.value, afterInputProviderSetState);
    }
  };
  // Forces an InputProvider to update using this.forceUpdate.
  forceInputProviderUpdate = (inputId) => {
    if (this.state.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      inputProvider.forceOwnUpdate();
      return true;
    }
    return false;
  };
  // Checks to see if the passed inputId exists within the inputProviderStore.
  hasInputProviderId = (inputId) => Object.prototype.hasOwnProperty.call(this.state.inputProviderStore, inputId);
  // Given an array of inputIds, if any of the InputProvider ids are not in this.state.inputProviderStore, return false, else return true.
  hasInputProviderIds = (inputIds = []) => {
    let hasAllIds = true;
    if (is.array.empty(inputIds)) {
      return false;
    }
    inputIds.forEach((inputId) => {
      if (!this.state.hasInputProviderId(inputId)) {
        hasAllIds = false;
      }
    });
    return hasAllIds;
  };
  // Updates the component's state.
  updateFormState = (newState, afterUpdate) => { this.setState(newState, afterUpdate); };
  render() {
    return(
      <FormContext.Provider value={this.state}>
        {is.fn(this.props.children) ? this.props.children() : this.props.children}
      </FormContext.Provider>
    );
  }
}

FormProvider.defaultProps = {
  isActive: true
};

FormProvider.propTypes = {
  /** Controls if child Input components should hook into FormContext or not */
  isActive: PropTypes.bool
};

FormProvider.contextType = FormContext;
export { FormProvider };
export default Form;
