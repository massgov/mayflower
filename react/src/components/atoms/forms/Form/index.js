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
        updateFunc(inputId, this.getValue(inputId));
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
  getLinkedContent = (inputId) => {
    const { value } = this.state;
    if (this.hasId(inputId) && Object.prototype.hasOwnProperty.call(value[inputId], 'getLinkedContent')) {
      return this.state.value[inputId].getLinkedContent();
    }
    return[];
  };
  setValue = (input, afterUpdate) => {
    if (Object.prototype.hasOwnProperty.call(this.state.value, input.id)) {
      this.state.value[input.id].setValue(input.value, afterUpdate);
    }
  };
  setLinkedContent = (inputId, idsToLink) => {
    if (is.array(idsToLink) && !is.empty(idsToLink)) {
      if (this.hasId(inputId) && is.fn(this.state.value[inputId].setLinkedContent)) {
        this.state.value[inputId].setLinkedContent(idsToLink);
      }
    }
  };
  updateLinkedContent = (inputId) => {
    if (this.hasId(inputId) && !is.empty(this.getLinkedContent(inputId))) {
      const linkedContent = this.getLinkedContent(inputId);
      if (linkedContent && !is.empty(linkedContent)) {
        linkedContent.forEach((id) => {
          if (!deepEqual(this.getValue(id), this.getValue(inputId))) {
            this.setValue({
              id,
              value: this.getValue(inputId)
            });
          }
        });
      }
    }
    return null;
  };
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
