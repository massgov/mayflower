const isDisplayed = (el) => {
  const style = window.getComputedStyle(el);
  return((style.display !== 'none') && (style.visibility !== 'hidden'));
};

const filterDisplayedElements = (elements) => (elements.length > 0) && elements.filter((el) => isDisplayed(el));

export default ({
  focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
  modalSelector, // e.g. '#exampleModal',
  keyEvent
}) => {
  // add all the elements inside modal which you want to make focusable
  const focusableElements = focusableSelectors;
  const modal = document.querySelector(modalSelector); // select the modal by it's id
  const e = keyEvent;

  const focusableNodeArray = Array.from(modal.querySelectorAll(focusableElements));
  const focusableContent = modal && filterDisplayedElements(focusableNodeArray);
  const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

  console.log(lastFocusableElement)

  const isTabPressed = e.key === 'Tab';

  if (!isTabPressed) {
    return;
  }

  if (e.shiftKey) { // if shift key pressed for shift + tab combination

    // Disable auto focus on the last nav element, to match current Mass.gov global nav keyboard behavior
    // if (document.activeElement === firstFocusableElement) {
    //     lastFocusableElement.focus(); // add focus for the last focusable element
    //     e.preventDefault();
    // }
  } else if (document.activeElement === lastFocusableElement) { // if tab key is pressed
    // if focused has reached to last focusable element then focus first focusable element after pressing tab
    firstFocusableElement.focus(); // add focus for the first focusable element
    e.preventDefault();
  }
};
