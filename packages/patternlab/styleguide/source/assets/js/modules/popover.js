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

  // Adjusts the position of the popup to be in the viewport, if needed.
  function ensurePositioning() {
    const dialog = activePopup.querySelector(".js-popover-dialog");
    dialog.style.translate = "";
    const position = dialog.getBoundingClientRect();

    if (position.left < 0) {
      const overflow = Math.abs(position.left);
      dialog.style.translate = `calc(-50% + 1rem + ${overflow}px) 0`;
    }

    if (position.right > document.documentElement.clientWidth) {
      const overflow = position.right - document.documentElement.clientWidth;
      dialog.style.translate = `calc(-50% - 1rem - ${overflow}px) 0`;
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
})();
