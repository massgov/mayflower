import React from 'react';
import useEventListener from 'MayflowerReactComponents/hooks/use-event-listener';

const useWindowWidth = () => {
  const windowWidth = React.useRef(window ? window.innerWidth : null);
  const resize = React.useCallback(() => {
    windowWidth.current = window.innerWidth;
  }, []);
  useEventListener('resize', resize, { current: window });

  return windowWidth;
};
export default useWindowWidth;
