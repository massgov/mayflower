
const menuButton = document.querySelector(".js-header-menu-button");
let menuButtonText = menuButton.querySelector('.ma__header__menu-text');
let buttonLabel = menuButtonText.textContent;
const feedbackButton = document.querySelector('.ma__fixed-feedback-button');
let menuItems = document.querySelectorAll('.js-main-nav-toggle');

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");

    if (buttonLabel == "Menu") {
      menuButtonText.textContent = "Close";
      buttonLabel = "Close";
    } else {
      menuButtonText.textContent = "Menu";
      buttonLabel = "Menu";
    }

    // Hide feedback button when menu opens.
    feedbackButton.classList.toggle("hide-button");
  });
}

// ****** Main Header Search button on mobile should open the mobile menu  ******
const searchForm = document.querySelector(".js-header-search-menu .js-header-search-form");

if (null !== searchForm) {
  searchForm.addEventListener("submit", function (event) {
    if (window.innerWidth > 620) {
      return;
    }
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
    document.querySelector('.ma__header__nav-search .ma__header-search__input').focus();
    feedbackButton.classList.toggle("hide-button");
  });
}



[].forEach.call(menuItems, function (item) {
  const itemButton = item.querySelector('.ma__main-nav__top-link');
  const subMenu = item.querySelector('.ma__main-nav__subitems');

  itemButton.addEventListener("click", function () {
    subMenu.classList.toggle('is-closed');
  })

});

