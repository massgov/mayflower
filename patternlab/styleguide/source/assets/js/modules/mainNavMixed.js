const body = document.querySelector("body");
let width = document.documentElement.clientWidth;
const menuButton = document.querySelector(".js-header-menu-button");
const menuOverlay = document.querySelector(".menu-overlay");

// Hide hamburger menu when window size is resized to over 840 while hamburger menu is open.
window.addEventListener("resize", hideHamburgerMenu);

function hideHamburgerMenu () {
  if (width > 840) {
    if (body.classList.contains("show-menu")) {
      body.classList.remove("show-menu");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open the main menu for mass.gov");
      menuOverlay.classList.remove("overlay-open");
    }
  }
}
