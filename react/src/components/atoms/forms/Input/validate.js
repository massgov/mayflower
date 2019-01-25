import React from 'react';

export const validNumber = (num, min, max, erroMsg) => {
  if (!Number.isNaN(Number(min))) {
    // Make sure the new value isn't less than the min value.
    if (num < Number(min)) {
      errorMsg = `Please enter a valid greater than or equal to ${min}.`;
      return false;
    }
  }
  if (!Number.isNaN(Number(max))) {
    if (num > Number(max)) {
      errorMsg = `Please enter a valid less than or equal to ${max}.`;
      return false;
    }
  }
  return true;
};
