/**
 * focusTrapping: Trap keyboard focus inside of a modal
 * @param {string} focusableSelectors(requied): css selectors for all the focusable elements inside of the modal
 * @param {string} modalSelector(requied): css selector for the modal container
 * @param {string} closeButtonSelector(optional): If the modal close button is outside of the modal container, add the css selector for it to be included as the first focusable element
 * @param {event} keyEvent(requied): keydown event
 */

// check if an element is visibly displayed using computed style
const isDisplayed = (el) => {
  const style = window.getComputedStyle(el);
  return((style.display !== 'none') && (style.visibility !== 'hidden'));
};

// filter out elements from array which are not visibly displayed
const filterDisplayedElements = (elements) => (elements.length > 0) && elements.filter((el) => isDisplayed(el));

export default ({
  focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  closeButtonSelector, // e.g. menu close button that's outside of modal
  modalSelector, // e.g. '#exampleModal',
  keyEvent
}) => {
  // add all the elements inside modal which you want to make focusable
  const focusableElements = focusableSelectors;
  const modal = document.querySelector(modalSelector); // select the modal by it's id
  const e = keyEvent;

  const focusableNodeArray = Array.from(modal.querySelectorAll(focusableElements));
  let focusableContent = modal && filterDisplayedElements(focusableNodeArray);
  if (closeButtonSelector) {
    const closeButton = document.querySelector(closeButtonSelector);
    focusableContent = [closeButton, ...focusableContent];
  }
  const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

  console.log(firstFocusableElement, lastFocusableElement)

  const isTabPressed = e.key === 'Tab';

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus(); // add focus for the last focusable element
      e.preventDefault();
    }
  } else if (document.activeElement === lastFocusableElement) { // if tab key is pressed
    // if focused has reached to last focusable element then focus first focusable element after pressing tab
    firstFocusableElement.focus(); // add focus for the first focusable element
    e.preventDefault();
  }
};
