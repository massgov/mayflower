import React from 'react';
import useEventListener from 'MayflowerReactComponents/hooks/use-event-listener';
import useWindowWidth from 'MayflowerReactComponents/hooks/use-window-width';

export function mainNavReducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case 'setButtonExpanded': {
      if (newState.items[action.index]) {
        newState.items[action.index] = {
          ...newState.items[action.index],
          buttonExpanded: action.status
        };
      }
      break;
    }
    case 'setIsOpen': {
      if (action.status) {
        newState.isOpen = action.status;
      }
      break;
    }
    case 'setIsItemOpen': {
      if (newState.items[action.index]) {
        newState.items[action.index] = {
          ...newState.items[action.index],
          isOpen: action.status
        };
      }
      break;
    }
    case 'hide': {
      newState.items = newState.items.map(() => ({
        buttonExpanded: false,
        isOpen: false
      }));
      newState.isOpen = false;
      if (Object.prototype.hasOwnProperty.call(action, 'index') && newState.items[action.index]) {
        newState.items[action.index] = { buttonExpanded: true, isOpen: true };
      }
      break;
    }
    case 'show': {
      if (Object.prototype.hasOwnProperty.call(action, 'index') && state.items[action.index]) {
        newState.items[action.index] = {
          buttonExpanded: true,
          isOpen: true
        };
      }
      newState.isOpen = true;
      break;
    }
    default:
      return newState;
  }
  return newState;
}

export const initMainNavState = (items) => {
  const initialList = {
    isOpen: false,
    items: items.map(() => ({
      buttonExpanded: false,
      isOpen: false
    }))
  };
  return initialList;
};

// Custom hook that sets up the Header's MainNav context.
// This isn't placed in the hooks file because it uses mainNavReducer.
export const useHeaderMainNav = (items) => {
  const windowWidth = useWindowWidth();
  const breakpoint = 840;
  const [state, dispatch] = React.useReducer(mainNavReducer, items, initMainNavState);
  const setButtonExpanded = React.useCallback(({ index, status }) => {
    dispatch({ type: 'setButtonExpanded', index, status });
  }, []);
  const setIsOpen = React.useCallback(({ index, status }) => {
    dispatch({ type: 'setIsItemOpen', index, status });
  }, []);

  // Hides all Nav Items. If you pass an object with an index key,
  // all nav items except the one that matches the index will be hidden.

  const hide = React.useCallback((options = {}) => {
    const { index = undefined } = options;
    if (windowWidth) {
      const body = document.querySelector('body');
      const submenuClass = 'show-submenu';
      body.classList.remove(submenuClass);
      if (windowWidth <= breakpoint) {
        dispatch({ type: 'hide', index, status: false });
      } else {
        // @todo animate here!
        dispatch({ type: 'hide', index, status: false });
      }
    }
  }, [windowWidth]);

  // Shows the NavItem with the passed index number.
  const show = React.useCallback((options = {}) => {
    const { index } = options;
    const body = document.querySelector('body');
    const submenuClass = 'show-submenu';
    body.classList.add(submenuClass);

    if (windowWidth <= breakpoint) {
      dispatch({ type: 'show', index });
    } else {
      // @todo animate here!
      dispatch({ type: 'show', index });
    }
  }, [windowWidth]);
  // Restrict the available functionality for NavItem components to the following.
  return React.useMemo(() => ({
    ...state,
    setButtonExpanded,
    setIsOpen,
    hide,
    show
  }), [state]);
};

export const useHeaderNavKeydown = (element, onKeyDown) => {
  useEventListener('keydown', onKeyDown, element);
};
export const useHeaderNavMouseEvents = (element, onMouseEnter, onMouseLeave) => {
  useEventListener('mouseenter', onMouseEnter, element);
  useEventListener('mouseleave', onMouseLeave, element);
};
export const useHeaderNavButtonEffects = (element, onClick) => {
  useEventListener('click', onClick, element);
};
