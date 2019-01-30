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
      disabled: this.props.disabled,
      inline: true
    };
  }
  render() {
    const inputClasses = classNames({
      'ma__input-group--inline': this.state.inline
    });
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
        <div className={inputClasses}>
          {this.props.labelText && <label htmlFor={this.props.id} className={inputLabelClasses}>{this.props.labelText}</label>}
          <div className="ma__input-group-right">
            {this.props.children}
            {this.state.showError && this.state.errorMsg && this.state.errorMsg.length > 0 && <ErrorMessage {...errorProps} />}
          </div>
        </div>
      </InputContext.Provider>
    );
  }
}

Input.contextType = InputContext;

export default Input;
