import React from 'react';

export const useEventListener = (eventName, handler, elementRef) => {
  // Create a ref that stores handler.
  const savedHandler = React.useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const element = elementRef.current;
    // Make sure element supports addEventListener.
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }
    // Create event listener that calls handler function stored in ref.
    const eventListener = (event) => savedHandler.current(event);
    // Add event listener.
    element.addEventListener(eventName, eventListener);
    // Remove event listener on cleanup.
    // eslint-disable-next-line consistent-return
    return(() => {
      if (elementRef.current) {
        elementRef.current.removeEventListener(eventName, eventListener);
      }
    });
  }, [eventName, elementRef]);
};

export const useWindowWidth = () => {
  const windowWidth = React.useRef(window ? window.innerWidth : null);
  const resize = React.useCallback(() => {
    windowWidth.current = window.innerWidth;
  }, []);
  useEventListener('resize', resize, { current: window });

  return windowWidth;
};
