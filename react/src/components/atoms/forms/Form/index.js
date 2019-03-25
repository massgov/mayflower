import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import deepEqual from 'fast-deep-equal';
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
      getInputProviderValue: this.getInputProviderValue,
      hasInputProviderId: this.hasInputProviderId,
      setInputProviderValue: this.setInputProviderValue,
      updateFormState: this.updateFormState,
      getInputProviderValues: this.getInputProviderValues,
      checkInputSyncUpdateFunctions: this.checkInputSyncUpdateFunctions,
      getLinkedInputProviders: this.getLinkedInputProviders,
      updateLinkedInputProviders: this.updateLinkedInputProviders,
      setLinkedInputProviders: this.setLinkedInputProviders,
      getUpdateFuncFromInputProvider: this.getUpdateFuncFromInputProvider,
      setUpdateFuncOnInputProvider: this.setUpdateFuncOnInputProvider
    };
  }
  // Runs during the passed inputId's componentDidUpdate().

  // Overrides updateFunc for the inputId passed.
  // This will cause an infinite loop if called in a render function!
  // If used, call this method once only.
  setUpdateFuncOnInputProvider = (inputId, updateFunc) => {
    if (this.hasInputProviderId(inputId) && is.fn(updateFunc)) {
      const input = this.state.inputProviderStore[inputId];
      if (is.fn(input.setUpdateFuncOnInputProvider)) {
        input.setUpdateFuncOnInputProvider(updateFunc);
      }
    }
  };
  // Returns InputProvider's state.updateFunc.
  getUpdateFuncFromInputProvider = (inputId) => {
    if (this.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      if (is.fn(inputProvider.getUpdateFuncFromInputProvider)) {
        return inputProvider.getUpdateFuncFromInputProvider();
      }
    }
    return null;
  };
  getInputProviderValues = () => {
    const values = {};
    Object.keys(this.state.inputProviderStore).forEach((inputId) => {
      values[inputId] = this.getInputProviderValue(inputId);
    });
    return values;
  };
  getInputProviderValue = (inputId) => {
    if (this.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      return inputProvider.getOwnValue();
    }
    return null;
  };
  // Returns an array of InputProvider ids linked to the passed in inputId.
  getLinkedInputProviders = (inputId) => {
    // If the form's store has an InputProvider id matching inputId,
    // and that InputProvider has a function to check for InputProvider components linked to it,
    // return the array of InputProvider ids linked to it.
    if (this.hasInputProviderId(inputId) && is.fn(this.state.inputProviderStore[inputId].getLinkedInputProviders)) {
      return this.state.inputProviderStore[inputId].getLinkedInputProviders();
    }
    return[];
  };
  setInputProviderValue = (input, afterInputProviderSetState) => {
    if (this.hasInputProviderId(input.id)) {
      const inputProvider = this.state.inputProviderStore[input.id];
      inputProvider.setOwnValue(input.value, afterInputProviderSetState);
    }
  };
  // Used by InputProvider to set back references and link different InputProviders together.
  // Ran in InputProvider's componentDidUpdate().
  setLinkedInputProviders = (inputId, idsToLink) => {
    if (is.array(idsToLink) && !is.array.empty(idsToLink)) {
      if (this.hasInputProviderId(inputId) && is.fn(this.state.inputProviderStore[inputId].setLinkedInputProviders)) {
        this.state.inputProviderStore[inputId].setLinkedInputProviders(idsToLink);
      }
    }
  };
  // Handles updating all Inputs linked to the passed in inputId.
  updateLinkedInputProviders = (inputId) => {
    if (this.hasInputProviderId(inputId) && !is.array.empty(this.getLinkedInputProviders(inputId))) {
      const linkedInputProviders = this.getLinkedInputProviders(inputId);
      if (linkedInputProviders && !is.array.empty(linkedInputProviders)) {
        linkedInputProviders.forEach((id) => {
          const linkedInputProviderValue = this.getInputProviderValue(inputId);
          // Only update content that actually has differences. Otherwise, this will infinite loop.
          if (!deepEqual(this.getInputProviderValue(id), linkedInputProviderValue)) {
            this.setInputProviderValue({
              id,
              value: linkedInputProviderValue
            });
          }
        });
      }
    }
    return null;
  };
  // Triggered by InputProvider's componentDidUpdate, after all updating is complete.
  checkInputSyncUpdateFunctions = (inputId) => {
    if (this.hasInputProviderId(inputId) && is.array(this.state.inputProviderStore[inputId].inputSyncUpdateFunctionStore)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      inputProvider.inputSyncUpdateFunctionStore.forEach((syncFunc) => (syncFunc(inputId, this.getInputProviderValue(inputId))));
    }
    return null;
  };
  hasInputProviderId = (inputId) => Object.prototype.hasOwnProperty.call(this.state.inputProviderStore, inputId);
  updateFormState = (newState) => { this.setState(newState); };
  render() {
    return(
      <FormContext.Provider value={this.state}>
        {this.props.children}
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
