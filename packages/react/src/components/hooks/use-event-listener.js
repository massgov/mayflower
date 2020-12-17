import React from 'react';

const useEventListener = (eventName, handler, element) => {
  // Create a ref that stores handler.
  const savedHandler = React.useRef();
  const savedEventName = React.useRef();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    savedEventName.current = eventName;
  }, [eventName]);

  React.useEffect(() => {
    // Make sure element supports addEventListener.
    const elementRef = element;
    const isSupported = elementRef && elementRef.addEventListener;
    if (!isSupported) {
      return;
    }
    // Create event listener that calls handler function stored in ref.
    const eventListener = (event) => savedHandler.current(event);
    // Add event listener.
    elementRef.addEventListener(savedEventName.current, eventListener);
    // Remove event listener on cleanup.
    // eslint-disable-next-line consistent-return
    return(() => {
      if (elementRef) {
        elementRef.removeEventListener(savedEventName.current, eventListener);
      }
    });
  }, [element]);
};
export default useEventListener;
