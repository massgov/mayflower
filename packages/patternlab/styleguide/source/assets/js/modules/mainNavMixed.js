const mixedBody = document.querySelector("body");
let mixedWidth = document.documentElement.clientWidth;
const mixedMenuButton = document.querySelector(".js-header-menu-button");
const mixedMenuOverlay = document.querySelector(".menu-overlay");

// Hide hamburger menu when window size is resized to over 840 while hamburger menu is open.
window.addEventListener("resize", hideHamburgerMenu);

function hideHamburgerMenu () {
  if (mixedWidth > 840) {
    if (mixedBody.classList.contains("show-menu")) {
      mixedBody.classList.remove("show-menu");
      mixedMenuButton.setAttribute("aria-expanded", "false");
      mixedMenuButton.setAttribute("aria-label", "Open the main menu for mass.gov");
      mixedMenuOverlay.classList.remove("overlay-open");
    }
  }
}
