(function () {
  // Tracks the currently open popup. There can only be one.
  let activePopup = null;

  function openPopup(popupRoot) {
    closePopup();
    activePopup = popupRoot;

    activePopup.classList.add("popover--open");
    positionDialog();

    // Wait for transition to complete before focusing
    setTimeout(() => {
      const closeButton = activePopup.querySelector(".js-popover-close");
      if (closeButton) {
        closeButton.focus();
      }
    }, 250); // Wait for CSS transition to complete so that the the button is focusable

    activePopup.addEventListener("focusout", onFocusOut);
    activePopup.addEventListener("keydown", onKeyDown);
  }

  function closePopup() {
    if (activePopup) {
      const trigger = activePopup.querySelector(".js-popover-trigger");

      activePopup.removeEventListener("focusout", onFocusOut);
      activePopup.removeEventListener("keydown", onKeyDown);
      activePopup.classList.remove("popover--open");
      activePopup = null;

      // Return focus to trigger
      if (trigger) {
        trigger.focus();
      }
    }
  }

  // Closes the activePopup if the focus has moved outside of it.
  function onFocusOut(event) {
    const { relatedTarget } = event;

    // If there is not relatedTarget, focus has moved outside the page.
    if (!relatedTarget) {
      closePopup();
      return;
    }

    // if the focus has moved to another element within the active popup, do nothing.
    const positionComparison =
      activePopup.compareDocumentPosition(relatedTarget);
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
  function positionDialog() {
    const dialog = activePopup.querySelector(".js-popover-dialog");
    const caret = activePopup.querySelector(".js-popover-caret");
    const trigger = activePopup.querySelector(".js-popover-trigger");

    // Get trigger position relative to viewport
    const triggerRect = trigger.getBoundingClientRect();
    const dialogRect = dialog.getBoundingClientRect();

    // Calculate position
    const gap = 16; // Gap between trigger and dialog
    let dialogLeft =
      triggerRect.left + triggerRect.width / 2 - dialogRect.width / 2;
    const dialogTop = triggerRect.bottom + gap;

    // Viewport boundaries
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
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

    // Calculate caret position (always above dialog, centered on trigger)
    const caretLeft = triggerRect.left + triggerRect.width / 2 - 8; // 8px = half caret width
    const caretTop = dialogTop - 7; // Position caret just above dialog - overlap by 1px to merge borders

    // Apply positioning using CSS custom properties
    dialog.style.setProperty("--popover-x", `${dialogLeft}px`);
    dialog.style.setProperty("--popover-y", `${dialogTop}px`);

    if (caret) {
      caret.style.setProperty("--caret-x", `${caretLeft}px`);
      caret.style.setProperty("--caret-y", `${caretTop}px`);
    }
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
  window.addEventListener("resize", function () {
    if (activePopup) {
      positionDialog();
    }
  });

  window.addEventListener("scroll", function () {
    if (activePopup) {
      positionDialog();
    }
  });
})();
