// @ts-nocheck
import React from 'react';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';
import { InputContext } from 'MayflowerReactForms/Input/context';

export interface ErrorProps {
  id?: string
}

class Error extends React.Component<ErrorProps> {
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
