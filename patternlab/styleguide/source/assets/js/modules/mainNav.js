const body = document.querySelector("body");
let width = body.clientWidth;
const menuButton = document.querySelector(".js-header-menu-button");
let menuButtonText = menuButton.querySelector('.ma__header__menu-text');
let buttonLabel = menuButtonText.textContent;
const feedbackButton = document.querySelector('.ma__fixed-feedback-button');
const mainMenu = document.querySelector('.js-main-nav');
let menuItems = document.querySelectorAll('.js-main-nav-toggle');
const menuOverlay = document.querySelector('.menu-overlay');
const searchForm = document.querySelector(".js-header-search-menu .js-header-search-form");

// Updates to utility nav buttons. Will most likely pull mobile utility nav into seperate 
// pattern after work on contextual login links 
let mobileUtilityItems = document.querySelector('.ma__header__utility-nav--narrow');
const mobileLanguageSelect = mobileUtilityItems.getElementsByClassName('ma__utility-nav__item')[0];
const stateOrgsButton = mobileUtilityItems.getElementsByClassName('js-util-nav-toggle')[0];
const logInTo = mobileUtilityItems.getElementsByClassName('js-util-nav-toggle')[1];

stateOrgsButton.addEventListener("click", function (e) {
  stateOrgsButton.querySelector('.ma__utility-nav__content').remove();
  window.location.pathname = 'state-a-to-z';
});

logInTo.addEventListener("keydown", function (e) {
  if (e.key == 'Tab') {
    closeMenu();
  }
});

mobileLanguageSelect.parentNode.removeChild(mobileLanguageSelect);
// ******** //

// Open and close the menu
if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (body.classList.contains("show-menu")) {
      closeMenu();
    } else {
      menuButton.focus();
      openMenu();
    }
  });

  menuButton.addEventListener('keydown', function (e) {

    if (e.code == 'ArrowDown') {
      event.preventDefault();
      openMenu();

      if (window.innerWidth > 620) {
        setTimeout(function timeoutFunction() {
          menuItems[0].querySelector(".ma__main-nav__top-link").focus();
        }, 500);
      } else {
        setTimeout(function timeoutFunction() {
          document.querySelector('.ma__header__nav-search input').focus();
        }, 500);
      }
    }

    if (e.shiftKey && e.code == 'Tab') {
      closeMenu();
    }

    if (e.code == 'Escape' || e.which == '27') {
      closeMenu();
    }
  });
}

if (null !== searchForm) {
  searchForm.addEventListener("submit", function (event) {
    if (window.innerWidth > 620) {
      return;
    }
    event.preventDefault();

    openMenu();

    setTimeout(function timeoutFunction() {

      document.querySelector('.ma__header__nav-search input').focus();

    }, 500);
  });
}

[].forEach.call(menuItems, function (item) {

  const itemButton = item.querySelector('.ma__main-nav__top-link');
  const subMenu = item.querySelector('.ma__main-nav__subitems');
  const subItems = subMenu.querySelector('.ma__main-nav__container');
  let subMenuItems = subMenu.querySelectorAll('.ma__main-nav__subitem');

  subItems.style.opacity = "0";

  itemButton.addEventListener('click', function (e) {

    //Close other open submenus
    let siblings = [];
    let thisSibling = item.parentNode.firstChild;

    while (thisSibling) {
      if (thisSibling !== item && thisSibling.nodeType === Node.ELEMENT_NODE)
        siblings.push(thisSibling);
      thisSibling = thisSibling.nextElementSibling || thisSibling.nextSibling;
    }

    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i].classList.contains('submenu-open')) {

        setTimeout(function timeoutFunction() {
          siblings[i].querySelector('.ma__main-nav__subitems').style.height = "0";
          siblings[i].querySelector('.ma__main-nav__subitems').classList.add('is-closed');
          siblings[i].querySelector('.ma__main-nav__container').style.opacity = "0";
          siblings[i].classList.remove('submenu-open');
          siblings[i].querySelector('.ma__main-nav__top-link').setAttribute('aria-expanded', 'false');
        }, 50);

      }
    }


    if (item.classList.contains("submenu-open")) {
      item.classList.remove("submenu-open");
      itemButton.setAttribute('aria-expanded', 'false');

      item.style.pointerEvents = "none";

      setTimeout(function timeoutFunction() {
        item.removeAttribute('style');
      }, 700);
    } else {
      item.classList.add("submenu-open");
      itemButton.setAttribute('aria-expanded', 'true');
      item.style.pointerEvents = "none";

      setTimeout(function timeoutFunction() {
        item.removeAttribute('style');
      }, 700);
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
      subMenu.style.height = "0";
      subItems.style.opacity = "0";

      setTimeout(function timeoutFunction() {
        subMenu.classList.add('is-closed');

      }, 500);
    }
  });

  itemButton.addEventListener('keydown', function (e) {

    if (e.code == 'ArrowDown') {
      let first = subItems.getElementsByTagName("li")[0];
      first.querySelector('.ma__main-nav__link').focus()
    }

    if (e.code == 'Escape' || e.which == '27') {
      if (item.classList.contains('submenu-open')) {
        subItems.style.opacity = "0";
        subMenu.style.height = "0";
        item.classList.remove('submenu-open');
        itemButton.setAttribute('aria-expanded', 'false');

        setTimeout(function timeoutFunction() {
          subMenu.classList.add('is-closed');

        }, 500);
      }
      else {
        closeMenu();
      }
    }

    if (e.shiftKey && e.code == 'Tab') {
      subItems.style.opacity = "0";
      subMenu.style.height = "0";
      item.classList.remove('submenu-open');
      itemButton.setAttribute('aria-expanded', 'false');

      setTimeout(function timeoutFunction() {
        subMenu.classList.add('is-closed');
      }, 500);
    }

    if (width > 840 && e.key == 'Tab') {
      if (!itemButton.parentElement.nextElementSibling) {
        closeMenu();
      }
    }
  });

  [].forEach.call(subMenuItems, function (subItem) {
    const prevSib = subItem.previousElementSibling;
    const nextSib = subItem.nextElementSibling;

    subItem.addEventListener('keydown', function (e) {

      switch (e.code) {
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
        itemButton.setAttribute('aria-expanded', 'false');

        setTimeout(function timeoutFunction() {
          subMenu.classList.add('is-closed');

        }, 500);
      }
    });
  });
});

function closeMenu() {
  body.classList.remove("show-menu");
  menuOverlay.classList.remove("overlay-open");
  menuButtonText.textContent = "Menu";
  menuButton.setAttribute('aria-pressed', 'false');
  menuButton.setAttribute('aria-label', 'Open the main menu for mass.gov');
  buttonLabel = "Menu";
  feedbackButton.classList.remove('hide-button');
}

function openMenu() {
  body.classList.add("show-menu");
  menuOverlay.classList.add("overlay-open");
  menuButtonText.textContent = "Close";
  buttonLabel = "Close";
  menuButton.setAttribute('aria-pressed', 'true');
  menuButton.setAttribute('aria-label', 'Close the main menu for mass.gov');
  feedbackButton.classList.add('hide-button');
}

// Close menu when utility nav is clicked
document.querySelector('.ma__header__utility-nav--wide').addEventListener('click', function () {
  closeMenu();
});

// Close and reset menu on overlay click
menuOverlay.addEventListener("click", function () {
  closeMenu();
});

let debouncer;
window.onresize = function () {
  clearTimeout(debouncer);
  debouncer = setTimeout(function () {
    width = body.clientWidth;
  }, 100);
};
