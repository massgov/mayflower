// Any component PropType validation that uses these check functions must RETURN the result of the call.
// Ex: return componentPropTypeCheck(props, propName, 'MyComponentName');

// eslint-disable-next-line import/prefer-default-export
export const numberCharacterPropTypeCheck = (props, propName, number) => {
  const prop = props[propName];
  if (typeof prop !== 'string' || prop.length > number) {
    return new Error(`${propName} needs to be a string of less than or equal to ${number} characters.`);
  }
  return true;
};
