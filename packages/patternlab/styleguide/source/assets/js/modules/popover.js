(function() {

  // Tracks the currently open popup. There can only be one.
  let activePopup = null;

  // Applies classes & modifies aria attributes to open the popup
  function openPopup(popupRoot) {
    closePopup();
    activePopup = popupRoot;
    ensurePositioning();
    activePopup.classList.add("popover--open");
    activePopup.querySelector(".js-popover-close").focus();
    activePopup.addEventListener("focusout", onFocusOut);
    activePopup.addEventListener("keydown", onKeyDown);
  }

  // Removes classes & modifies aria attributes to close the popup
  function closePopup() {
    if (activePopup) {
      activePopup.removeEventListener("focusout", onFocusOut);
      activePopup.removeEventListener("keydown", onKeyDown);
      activePopup.classList.remove("popover--open");
      activePopup = null;
    }
  }

  // Closes the activePopup if the focus has moved outside of it.
  function onFocusOut(event) {
    const {relatedTarget} = event;

    // If there is not relatedTarget, focus has moved outside the page.
    if (!relatedTarget) {
      closePopup();
    }

    // if the focus has moved to another element within the active popup, do nothing.
    const positionComparison = activePopup.compareDocumentPosition(relatedTarget);
    // eslint-disable-next-line no-bitwise
    if (positionComparison & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return;
    }

    // Otherwise, focus has moved to another element outside the popup.
    closePopup();
  }

  // Closes the activePopup if the escape key is pressed
  function onKeyDown(event) {
    switch (event.key) {
      case "Escape":
        activePopup.querySelector(".js-popover-trigger").focus();
        closePopup();
        break;

      // Popovers are designed for plain-text only, so we can prevent tabbing
      // off of the close button.
      case "Tab":
        event.preventDefault();
        break;

      default:
        break;
    }
  }

  // Adjusts the position of the popup to be in the viewport and within containers
  function ensurePositioning() {
    const dialog = activePopup.querySelector(".js-popover-dialog");
    dialog.style.translate = "";
    dialog.style.maxWidth = "";
    
    const position = dialog.getBoundingClientRect();
    
    // Find the closest scrollable container or table
    const container = findConstrainingContainer(activePopup);
    const containerRect = container ? container.getBoundingClientRect() : {
      left: 0,
      right: document.documentElement.clientWidth,
      width: document.documentElement.clientWidth
    };

    // Calculate available space
    const availableWidth = containerRect.width - 32; // 16px padding on each side
    const popoverWidth = Math.min(position.width, availableWidth);
    
    // Set max width if popover is wider than container
    if (position.width > availableWidth) {
      dialog.style.maxWidth = `${availableWidth}px`;
    }

    // Check horizontal positioning relative to container
    const leftOverflow = position.left - containerRect.left;
    const rightOverflow = position.right - containerRect.right;

    let translateX = "-50%"; // Default center alignment

    if (leftOverflow < 16) {
      // Too far left, align to container left edge with padding
      const adjustment = Math.abs(leftOverflow) + 16;
      translateX = `calc(-50% + ${adjustment}px)`;
    } else if (rightOverflow > -16) {
      // Too far right, align to container right edge with padding
      const adjustment = rightOverflow + 16;
      translateX = `calc(-50% - ${adjustment}px)`;
    }

    // Also check viewport boundaries as fallback
    if (position.left < 0) {
      const overflow = Math.abs(position.left);
      translateX = `calc(-50% + 1rem + ${overflow}px)`;
    }

    if (position.right > document.documentElement.clientWidth) {
      const overflow = position.right - document.documentElement.clientWidth;
      translateX = `calc(-50% - 1rem - ${overflow}px)`;
    }

    dialog.style.translate = `${translateX} 0`;
  }

  // Find the closest constraining container (table, scrollable element, etc.)
  function findConstrainingContainer(element) {
    let parent = element.parentElement;
    
    while (parent && parent !== document.body) {
      const style = window.getComputedStyle(parent);
      
      // Check if it's a table or has overflow constraints
      if (
        parent.tagName === 'TABLE' ||
        parent.classList.contains('ma__table--responsive') ||
        parent.classList.contains('dataTable') ||
        style.overflow === 'auto' ||
        style.overflow === 'scroll' ||
        style.overflowX === 'auto' ||
        style.overflowX === 'scroll'
      ) {
        return parent;
      }
      
      parent = parent.parentElement;
    }
    
    return null;
  }

  // Handles opening and closing the popup on mouse/pointer/keyboard clicks.
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("js-popover-trigger")) {
      const popupRoot = event.target.closest(".popover");
      if (activePopup === popupRoot) {
        closePopup();
      } else {
        openPopup(popupRoot);
      }
    }
    if (event.target.classList.contains("js-popover-close")) {
      activePopup.querySelector(".js-popover-trigger").focus();
      closePopup();
    }
  });

  // Reposition on window resize
  window.addEventListener('resize', function() {
    if (activePopup) {
      ensurePositioning();
    }
  });
})();
