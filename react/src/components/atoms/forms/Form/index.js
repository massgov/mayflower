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
      getOverriddenInputProviderValue: this.getOverriddenInputProviderValue,
      getInputProviderRef: this.getInputProviderRef,
      getInputProviderValue: this.getInputProviderValue,
      hasInputProviderId: this.hasInputProviderId,
      hasInputProviderIds: this.hasInputProviderIds,
      setInputProviderValue: this.setInputProviderValue,
      updateFormState: this.updateFormState,
      forceInputProviderUpdate: this.forceInputProviderUpdate,
      getInputProviderValues: this.getInputProviderValues,
      checkInputSyncUpdateFunctions: this.checkInputSyncUpdateFunctions,
      getLinkedInputProviders: this.getLinkedInputProviders,
      updateLinkedInputProviders: this.updateLinkedInputProviders,
      setLinkedInputProviders: this.setLinkedInputProviders
    };
  }
  // Returns a react ref back to the input element rendered by the InputProvider whose id matches inputId.
  getInputProviderRef = (inputId) => {
    if (this.state.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      if (inputProvider.selfRef) {
        return inputProvider.selfRef;
      }
    }
    return null;
  };
  // Gets the value that would be set to the InputProvider by its own overrideLinkedValue function.
  getOverriddenInputProviderValue = (inputId) => {
    if (this.state.hasInputProviderId(inputId)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      if (is.fn(inputProvider.getOwnOverrideLinkedValueFunc)) {
        return inputProvider.getOwnOverrideLinkedValueFunc;
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
  // Returns an array of InputProvider ids linked to the passed in inputId.
  getLinkedInputProviders = (inputId) => {
    // If the form's store has an InputProvider id matching inputId,
    // and that InputProvider has a function to check for InputProvider components linked to it,
    // return the array of InputProvider ids linked to it.
    let values = [];
    if (this.state.hasInputProviderId(inputId)) {
      Object.keys(this.state.inputProviderStore)
        .forEach((id) => {
          if (this.state.hasInputProviderId(id) && is.fn(this.state.inputProviderStore[id].getOwnLinkedInputProviders)) {
            const linkedProviders = this.state.inputProviderStore[id].getOwnLinkedInputProviders();
            if (!is.array.empty(linkedProviders)) {
              if (linkedProviders.indexOf(inputId) > -1) {
                // Pull the inputId we're requesting providers for out of the list.
                values = values.concat(linkedProviders.filter((p) => p !== inputId));
                values.push(id);
              } else if (inputId === id) {
                // The component that contains props.linkedInputProviders updates doesn't list itself as a linked InputProvider, so handle that case here.
                values = values.concat(linkedProviders);
              }
            }
          }
        });
    }
    return values;
  };
  // Sets an InputProvider's value.
  setInputProviderValue = (input, afterInputProviderSetState) => {
    if (this.state.hasInputProviderId(input.id)) {
      const inputProvider = this.state.inputProviderStore[input.id];
      inputProvider.setOwnValue(input.value, afterInputProviderSetState);
    }
  };
  // Used by InputProvider to set back references and link different InputProviders together.
  // Ran in InputProvider's componentDidUpdate().
  setLinkedInputProviders = (inputId, idsToLink) => {
    if (is.array(idsToLink) && !is.array.empty(idsToLink)) {
      if (this.state.hasInputProviderId(inputId) && is.fn(this.state.inputProviderStore[inputId].setOwnLinkedInputProviders)) {
        this.state.inputProviderStore[inputId].setOwnLinkedInputProviders(idsToLink);
      }
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
  // Handles updating all Inputs linked to the passed in inputId.
  updateLinkedInputProviders = (inputId) => {
    const linkedInputProviders = this.state.getLinkedInputProviders(inputId);
    if (!is.array.empty(linkedInputProviders)) {
      // This is used to track current and changing values.
      const currentValues = this.state.getInputProviderValues();
      linkedInputProviders.forEach((id) => {
        const linkedInputProviderValue = currentValues[inputId];
        if (is.fn(this.state.getOverriddenInputProviderValue(id))) {
          const override = this.state.getOverriddenInputProviderValue(id)(inputId, linkedInputProviderValue);
          // Only update content that actually has differences. Otherwise, this will infinite loop.
          if (!deepEqual(override, this.state.getInputProviderValue(id))) {
            currentValues[id] = override;
          }
        } else if (!deepEqual(this.state.getInputProviderValue(id), linkedInputProviderValue)) {
          currentValues[id] = linkedInputProviderValue;
        }
      });
      linkedInputProviders.forEach((id) => {
        this.state.setInputProviderValue({
          id,
          value: currentValues[id]
        });
      });
    }
    return null;
  };
  // Ran during InputProvider's componentDidUpdate, after all updating is complete.
  // This function triggers updates to InputSync components watching for the passed in inputId, if any.
  checkInputSyncUpdateFunctions = (inputId) => {
    if (this.state.hasInputProviderId(inputId) && is.array(this.state.inputProviderStore[inputId].inputSyncUpdateFunctionStore)) {
      const inputProvider = this.state.inputProviderStore[inputId];
      inputProvider.inputSyncUpdateFunctionStore.forEach((syncFunc) => (syncFunc(inputId, this.state.getInputProviderValue(inputId))));
    }
    return null;
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
