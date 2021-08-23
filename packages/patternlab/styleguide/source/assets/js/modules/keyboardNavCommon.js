// targetContainer should contains a toggle for a content container.
// this allows to circulate focusable elements including the toggle.
let targetContainer = document.querySelector(".js-keyboard-nav-container");
let focusableElements = targetContainer.querySelectorAll("[href], button, input, [tabindex]:not([tabindex='-1'])");
let firstFocusableElement = focusableElements[0];
let lastFocusableElement = focusableElements[focusableElements.length -1];

const containerToggle = document.querySelector(".js-keyboard-nav-container-toggle");

// 1. Focus stays in the overlay/container by circling focusable elements within while it's open.

// Forward: Tab
// At the last focusable element, TAB key to set focus back on the first focusable element.
lastFocusableElement.addEventListener("keydown", function (e) {
  if (e.key === "Tab" || e.code === "Tab") {

    // L. 17 and 18 target
    // button.ma__toc__toc__toggle.js-inline-overlay-toggle.js-inline-overlay-overlay-toggle.js-keyboard-nav-container-toggle
    // as containerToggle but focus is set on the next focusable element.
    containerToggle.style.backgroundColor = "yellow"; // tester
    console.log(containerToggle);

    // Some components have the toggle(close) button inside the overlay/container.
    // Some has it outside. To include the button in the focus cycle,
    // directly set focus on the button from the last focusable element.
    containerToggle.focus();
  }
});

// Backward: Shift + Tab
// At the first focusable element, SHIFT + TAB keys to set focus on the last focusable element.
firstFocusableElement.addEventListener("keydown", function (e) {
  if ((e.shiftKey && e.key === "Tab") || (e.shiftKey && e.code === "Tab")) {

    // L.36 applies purple on the last focusable element,
    // but focus is set on the SECOND last focusable element.
    lastFocusableElement.style.backgroundColor = "purple"; // tester
    lastFocusableElement.focus();
  }
});


// 2. ESC close the overlay/container regardless which element has focus in the overlay/container.
//    Set focus on the opne/close button on the main page.
//    NOTE:  This doesn't apply to the main nav component.