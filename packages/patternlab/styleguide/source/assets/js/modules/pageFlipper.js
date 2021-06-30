let arrowButtons = document.querySelectorAll(".ma__arrow-button");

function switchVisibility() {
  let width = document.querySelector("body").clientWidth;
  // Make arrow buttons visible to keyboard and screen readers.
  if (width < 621) {
    arrowButtons.forEach(arrowButton => {
      if (arrowButton.getAttribute("tabindex") == "-1") {
        arrowButton.setAttribute("tabindex", "0");
      }
    });
  }

  // Hide arrow buttons to keyboard and screen readers.
  if (width > 620) {
    arrowButtons.forEach(arrowButton => {
      if (arrowButton.getAttribute("tabindex") == "0") {
        arrowButton.setAttribute("tabindex", "-1");
      }
    });
  }
}

window.addEventListener("resize", switchVisibility);
