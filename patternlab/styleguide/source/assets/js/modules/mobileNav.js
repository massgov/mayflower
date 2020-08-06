// // ****** Menu button ******
let menuButton = document.querySelector(".js-header-menu-button");
let feedbackButton = document.querySelector(".ma__fixed-feedback-button");
const jumpToSearchButton = document.querySelector(".js-header-search-access-button");

if (menuButton !== null) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Hide feedback button when menu opens.
    toggleFeedbackButton()
  });
}

// // ****** Access to Search button on mobile should hide feedback button when menu opens  ******

if (jumpToSearchButton !== null) {
  jumpToSearchButton.addEventListener("click", function (event) {
    toggleFeedbackButton();
  });
}

function toggleFeedbackButton() {
  if (feedbackButton) {
    // Cannot use .toggle. It results to show the button with the dropdown and hide it with the closed dropdown.
    if(feedbackButton.classList.contains("hide-button") === false) {
      feedbackButton.classList.add("hide-button");
    }
    else {
      feedbackButton.classList.remove("hide-button");
    }
  }
}
