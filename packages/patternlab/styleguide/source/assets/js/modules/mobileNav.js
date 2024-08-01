// // ****** Menu button ******
let mobileMenuButton = document.querySelector(".js-header-menu-button");
let mobileFeedbackButton = document.querySelector(".ma__fixed-feedback-button");
const mobileJumpToSearchButton = document.querySelector(".js-header-search-access-button");

if (mobileMenuButton !== null) {
  mobileMenuButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Toggle mobile menu.
    if (window.innerWidth < 841 && document.querySelector(".ma__header")) {
      toggleMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const body = document.querySelector("body");

  if (body.classList.contains("show-menu")) {
    body.classList.remove("show-menu");
  }
  else {
    body.classList.add("show-menu");
  }
}
