// @ts-nocheck
/**
 * Form module.
 * @module @massds/mayflower-react/Form
 * @requires module:@massds/mayflower-assets/scss/01-atoms/forms
 * @requires module:@massds/mayflower-assets/scss/04-templates/form-page
 */
import React from 'react';
import { FormContext } from 'MayflowerReactForms/Input/context';

export interface FormProps {
  children?: React.ReactNode
}

/* eslint-disable react/no-unused-state */

const Form = (props: FormProps) => {
  const formContext = React.useContext(FormContext);
  return(
    <form className="ma__form-page" action="#">
      {typeof props.children === 'function' && props.children(formContext)}
    </form>
  );
};

export interface FormProviderProps {
  /** Controls if child Input components should hook into FormContext or not */
  isActive?: boolean
  children?: React.ReactNode
}

class FormProvider extends React.Component<FormProviderProps> {
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
export { FormProvider };
export default Form;
