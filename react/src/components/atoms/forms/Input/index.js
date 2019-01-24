import React from 'react';
import classNames from 'classnames';

import test from './style.css';
import { InputContext } from './context';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.defaultText,
      updateState: (newState) => this.setState(newState),
      showError: false,
      errorMsg: this.props.errorMsg
    };
  }
  render() {
    console.log(test);
    const inputLabelClasses = classNames({
      ma__label: true,
      'ma__label--hidden': (this.props.labelText && this.props.hiddenLabel),
      'ma__label--required': (this.props.labelText && this.props.required),
      'ma__label--optional': (this.props.labelText && !this.props.required)
    });
    return(
      <InputContext.Provider value={this.state}>
        <React.Fragment>
          {this.props.labelText && <label htmlFor={this.props.id} className={inputLabelClasses}>{this.props.labelText}</label>}
          {this.props.children}
          {this.state.showError && this.props.errorMsg.length > 0 && <div className="ma__input-error-msg">{this.state.errorMsg}</div>}
        </React.Fragment>
      </InputContext.Provider>
    );
  }
}

Input.contextType = InputContext;

export default Input;
