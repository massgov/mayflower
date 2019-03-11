import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import is from 'is';
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
      syncContent: this.syncContent
    };
  }
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
  setValue = (input, afterUpdate) => {
    if (Object.prototype.hasOwnProperty.call(this.state.value, input.id)) {
      this.state.value[input.id].setValue(input.value, afterUpdate);
    }
  };
  syncContent = (inputId) => {
    if (this.hasId(inputId) && !is.empty(this.state.value[inputId].syncContent)) {
      return this.state.value[inputId].syncContent.forEach((syncFunc) => (syncFunc(this.getValue(inputId))));
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
