import React from 'react';

// eslint-disable-next-line import/prefer-default-export
export const InputContext = React.createContext({

});
export const FormContext = React.createContext({
  isActive: false,
  value: {},
  setValue: () => {}
});
