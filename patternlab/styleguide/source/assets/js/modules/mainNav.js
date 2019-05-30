
const body = document.querySelector("body");
const headerNav = document.querySelector('.ma__header__nav');
const menuButton = document.querySelector(".js-header-menu-button");
let menuButtonText = menuButton.querySelector('.ma__header__menu-text');
let buttonLabel = menuButtonText.textContent;
const feedbackButton = document.querySelector('.ma__fixed-feedback-button');
const mobileSearch = document.getElementById('nav-search');
const mainMenu = document.querySelector('.js-main-nav');
let menuItems = document.querySelectorAll('.js-main-nav-toggle');
const siteLogo = document.getElementById('ma__site-logo-link');
let mobileUtilityItems = document.querySelector('.ma__header__utility-nav--narrow');
const stateOrgsButton = mobileUtilityItems.getElementsByClassName('js-util-nav-toggle')[0];
let windowWidth = window.innerWidth;

// create a new div element 
var menuOverlay = document.createElement("div");
menuOverlay.setAttribute("class", "menu-overlay");
document.body.appendChild(menuOverlay);

const headerWrapper = document.createElement("div");
headerWrapper.setAttribute("class", "ma__header-wrapper");
headerNav.prepend(headerWrapper);

headerWrapper.appendChild(document.querySelector('.ma__header__utility-nav--wide'));
headerWrapper.appendChild(document.querySelector('.ma__header__button-container'));

document.getElementById('header').classList.add('optimized-menu');


// Close and reset menu on overlay click
menuOverlay.addEventListener("click", function () {
  close();
});

// Open and close the menu
if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (body.classList.contains("show-menu")) {
      body.classList.remove("show-menu");
    }
    else {
      body.classList.add("show-menu");
    }

    if (menuOverlay.classList.contains("overlay-open")) {
      menuOverlay.classList.remove("overlay-open");
    }
    else {
      menuOverlay.classList.add("overlay-open");
    }
    feedbackButton.style.zIndex = "0";

    if (buttonLabel == "Menu") {
      menuButtonText.textContent = "Close";
      buttonLabel = "Close";
      menuButton.setAttribute('aria-label', 'Close the main menu for mass.gov');
    } else {
      menuButtonText.textContent = "Menu";
      buttonLabel = "Menu";
      menuButton.setAttribute('aria-label', 'Open the main menu for mass.gov');
    }

    if (menuButton.getAttribute('aria-pressed') == "false") {
      menuButton.setAttribute('aria-pressed', 'true');
    }
    else {
      menuButton.setAttribute('aria-pressed', 'false');
    }
  });

  menuButton.addEventListener('keydown', function (e) {

    if (e.key == 'ArrowDown') {
      event.preventDefault();
      if (body.classList.contains("show-menu")) {
        body.classList.remove("show-menu");
      }
      else {
        body.classList.add("show-menu");
      }

      if (menuOverlay.classList.contains("overlay-open")) {
        menuOverlay.classList.remove("overlay-open");
      }
      else {
        menuOverlay.classList.add("overlay-open");
      }
      feedbackButton.style.zIndex = "0";

      menuButtonText.textContent = "Close";
      buttonLabel = "Close";

      menuButton.setAttribute('aria-pressed', 'true');
    }

    if (e.shiftKey && e.key == 'Tab') {
      close();
    }
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
    if (body.classList.contains("show-menu")) {
      body.classList.remove("show-menu");
    }
    else {
      body.classList.add("show-menu");

    }

    feedbackButton.classList.toggle("hide-button");

    if (buttonLabel == "Menu") {
      menuButtonText.textContent = "Close";
      buttonLabel = "Close";
    } else {
      menuButtonText.textContent = "Menu";
      buttonLabel = "Menu";
    }

    if (menuOverlay.classList.contains("overlay-open")) {
      menuOverlay.classList.remove("overlay-open");
    }
    else {
      menuOverlay.classList.add("overlay-open");
    }

    setTimeout(function timeoutFunction() {
      document.querySelector('.nav-search-mobile input').focus();
    }, 500);


  });
}

// On mobile, turn govt button into link
stateOrgsButton.addEventListener("click", function (e) {
  stateOrgsButton.querySelector('.ma__utility-nav__content').remove();
  window.location.pathname = 'https://www.mass.gov/state-a-to-z';
});

// Slide submenus open
[].forEach.call(menuItems, function (item) {
  const itemButton = item.querySelector('.ma__main-nav__top-link');
  const subMenu = item.querySelector('.ma__main-nav__subitems');
  const subItems = subMenu.querySelector('.ma__main-nav__container');
  let subMenuItems = subMenu.querySelectorAll('.ma__main-nav__subitem');

  const openIndicator = document.createElement('span');
  openIndicator.setAttribute("class", "aria-hidden toggle-indicator");
  itemButton.appendChild(openIndicator);

  subItems.style.opacity = "0";

  itemButton.addEventListener('click', function (e) {
    hide(item);

    if (item.classList.contains("submenu-open")) {
      item.classList.remove("submenu-open");
    }
    else {
      item.classList.add("submenu-open");
    }

    if (itemButton.getAttribute('aria-expanded') == "false") {
      itemButton.setAttribute('aria-expanded', 'true');
    }
    else {
      itemButton.setAttribute('aria-expanded', 'false');
    }

    if (subMenu.classList.contains('is-closed')) {
      /** Show the subMenu. */

      subMenu.classList.remove('is-closed');
      subMenu.style.height = "auto";

      /** Get the computed height of the subMenu. */
      var height = subMenu.clientHeight + "px";
      /** Set the height of the submenu as 0px, */
      /** so we can trigger the slide down animation. */
      subMenu.style.height = "0";

      setTimeout(function timeoutFunction() {
        subMenu.style.height = height;
        subItems.style.opacity = "1";
      }, 50);

      /** Slide up. */
    } else {
      /** Set the height as 0px to trigger the slide up animation. */

      subItems.style.opacity = "0";
      subMenu.style.height = "0";

      setTimeout(function timeoutFunction() {
        subMenu.classList.add('is-closed');

      }, 500);
    }
  });


  itemButton.addEventListener('keydown', function (e) {

    if (e.key == 'ArrowDown') {
      let first = subItems.getElementsByTagName("li")[0];
      first.querySelector('.ma__main-nav__link').focus()
    }

    if (e.key == 'Escape') {
      subItems.style.opacity = "0";
      subMenu.style.height = "0";
      item.classList.remove('submenu-open');

      setTimeout(function timeoutFunction() {
        subMenu.classList.add('is-closed');

      }, 500);
    }

    if (e.shiftKey && e.key == 'Tab') {
      subItems.style.opacity = "0";
      subMenu.style.height = "0";
      item.classList.remove('submenu-open');
      itemButton.setAttribute('aria-expanded', 'false');

      setTimeout(function timeoutFunction() {
        subMenu.classList.add('is-closed');

      }, 500);
    }
  });



  [].forEach.call(subMenuItems, function (subItem) {
    const prevSib = subItem.previousElementSibling;
    const nextSib = subItem.nextElementSibling;

    subItem.addEventListener('keydown', function (e) {

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
          if (subItem = prevSib) {
            prevSib.querySelector('.ma__main-nav__link').focus();
          }
          break;
        case 'ArrowDown':
        case 'ArrowRight':
          if (subItem = nextSib) {
            nextSib.querySelector('.ma__main-nav__link').focus();
          }
          break;
        case 'Escape':
          subItems.style.opacity = "0";
          subMenu.style.height = "0";

          setTimeout(function timeoutFunction() {
            subMenu.classList.add('is-closed');

          }, 500);
          break;
      }

      if (nextSib === null && e.key == 'Tab') {
        subItems.style.opacity = "0";
        subMenu.style.height = "0";
        item.classList.remove('submenu-open');

        setTimeout(function timeoutFunction() {
          subMenu.classList.add('is-closed');

        }, 500);
      }
    });
  });

});

siteLogo.addEventListener('focus', function () {
  close();
});

document.querySelector('.ma__header__utility-nav--wide').addEventListener('click', function () {
  close();
});

function hide(item) {
  for (let i = 0; i < menuItems.length; i++) {
    if (item != menuItems[i]) {
      if (menuItems[i].classList.contains('submenu-open')) {
        menuItems[i].querySelector('.ma__main-nav__subitems').style.height = "0";
        menuItems[i].querySelector('.ma__main-nav__container').style.opacity = "0";
        menuItems[i].classList.remove('submenu-open');
      }
    }
  }
}

function close() {
  if (body.classList.contains("show-menu")) {
    if (body.classList.contains("show-menu")) {
      body.classList.remove("show-menu");
    }
    else {
      body.classList.add("show-menu");
    }

    if (menuOverlay.classList.contains("overlay-open")) {
      menuOverlay.classList.remove("overlay-open");
    }
    else {
      menuOverlay.classList.add("overlay-open");
    }
    menuButtonText.textContent = "Menu";
    buttonLabel = "Menu";
  }
}

