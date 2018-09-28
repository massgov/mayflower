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
};

// For FilterBox component.
export const validateFilters = (
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
      if (typeof child.class !== 'string') {
        return false;
      }
      if (!child.component) {
        return false;
      }
      if (typeof child.component.type === 'string') {
        return componentTypes.indexOf(child.component.type) > -1;
      }
      return child.component.type.name &&
          componentTypes.indexOf(child.component.type.name) > -1;
    });
  };
  if (!component || (component && !isValid(component))) {
    return new Error(`Invalid prop ${propName} supplied to ${componentName}. Got: ${component || 'undefined'}. Validation failed.`);
  }
};

export default componentPropTypeCheck;
