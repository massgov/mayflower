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
// let searchForm = document.querySelector(");
// const searchAccessButton = document.querySelector(".js-header-search-access-button");

document.querySelector(".js-header-search-access-button").addEventListener("click", function (event) {
  // if (window.innerWidth > 620) {
  //   return;
  // }
  // event.preventDefault();
  document.querySelector("body").classList.toggle("show-menu");
  this.blur();

  // document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input").classList.add("panda");
  document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input").focus();

  feedbackButton.classList.toggle("hide-button");
});
