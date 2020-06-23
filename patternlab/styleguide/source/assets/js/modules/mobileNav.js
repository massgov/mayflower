// // ****** Menu button ******
let menuButton = document.querySelector(".ma__header .js-header-menu-button");
let feedbackButton = document.querySelector('.ma__fixed-feedback-button');

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");

    // Hide feedback button when menu opens.
    feedbackButton.classList.toggle("hide-button");
  });
}

// // ****** Main Header Search button on mobile should open the mobile menu  ******

document.querySelector(".js-header-search-access-button").addEventListener("click", function (event) {

  document.querySelector("body").classList.toggle("show-menu");
  this.blur();

  // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
  document.querySelector(".ma__header__hamburger__button-container").toggleAttribute("aria-hidden");

  document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input").focus();

  feedbackButton.classList.toggle("hide-button");
});
