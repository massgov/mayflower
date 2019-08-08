// Any component PropType validation that uses these check functions must RETURN the result of the call.
// Ex: return componentPropTypeCheck(props, propName, 'MyComponentName');

const componentPropTypeCheck = (props, propName, componentName, componentString) => {
  const component = props[propName];
  const isValid = (comp) => {
    if (typeof comp.type === 'string') {
      return comp.type === componentString;
    }
    return comp.type.name && comp.type.name === componentString;
  };
  if (!component || (component && !isValid(component))) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component.type.name}. Validation failed.`);
  }
  return new Error('Validation error.');
};

export const componentArrayPropTypeCheck = (
  props,
  propName,
  componentName,
  componentTypes,
) => {
  const component = props[propName];
  const isValid = (comp) => {
    if (!comp) {
      return false;
    }
    if (!Array.isArray(comp)) {
      return false;
    }
    return comp.every((child) => {
      if (!child) {
        return false;
      }
      if (typeof child.type === 'string') {
        return componentTypes.indexOf(child.type) > -1;
      }
      return child.type.name &&
        componentTypes.indexOf(child.type.name) > -1;
    });
  };
  if (!component || (component && !isValid(component))) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component || 'undefined'}. Validation failed.`);
  }
  return true;
};

export default componentPropTypeCheck;

export const numberCharacterPropTypeCheck = (props, propName, number) => {
  const prop = props[propName];
  if (typeof prop !== 'string' || prop.length > number) {
    return new Error(`${propName} needs to be a string of less than or equal to ${number} characters.`);
  }
  return true;
};
