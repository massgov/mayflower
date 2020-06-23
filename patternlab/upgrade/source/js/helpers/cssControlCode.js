// check the value of the css :before psuedo element
// values look for "true" or "false"

export default ($el) => {
  let value = "true";
  try {
    value = window.getComputedStyle($el[0], ':before').getPropertyValue('content').replace(/\"/g, '');
  } catch(err) {}
  return value === "false" ? false : true;
};
