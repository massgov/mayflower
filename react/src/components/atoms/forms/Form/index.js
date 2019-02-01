import React, { Component } from 'react';
import { FormContext } from '../Input/context';

const Form = (props) => (
  <FormContext.Consumer>
    {
        (formContext) => (
          <form className="ma__form-page" action="#">
            {props.children(formContext)}
          </form>
          )
      }
  </FormContext.Consumer>
);

export class FormProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isActive,
      value: {},
      getValue: this.getValue,
      hasId: this.hasId,
      setValue: this.setValue,
      updateState: this.updateState,
      getValues: this.getValues
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

FormProvider.contextType = FormContext;

export default Form;
