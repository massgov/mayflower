(function() {

  // Tracks the currently open popup. There can only be one.
  let activePopup = null;

  // Applies classes & modifies aria attributes to open the popup
  function openPopup(popupRoot) {
    closePopup();
    activePopup = popupRoot;
    
    // Add the open class first
    activePopup.classList.add("popover--open");
    
    // Position after the element is visible
    requestAnimationFrame(() => {
      ensurePositioning();
      activePopup.querySelector(".js-popover-close").focus();
    });
    
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

  // Positions the popover relative to the trigger using fixed positioning
  function ensurePositioning() {
    const dialog = activePopup.querySelector(".js-popover-dialog");
    const caret = activePopup.querySelector(".js-popover-caret");
    const trigger = activePopup.querySelector(".js-popover-trigger");
    
    // Get trigger position relative to viewport
    const triggerRect = trigger.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();
    
    // Calculate preferred position (centered below trigger)
    const gap = 16; // Gap between trigger and dialog
    let dialogLeft = triggerRect.left + (triggerRect.width / 2) - (dialogRect.width / 2);
    let dialogTop = triggerRect.bottom + gap;
    
    // Viewport boundaries
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollY: window.scrollY
    };
    
    const margin = 16; // Margin from viewport edges
    
    // Horizontal positioning - keep within viewport
    const minLeft = margin;
    const maxLeft = viewport.width - dialogRect.width - margin;
    
    if (dialogLeft < minLeft) {
      dialogLeft = minLeft;
    } else if (dialogLeft > maxLeft) {
      dialogLeft = maxLeft;
    }
    
    // Vertical positioning - flip if no space below
    const spaceBelow = viewport.height - (triggerRect.bottom + gap);
    const spaceAbove = triggerRect.top - gap;
    
    let caretTop = dialogTop - 8; // Position caret just above dialog
    let flipped = false;
    
    if (dialogRect.height > spaceBelow && spaceAbove > spaceBelow) {
      // Flip to above trigger
      dialogTop = triggerRect.top - dialogRect.height - gap;
      caretTop = triggerRect.top - 8; // Position caret just below trigger
      flipped = true;
      
      // Update transform origin for flipped state
      dialog.style.transformOrigin = 'bottom center';
    } else {
      // Keep below trigger
      dialog.style.transformOrigin = 'top center';
      
      // If still doesn't fit, adjust max-height
      if (dialogTop + dialogRect.height > viewport.height - margin) {
        const maxHeight = viewport.height - dialogTop - margin;
        dialog.style.maxHeight = `${maxHeight}px`;
        dialog.style.overflowY = 'auto';
      }
    }
    
    // Calculate caret position (always centered on trigger)
    const caretLeft = triggerRect.left + (triggerRect.width / 2) - 8; // 8px = half caret width
    
    // Apply positioning using CSS custom properties
    dialog.style.setProperty('--popover-x', `${dialogLeft}px`);
    dialog.style.setProperty('--popover-y', `${dialogTop}px`);
    
    if (caret) {
      caret.style.setProperty('--caret-x', `${caretLeft}px`);
      caret.style.setProperty('--caret-y', `${caretTop}px`);
      
      // Flip caret if dialog is flipped
      if (flipped) {
        caret.style.rotate = '135deg'; // Point upward
        caret.style.clipPath = 'polygon(0 100%, 100% 0, 0 0)';
      } else {
        caret.style.rotate = '-45deg'; // Point downward
        caret.style.clipPath = 'polygon(0 0, 100% 100%, 100% 0)';
      }
    }
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

  // Reposition on window resize and scroll
  window.addEventListener('resize', function() {
    if (activePopup) {
      ensurePositioning();
    }
  });
  
  window.addEventListener('scroll', function() {
    if (activePopup) {
      ensurePositioning();
    }
  });
})();
