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

    // Hide feedback button when menu opens.
    toggleFeedbackButton();
  });
}

// // ****** Access to Search button on mobile should hide feedback button when menu opens  ******

if (mobileJumpToSearchButton !== null) {
  mobileJumpToSearchButton.addEventListener("click", function (event) {
    toggleFeedbackButton();
  });
}

function toggleFeedbackButton() {
  if (mobileFeedbackButton) {
    // Cannot use .toggle. It results to show the button with the dropdown and hide it with the closed dropdown.
    if(mobileFeedbackButton.classList.contains("hide-button") === false) {
      mobileFeedbackButton.classList.add("hide-button");
    }
    else {
      mobileFeedbackButton.classList.remove("hide-button");
    }
  }
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
