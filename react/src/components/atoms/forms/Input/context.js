import React from 'react';

export const InputContext = React.createContext({
  value: null,
  updateState: () => {},
  showError: null
});
