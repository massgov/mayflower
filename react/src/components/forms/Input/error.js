import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from 'MayflowerReactForms/ErrorMessage';
import { InputContext } from 'MayflowerReactForms/Input/context';

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

Error.propTypes = {
  id: PropTypes.string
};

Error.contextType = InputContext;

export default Error;
