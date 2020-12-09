import React from 'react';
import useEventListener from 'MayflowerReactComponents/hooks/use-event-listener';

const useWindowWidth = () => {
  // We use state here so that a default can be set based on window,
  // if window exists.
  const [windowWidth, setWindowWidth] = React.useState(null);

  const resize = React.useCallback(() => {
    if (window) {
      setWindowWidth(window.innerWidth);
    }
  }, [setWindowWidth]);
  React.useEffect(() => {
    // Set default windowWidth to window.innerwidth if window exists.
    if (window) {
      setWindowWidth(window.innerWidth);
      // Update windowWidth on window resize.
      window.addEventListener('resize', resize);
    }
    return(() => {
      if (window) {
        // Remove resize event on unmount of component.
        window.removeEventListener('resize', resize);
      }
    });
  }, [resize, setWindowWidth]);
  return windowWidth;
};
export default useWindowWidth;
