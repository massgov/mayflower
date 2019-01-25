import React from 'react';
import classNames from 'classnames';

import './style.css';
import { InputContext } from './context';
import ErrorMessage from '../ErrorMessage';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultValue,
      updateState: (newState) => this.setState(newState),
      showError: false,
      errorMsg: this.props.errorMsg,
      disabled: this.props.disabled
    };
  }
  render() {
    const inputLabelClasses = classNames({
      ma__label: true,
      'ma__label--hidden': (this.props.labelText && this.props.hiddenLabel),
      'ma__label--required': (this.props.labelText && this.props.required),
      'ma__label--optional': (this.props.labelText && !this.props.required),
      'ma__label--disabled': (this.props.labelText && this.props.disabled)
    });
    const errorProps = {
      error: this.state.errorMsg,
      inputId: this.props.id
    };
    return(
      <InputContext.Provider value={this.state}>
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
