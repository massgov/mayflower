let arrowNavItems = document.querySelectorAll(".ma__arrow-nav");

function switchVisibility() {
  let width = document.querySelector("body").clientWidth;
  // Make arrow buttons visible to keyboard and screen readers.
  if (width < 621) {
    arrowNavItems.forEach(item => {
      if(item.querySelector("span").hasAttribute("aria-hidden")) {
        item.querySelector("span").removeAttribute("aria-hidden");
      }

      if (item.querySelector(".ma__arrow-button").getAttribute("tabindex") == "-1") {
        item.querySelector(".ma__arrow-button").setAttribute("tabindex", "0");
      }
    });
  }

  // Hide arrow buttons to keyboard and screen readers.
  if (width > 620) {
    arrowNavItems.forEach(item => {
      if(!item.querySelector("span").hasAttribute("aria-hidden")) {
        item.querySelector("span").setAttribute("aria-hidden", "true");
      }

      if (item.querySelector(".ma__arrow-button").getAttribute("tabindex") == "0") {
        item.querySelector(".ma__arrow-button").setAttribute("tabindex", "-1");
      }
    });
  }
}

switchVisibility();
window.addEventListener("resize", switchVisibility);
