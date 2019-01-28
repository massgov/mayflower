import React from 'react';

import './style.css';
import { InputContext } from './context';
import ErrorMessage from '../ErrorMessage';

class Error extends React.Component {
  displayErrorMessage = (inputContext) => {
    const errorProps = {
      error: inputContext.errorMsg,
      inputId: this.props.id
    };
    if (inputContext.showError && inputContext.errorMsg.length > 0) {
      return<ErrorMessage {...errorProps} />;
    }
    return null;
  };
  render() {
    return(
      <InputContext.Consumer>
        {
          this.displayErrorMessage
        }
      </InputContext.Consumer>
    );
  }
}

Error.contextType = InputContext;

export default Error;
