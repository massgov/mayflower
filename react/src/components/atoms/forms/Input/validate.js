// eslint-disable-next-line import/prefer-default-export
export const validNumber = (num, min, max) => {
  if (!Number.isNaN(Number(min))) {
    // Make sure the new value isn't less than the min value.
    if (num < Number(min)) {
      return{
        showError: true,
        errorMsg: `Please enter a valid number greater than or equal to ${min}.`
      };
    }
  }
  if (!Number.isNaN(Number(max))) {
    if (num > Number(max)) {
      return{
        showError: true,
        errorMsg: `Please enter a valid number less than or equal to ${max}.`
      };
    }
  }
  return{
    showError: false,
    errorMsg: ''
  };
};
