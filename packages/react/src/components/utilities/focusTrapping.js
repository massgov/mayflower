export default ({
    focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    modalSelector, // e.g. '#exampleModal',
    keyEvent
}) => {
    // add all the elements inside modal which you want to make focusable
    const  focusableElements = focusableSelectors;
    const modal = document.querySelector(modalSelector); // select the modal by it's id
    const e = keyEvent;

    const focusableContent = modal && modal.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal
    const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
console.log(firstFocusableElement)
    let isTabPressed = e.key === 'Tab';

    if (!isTabPressed) {
        return;
    }

    if (e.shiftKey) { // if shift key pressed for shift + tab combination
        console.log('shift tab')
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
        }
    } else { // if tab key is pressed
        console.log('tab')
        console.log(document.activeElement)
        console.log(lastFocusableElement)
        if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
            e.preventDefault();
        }
    }
}