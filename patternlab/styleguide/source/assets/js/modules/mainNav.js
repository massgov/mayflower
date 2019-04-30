
const menuButton = document.querySelector(".js-header-menu-button");
let menuButtonText = menuButton.querySelector('.ma__header__menu-text');
let buttonLabel = menuButtonText.textContent;
const feedbackButton = document.querySelector('.ma__fixed-feedback-button');
let menuItems = document.querySelectorAll('.js-main-nav-toggle');

// create a new div element 
var menuOverlay = document.createElement("div");
menuOverlay.setAttribute("class", "menu-overlay");
document.body.appendChild(menuOverlay);

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
    menuOverlay.classList.toggle('overlay-open');

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

menuOverlay.addEventListener("click", function (event) {
  document.querySelector("body").classList.toggle("show-menu");
  menuOverlay.classList.toggle('overlay-open');
});

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
    itemButton.classList.toggle('submenu-open');
    //subMenu.classList.toggle('is-closed');
    console.log('click');

    if (subMenu.classList.contains('is-closed')) {
      /** Show the subMenu. */
      console.log('classList pre', subMenu.classList);
      subMenu.classList.remove('is-closed');
      subMenu.style.height = "auto";
      console.log('classList post', subMenu.classList);

      /** Get the computed height of the subMenu. */
      var height = subMenu.clientHeight + "px";
      console.log('height', height);
      /** Set the height of the submenu as 0px, */
      /** so we can trigger the slide down animation. */
      subMenu.style.height = "0px";

      /** Then */
      setTimeout(() => {
        console.log('timeout', height);
        subMenu.style.height = height;

      }, 0.1)

      /** Slide up. */
    } else {
      /** Set the height as 0px to trigger the slide up animation. */
      subMenu.style.height = "0px";
      subMenu.classList.add('is-closed');
      console.log(subMenu.classList);
    }

  })

});

