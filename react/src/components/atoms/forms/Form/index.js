import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import is from 'is';
import deepEqual from 'fast-deep-equal';
import { FormContext } from '../Input/context';

const Form = (props) => {
  const formContext = useContext(FormContext);
  return(
    <form className="ma__form-page" action="#">
      {props.children(formContext)}
    </form>
  );
};

class FormProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
      value: {},
      getValue: this.getValue,
      hasId: this.hasId,
      setValue: this.setValue,
      updateState: this.updateState,
      getValues: this.getValues,
      syncContent: this.syncContent,
      getLinkedContent: this.getLinkedContent,
      updateLinkedContent: this.updateLinkedContent,
      setLinkedContent: this.setLinkedContent,
      onUpdate: this.onUpdate,
      getUpdateFunc: this.getUpdateFunc,
      setUpdateFunc: this.setUpdateFunc
    };
  }
  // Runs during the passed inputId's componentDidUpdate().
  onUpdate = (inputId) => {
    if (this.hasId(inputId)) {
      const updateFunc = this.getUpdateFunc(inputId);
      if (is.fn(updateFunc)) {
        updateFunc(this.getValue(inputId));
      }
    }
  };
  // Overrides updateFunc for the inputId passed.
  // This will cause an infinite loop if called in a render function!
  // If used, call this method once only.
  setUpdateFunc = (inputId, updateFunc) => {
    if (this.hasId(inputId) && is.fn(updateFunc)) {
      const input = this.state.value[inputId];
      if (is.fn(input.setUpdateFunc)) {
        input.setUpdateFunc(updateFunc);
      }
    }
  };
  // Returns InputProvider's state.updateFunc.
  getUpdateFunc = (inputId) => {
    if (this.hasId(inputId)) {
      const input = this.state.value[inputId];
      if (is.fn(input.getUpdateFunc)) {
        return input.getUpdateFunc();
      }
    }
    return null;
  };
  getValues = () => {
    const values = {};
    Object.keys(this.state.value).forEach((inputId) => {
      values[inputId] = this.getValue(inputId);
    });
    return values;
  };
  getValue = (inputId) => {
    if (this.hasId(inputId)) {
      return this.state.value[inputId].getValue();
    }
    return null;
  };
  // Returns InputProvider's state.linkedContent array.
  getLinkedContent = (inputId) => {
    if (this.hasId(inputId) && is.fn(this.state.value[inputId].getLinkedContent)) {
      return this.state.value[inputId].getLinkedContent();
    }
    return[];
  };
  setValue = (input, afterUpdate) => {
    if (this.hasId(input.id)) {
      this.state.value[input.id].setValue(input.value, afterUpdate);
    }
  };
  // Used by InputProvider to set back references and link different InputProviders together.
  // Ran in InputProvider's componentDidUpdate().
  setLinkedContent = (inputId, idsToLink) => {
    if (is.array(idsToLink) && !is.array.empty(idsToLink)) {
      if (this.hasId(inputId) && is.fn(this.state.value[inputId].setLinkedContent)) {
        this.state.value[inputId].setLinkedContent(idsToLink);
      }
    }
  };
  // Handles updating all Inputs linked to the passed in inputId.
  updateLinkedContent = (inputId) => {
    if (this.hasId(inputId) && !is.empty(this.getLinkedContent(inputId))) {
      const linkedContent = this.getLinkedContent(inputId);
      const skippedIds = [];
      if (linkedContent && !is.array.empty(linkedContent)) {
        linkedContent.forEach((id) => {
          const overrideFunc = this.state.value[id].getOverrideLink();
          const value = this.getValue(inputId);
          // Skip processing any Input with overrides.
          if (is.fn(overrideFunc)) {
            skippedIds.push(id);
            return;
          } else if (!deepEqual(this.getValue(id), value)) {
            // Only update content that actually has differences. Otherwise, this will infinite loop.
            this.setValue({
              id,
              value
            });
          }
        });
        skippedIds.forEach((id) => {
          const overrideFunc = this.state.value[id].getOverrideLink();
          const value = overrideFunc(this.getValue(inputId));
          // Checking for differences between the newly overriden value and the previous (if any) overriden value.
          if (!deepEqual(value, overrideFunc(this.getValue(id)))) {
            this.setValue({
              id,
              value
            });
          }
        });
      }
    }
    return null;
  };
  // Triggered by inputId's componentDidUpdate, after all updating is complete.
  syncContent = (inputId) => {
    if (this.hasId(inputId) && is.array(this.state.value[inputId].syncContent)) {
      this.state.value[inputId].syncContent.forEach((syncFunc) => (syncFunc(inputId, this.getValue(inputId))));
    }
    return null;
  };
  hasId = (inputId) => Object.prototype.hasOwnProperty.call(this.state.value, inputId);
  updateState = (newState) => { this.setState(newState); };
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
