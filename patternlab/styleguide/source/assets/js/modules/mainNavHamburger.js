const body = document.querySelector("body");
let width = body.clientWidth;
const menuButton = document.querySelector(".js-header-menu-button");
let menuButtonText = document.querySelector(".js-header__menu-text");
let buttonLabel;
const hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");
const feedbackButton = document.querySelector(".ma__fixed-feedback-button");
let menuItems = document.querySelectorAll(".js-main-nav-hamburger-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
let utilNavWide = document.querySelector(".js-utility-nav--wide");
const jumpToSearchButton = document.querySelector(".js-header-search-access-button");
const hamburgerSearchInput = document.getElementById("nav-search");
// const hamburgerSearchInput = document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input");


if (null !== menuButtonText) {
  buttonLabel = menuButtonText.textContent;
}
// Open and close the menu
// if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();

    // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
    document.querySelector(".ma__header__hamburger__nav-container").toggleAttribute("aria-hidden");

    if (body.classList.contains("show-menu")) {
      closeMenu();
    //   // Set focus on menu button.
    //   menuButton.focus();
    } else {
      openMenu();
    //   // menuButton.blur();
    //   hamburgerMenuContainer.setAttribute("tabindex", "0");
    //   // Set focus on hamburger menu container.
    //   // Then, next tabbing takes a user to the first focusable element in the menu container.
      hamburgerMenuContainer.focus();

    //   if (menuButton === document.activeElement) {
    //     if (hamburgerMenuContainer === document.querySelector(".ma__header__hamburger__nav-container")) {
    //       // hamburgerMenuContainer.focus();
    //       document.querySelector(".ma__site-logo a").focus();
    //     }
    //   }
    }
  });

  // =============== exisiting code below
  // menuButton.addEventListener("keydown", function (e) {

    // if (e.code == 'ArrowDown') {
    //   event.preventDefault();
    //   openMenu();

    //   if (window.innerWidth > 620) {
    //     setTimeout(function timeoutFunction() {
    //       menuItems[0].querySelector(".js-main-nav-hamburger__top-link").focus();
    //     }, 500);
    //   } else {
    //     setTimeout(function timeoutFunction() {
    //       document.querySelector('.js-header__nav-search input').focus();
    //     }, 500);
    //   }
    // }

    // NOTE: This causes a keyboard trap at the menu open/close button.
    // if (e.code == 'Tab') {
    //   e.preventDefault();
    //   document.querySelector('.ma__header__hamburger-search__input').focus();
    // }

    // if (e.shiftKey && e.code == "Tab") {
    //   closeMenu();
    // }

    // if (e.code == "Escape" || e.which == "27") {
    //   closeMenu();
    // }
  // });
// }

[].forEach.call(menuItems, function (item) {

  const itemButton = item.querySelector(".js-main-nav-hamburger__top-link");
  const subMenu = item.querySelector(".js-main-nav-hamburger-content");
  const subItems = subMenu.querySelector(".js-main-nav-hamburger__container");
  let subMenuItems = subMenu.querySelectorAll(".js-main-nav-hamburger__subitem");

  subItems.style.opacity = "0";

  itemButton.addEventListener("focus", function(e){
    closeSubMenus(item);
  });

  itemButton.addEventListener("click", function (e) {

    closeSubMenus(item);


    if (item.classList.contains("submenu-open")) {
      item.classList.remove("submenu-open");
      itemButton.setAttribute("aria-expanded", "false");
      itemButton.setAttribute("aria-label", "show menu");
      item.style.pointerEvents = "none";

      setTimeout(function timeoutFunction() {
        item.removeAttribute("style");
      }, 700);
    } else {
      item.classList.add("submenu-open");
      itemButton.setAttribute("aria-expanded", "true");
      item.style.pointerEvents = "none";
      itemButton.setAttribute("aria-label", "hide menu");
      setTimeout(function timeoutFunction() {
        item.removeAttribute("style");
      }, 700);
    }


    if (subMenu.classList.contains("is-closed")) {

      /** Show the subMenu. */

      subMenu.classList.remove("is-closed");
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
        subMenu.classList.add("is-closed");

      }, 500);
    }
  });

  itemButton.addEventListener("keydown", function (e) {

    if (e.code == "ArrowDown") {
      let first = subItems.getElementsByTagName("li")[0];
      first.querySelector(".js-main-nav-hamburger__link").focus();
    }

    if (e.code == "Escape" || e.which == "27") {
      if (item.classList.contains("submenu-open")) {
        subItems.style.opacity = "0";
        subMenu.style.height = "0";
        itemButton.parentElement.classList.remove("submenu-open");
        itemButton.setAttribute("aria-expanded", "false");
        itemButton.setAttribute("aria-label", "show menu");

        setTimeout(function timeoutFunction() {
          subMenu.classList.add("is-closed");
        }, 500);

      }
      else {
        closeMenu();
      }
    }

    if (e.shiftKey && e.code == "Tab") {
      subItems.style.opacity = "0";
      subMenu.style.height = "0";
      item.classList.remove("submenu-open");
      itemButton.setAttribute("aria-expanded", "false");
      itemButton.setAttribute("aria-label", "show menu");

      setTimeout(function timeoutFunction() {
        subMenu.classList.add("is-closed");
      }, 500);
    }

    if (width > 840 && e.key == "Tab") {
      if (!itemButton.parentElement.nextElementSibling
      && !itemButton.parentElement.classList.contains("submenu-open")) {
        closeMenu();
      }
    }
  });

  [].forEach.call(subMenuItems, function (subItem) {
    const prevSib = subItem.previousElementSibling;
    const nextSib = subItem.nextElementSibling;

    subItem.addEventListener("keydown", function (e) {

      switch (e.code) {
        case "ArrowUp":
        case "ArrowLeft":
          if (subItem === prevSib) {
            prevSib.querySelector(".js-main-nav-hamburger__link").focus();
          }
          break;
        case "ArrowDown":
        case "ArrowRight":
          if (subItem === nextSib) {
            nextSib.querySelector(".js-main-nav-hamburger__link").focus();
          }
          break;
        case "Escape":
          itemButton.focus();

           break;
      }
    });
  });
});



// REFERENCE:

// const body = document.querySelector("body");
// const menuButton = document.querySelector(".js-header-menu-button");
// const jumpToSearchButton = document.querySelector(".js-header-search-access-button");

// const hamburgerSearchInput = document.getElementById("nav-search");

// // const hamburgerSearchInput = document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input");

// const hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");


jumpToSearchButton.addEventListener("click", function(e) {

  // document.querySelector(".ma__header__hamburger__nav-container .js-header__nav-search .ma__header-search__input").focus();

  // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
  hamburgerMenuContainer.toggleAttribute("aria-hidden");

  // if (document.activeElement === jumpToSearchButton) {
  //   alert("button");
  //   // jumpToSearchButton.blur();
  //   hamburgerSearchInput.focus();
  // }
  // else {
  //   hamburgerSearchInput.focus();
  // }

  hamburgerSearchInput.focus();

  if (body.classList.contains("show-menu")) {
    closeMenuJumpToSearch();

    // Set focus on the jumpToSearchButton button since the input gets hidden by closing the menu.
    // hamburgerSearchInput.blur();
    // jumpToSearchButton.focus();
  } else {

    openMenuJumpToSearch();
    // Set focus on the search input field.
    // jumpToSearchButton.blur();
    // hamburgerSearchInput.focus();
  }
});

function closeMenu() {
  commonCloseMenuTasks();
  menuButton.setAttribute("aria-pressed", "false");
}

function closeMenuJumpToSearch() {
  commonCloseMenuTasks();
  jumpToSearchButton.setAttribute("aria-pressed", "false");
}

function commonCloseMenuTasks() {
  body.classList.remove("show-menu");

  menuButtonText.textContent = "Menu";
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open the main menu for mass.gov");

  if (feedbackButton) {
    feedbackButton.classList.remove("hide-button");
  }
  jumpToSearchButton.setAttribute("aria-expanded", "false");
  if (menuOverlay) {
    menuOverlay.classList.remove("overlay-open");
  }
}

function openMenu() {
  commonOpenMenuTasks();
  menuButton.setAttribute("aria-pressed", "true");
}

function openMenuJumpToSearch() {
  commonOpenMenuTasks();
  jumpToSearchButton.setAttribute("aria-pressed", "true");
}

function commonOpenMenuTasks() {
  body.classList.add("show-menu");

  menuButtonText.textContent = "Close";
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close the main menu for mass.gov");
  if (feedbackButton) {
    feedbackButton.classList.add("hide-button");

  }
  jumpToSearchButton.setAttribute("aria-expanded", "true");
  if (menuOverlay) {
    menuOverlay.classList.add("overlay-open");
  }
}

function closeSubMenus(item) {
  //Close other open submenus
  let siblings = [];
  let thisSibling = item.parentNode.firstChild;

  while (thisSibling) {
    if (thisSibling !== item && thisSibling.nodeType === Node.ELEMENT_NODE)
      siblings.push(thisSibling);
    thisSibling = thisSibling.nextElementSibling || thisSibling.nextSibling;
  }

  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i].classList.contains("submenu-open")) {

      setTimeout(function timeoutFunction() {
        siblings[i].querySelector(".js-main-nav-hamburger-content").style.height = "0";
        siblings[i].querySelector(".js-main-nav-hamburger-content").classList.add("is-closed");
        siblings[i].querySelector(".js-main-nav-hamburger__container").style.opacity = "0";
        siblings[i].classList.remove("submenu-open");
        siblings[i].querySelector(".js-main-nav-hamburger__top-link").setAttribute("aria-expanded", "false");
        siblings[i].querySelector(".js-main-nav-hamburger__top-link").setAttribute("aria-label", "show menu");
      }, 500);

    }
  }
}

// Close menu when utility nav is clicked
if (null !== utilNavWide) {
    closeMenu();
}


// Close and reset menu on overlay click
if (null !== menuOverlay) {
  menuOverlay.addEventListener("click", function () {
    closeMenu();
  });
}

let debouncer;
window.onresize = function () {
  clearTimeout(debouncer);
  debouncer = setTimeout(function () {
    width = body.clientWidth;
  }, 100);
};


// ** Utility nav

// Wide/utility nav bar
const utilWideButton = utilNavWide.querySelector(".js-util-nav-toggle");
const utilWideCloseButton = utilNavWide.querySelector(".js-close-util-nav");
const utilWideContent = utilNavWide.querySelector(".js-util-nav-content");

// Open
utilWideButton.addEventListener("click", function (e) {

    setTimeout(function() {
      utilWideButton.setAttribute("aria-expanded", "true");
      utilWideButton.setAttribute("aria-pressed", "true");
    }, 200);
//   }
});

// Close - Utility nav dropdown on the utility nav var overwaps the button to open it once it's open. To close the dropdown, use the close button within the dropdown container. This is the control for that inside button.
// TODO: esc key to close the content.
utilWideCloseButton.addEventListener("click", function (e) {

  // Content state
  utilWideContent.style.height = "0";
  utilWideContent.style.opacity = "0";
  utilWideContent.classList.add("is-closed");
  utilWideContent.setAttribute("aria-hidden", "true");

  // Close button state
  utilWideCloseButton.setAttribute("aria-expanded", "false");

  // Utility button state
  utilWideButton.setAttribute("aria-expanded", "false");
  utilWideButton.setAttribute("aria-pressed", "false");

  e.target.closest(".ma__header__hamburger__nav").classList.toggle("util-nav-content-open");
});

// Narrow/in hamburger menu
const utilNarrowButton = document.querySelector(".ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle");

utilNarrowButton.addEventListener("click", function(e) {

  const thisButton = e.target.closest(".js-util-nav-toggle");
  const utilNarrowContent = thisButton.nextElementSibling;

  if (utilNarrowContent.classList.contains("is-closed")) {// Open

    utilNarrowContent.classList.remove("is-closed");
    utilNarrowContent.removeAttribute("aria-hidden");

    // Button state
    thisButton.setAttribute("aria-expanded", "true");
    thisButton.setAttribute("aria-pressed", "true");

    /** Slide up. */
    // NOTE: Following the pattern of the main nav @ L.282.
    setTimeout(function timeoutFunction() {
      utilNarrowContent.style.opacity = "1";
      utilNarrowContent.style.height = "auto";
    }, 500);

  } else {// Close

    utilNarrowContent.classList.add("is-closed");
    utilNarrowContent.setAttribute("aria-hidden", "true");

    // Button state
    utilNarrowButton.setAttribute("aria-expanded", "false");
    utilNarrowButton.setAttribute("aria-pressed", "false");

    /** Slide up. */
    setTimeout(function timeoutFunction() {
      utilNarrowContent.style.opacity = "0";
      utilNarrowContent.style.height = "0";
    }, 500);
  }
});
