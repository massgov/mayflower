/**
 * focusTrapping: Trap keyboard focus inside of a modal
 * @param {string} focusableSelectors(required): css selectors for all the focusable elements inside of the modal
 * @param {string} modalSelector(optional): css selector for the modal container
 * @param {Element} modalElement(optional): modal root element; takes precedence over modalSelector
 * @param {string} closeButtonSelector(optional): If the modal close button is outside of the modal container, add the css selector for it to be included as the first focusable element
 * @param {event} keyEvent(required): keydown event
 */

// check if an element is visibly displayed using computed style
const isDisplayed = (el) => {
  const style = window.getComputedStyle(el);
  return style.display !== "none" && style.visibility !== "hidden";
};

/**
 * Browsers omit descendants of aria-hidden / inert / hidden from the tab order, but they can still match
 * querySelector and look "displayed" to getComputedStyle. Excluding them keeps first/last aligned with Tab
 * (e.g. narrow utility accordions in the hamburger menu at ≤940px).
 */
const isAccessibilityHiddenSubtree = (el, modalRoot) => {
  let node = el;
  while (node && node !== modalRoot) {
    if (node.getAttribute && node.getAttribute("aria-hidden") === "true") {
      return true;
    }
    if (node.hidden === true) {
      return true;
    }
    if (node.inert === true) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
};

export default ({
  focusableSelectors = 'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  closeButtonSelector, // e.g. menu close button that's outside of modal
  modalSelector,
  modalElement,
  keyEvent,
}) => {
  const focusableElements = focusableSelectors;
  const modal =
    modalElement ||
    (modalSelector ? document.querySelector(modalSelector) : null);
  const e = keyEvent;

  if (!modal) {
    return;
  }

  const focusableNodeArray = Array.from(
    modal.querySelectorAll(focusableElements)
  );

  let focusableContent = focusableNodeArray.filter(
    (el) =>
      isDisplayed(el) && !isAccessibilityHiddenSubtree(el, modal)
  );

  if (closeButtonSelector) {
    const closeButton = document.querySelector(closeButtonSelector);
    if (closeButton) {
      focusableContent = [closeButton, ...focusableContent];
    }
  }

  if (!focusableContent.length) {
    return;
  }

  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  const isTabPressed = e.key === "Tab" || e.code === "Tab";

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      e.preventDefault();
    }
  } else if (document.activeElement === lastFocusableElement) {
    firstFocusableElement.focus();
    e.preventDefault();
  }
};
