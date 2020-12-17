const getFallbackComponent = (Component, Fallback) => {
  if (typeof Component === 'undefined') {
    return Fallback;
  }
  return Component;
};

export default getFallbackComponent;
