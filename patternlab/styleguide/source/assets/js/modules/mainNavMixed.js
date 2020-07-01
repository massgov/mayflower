const body = document.querySelector("body");
let width = document.documentElement.clientWidth;
const menuButton = document.querySelector(".js-header-menu-button");
// let menuButtonText = document.querySelector(".js-header__menu-text");
// let buttonLabel;
// const hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");
// const feedbackButton = document.querySelector(".ma__fixed-feedback-button");
// let menuItems = document.querySelectorAll(".js-main-nav-hamburger-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
// let utilNavWide = document.querySelector(".js-utility-nav--wide");
// const jumpToSearchButton = document.querySelector(".js-header-search-access-button");
// const hamburgerSearchInput = document.getElementById("nav-search");

// Hide hamburger menu when window size is resized to over 840 while hamburger menu is open.
window.addEventListener("resize", hideHamburgerMenu);

function hideHamburgerMenu () {
  if (width > 840) {
    // alert(width);
    if (body.classList.contains("show-menu")) {
      body.classList.remove("show-menu");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open the main menu for mass.gov");
      menuOverlay.classList.remove("overlay-open");
    }
  }
}