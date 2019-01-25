import React from 'react';
import classNames from 'classnames';

import './style.css';
import { InputContext, FormContext } from './context';
import ErrorMessage from '../ErrorMessage';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultText,
      updateState: this.updateState,
      showError: false,
      errorMsg: this.props.errorMsg
    };
  }
  updateState = (newState) => this.setState(newState);
  render() {
    const inputLabelClasses = classNames({
      ma__label: true,
      'ma__label--hidden': (this.props.labelText && this.props.hiddenLabel),
      'ma__label--required': (this.props.labelText && this.props.required),
      'ma__label--optional': (this.props.labelText && !this.props.required)
    });
    const errorProps = {
      error: this.state.errorMsg,
      inputId: this.props.id
    };
    return(
      <InputContext.Provider value={this.state}>
        <FormContext.Consumer>
          {
            (formContext) => {
              if (formContext.isActive) {
                if (!Object.prototype.hasOwnProperty.call(formContext.value, this.props.id)) {
                  formContext.setValue({ id: this.props.id, value: this.state.value });
                } else if (formContext.value[this.props.id] !== this.state.value) {
                    formContext.setValue({ id: this.props.id, value: this.state.value });
                }
              }
            }
          }
        </FormContext.Consumer>
        <React.Fragment>
          {this.props.labelText && <label htmlFor={this.props.id} className={inputLabelClasses}>{this.props.labelText}</label>}
          {this.props.children}
          {this.state.showError && this.state.errorMsg.length > 0 && <ErrorMessage {...errorProps} />}
        </React.Fragment>
      </InputContext.Provider>
    );
  }
}

Input.contextType = InputContext;

export default Input;
