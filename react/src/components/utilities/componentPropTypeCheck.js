const componentPropTypeCheck = (props, propName, componentName, componentString) => {
  const component = props[propName];
  const isValid = (comp) => {
    if (typeof comp.type === 'string') {
      return comp.type === componentString;
    }
    return comp.type.name && comp.type.name === componentString;
  };
  if (!isValid(component)) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
  }
};

export default componentPropTypeCheck;
