import React, { useContext } from 'react';

import './style.css';
import { InputContext } from './context';
import ErrorMessage from '../ErrorMessage';

const Error = (props) => {
  const inputContext = useContext(InputContext);
  const errorProps = {
    error: inputContext.errorMsg,
    inputId: props.id
  };
  if (inputContext.showError && inputContext.errorMsg.length > 0) {
    return<ErrorMessage {...errorProps} />;
  }
  return null;
};

export default Error;
