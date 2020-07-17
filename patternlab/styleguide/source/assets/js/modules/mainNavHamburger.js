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

if (null !== menuButtonText) {
  buttonLabel = menuButtonText.textContent;
}

// Open and close the menu
// if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();

    // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
    hamburgerMenuContainer.toggleAttribute("aria-hidden");

    if (body.classList.contains("show-menu")) {
      closeMenu();
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value").removeAttribute("tabindex");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .direct-link").removeAttribute("tabindex");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle").removeAttribute("tabindex");

      setTimeout(function timeoutFunction() {
        document.querySelector(".js-header-menu-button").focus();
      }, 100);
    } else {
      openMenu();

      // Set focus on hamburger menu container.
      // Then, next tabbing takes a user to the first focusable element in the menu container.
      // setTimeout(function timeoutFunction() {
      //   hamburgerMenuContainer.focus();
      // }, 90);

      // These don't work:
      // document.querySelectorAll(".js-utility-nav--wide .ma__utility-nav__item a").setAttribute("tabindex", "-1");;
      // document.querySelectorAll(".js-utility-nav--wide .ma__utility-nav__item button").setAttribute("tabindex", "-1");

      // alternalte above 2 lines.
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value").setAttribute("tabindex", "-1");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .direct-link").setAttribute("tabindex", "-1");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle").setAttribute("tabindex", "-1");
    }
  });

  // menuButton.addEventListener("keydown", function (e) {
  //   if (e.key === "Enter" || e.which === "13") {

  //     console.log(menuButton.getAttribute("aria-expanded"));

  //     if (menuButton.getAttribute("aria-expanded") === "false") {
  //       // openMenu();

  //       // Opening menu button with enter is set somewhere else. Cannot find where.
  //       // Set focus on hamburger menu container.
  //       // Then, next tabbing takes a user to the first focusable element in the menu container.
  //       setTimeout(function timeoutFunction() {
  //         // hamburgerMenuContainer.focus();
  //         document.querySelector(".ma__header__hamburger__nav-container").focus();

  //         console.log(document.activeElement);
  //       }, 1000);
  //     } else {
  //       closeMenu();
  //       menuButton.focus();
  //     }
  //   }
  // });

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
      item.style.pointerEvents = "none";

      setTimeout(function timeoutFunction() {
        item.removeAttribute("style");
      }, 700);
    } else {
      item.classList.add("submenu-open");
      itemButton.setAttribute("aria-expanded", "true");
      item.style.pointerEvents = "none";
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

      /** Close Utility menu content when a sub menu is open. */
      closeNarrowUtilContent();

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

jumpToSearchButton.addEventListener("click", function(e) {
  // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
  hamburgerMenuContainer.toggleAttribute("aria-hidden");

  if (body.classList.contains("show-menu")) {
    closeMenuJumpToSearch();
    // Set focus back on the jumpToSearchButton button since the input gets hidden by closing the menu.
    jumpToSearchButton.focus();
  } else {
    openMenuJumpToSearch();
    // Set focus on the search input field.
    setTimeout(function timeoutFunction() {
      document.getElementById("nav-search").focus();
    }, 90);
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

  const thisWideButton = e.target.closest(".js-util-nav-toggle");
  const thisWideContent = thisWideButton.nextElementSibling;

  if (thisWideContent.classList.contains("is-closed")) {//  To open
    thisWideButton.closest(".ma__header__hamburger__nav").classList.add("util-nav-content-open");

    thisWideContent.classList.remove("is-closed");
    thisWideContent.removeAttribute("aria-hidden");
    thisWideContent.removeAttribute("style");
    thisWideContent.style.height = "auto";
    thisWideContent.style.opacity = "1";

    // Button State
    thisWideButton.setAttribute("aria-expanded", "true");
    thisWideButton.setAttribute("aria-pressed", "true");
  }

  setTimeout(function() {
    thisWideButton.setAttribute("aria-expanded", "true");
    thisWideButton.setAttribute("aria-pressed", "true");
  }, 200);
});

// Close - Utility nav dropdown on the utility nav bar overwaps the button to open it once it's open. To close the dropdown, use the close button within the dropdown container. This is the control for that inside button.
// TODO: esc key to close the content.
utilWideCloseButton.addEventListener("click", function (e) {
  closeUtilWideContent();
});

function closeUtilWideContent()  {
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

  utilWideButton.closest(".ma__header__hamburger__nav").classList.toggle("util-nav-content-open");
}

// Narrow/in hamburger menu
const utilNarrowButton = document.querySelector(".ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle");
let utilNarrowContent = utilNarrowButton.nextElementSibling;
let utilNarrowContainer = utilNarrowContent.querySelector(".ma__utility-nav__container");

utilNarrowContent.style.maxHeight = "0";
utilNarrowContainer.style.opacity = "0";

utilNarrowButton.addEventListener("click", function(e) {

  const thisButton = e.target.closest(".js-util-nav-toggle");
  const thisNavContainer = e.target.closest(".ma__utility-nav__item");
  utilNarrowContent = thisButton.nextElementSibling;

  if (utilNarrowContent.classList.contains("is-closed")) {
    // TO OPEN

    closeSubMenu();

    thisButton.setAttribute("aria-expanded", "true");
    thisNavContainer.style.pointerEvents = "none";
    /** Slide down. */
    setTimeout(function timeoutFunction() {
      thisNavContainer.removeAttribute("style");
    }, 700);

    /** Show the content. */
    utilNarrowContent.classList.remove("is-closed");
    utilNarrowContent.style.maxHeight = "auto";

    /** Get the computed height of the content. */
    var contentHeight = utilNarrowContent.querySelector(".ma__utility-nav__content-body").clientHeight + "px";

    /** Set the height of the submenu as 0px, */
    /** so we can trigger the slide down animation. */
    utilNarrowContent.style.maxHeight = "0";

    // These height settings displays the bottom border of the parent li at the correct spot.
    utilNarrowContent.style.height = contentHeight;
    utilNarrowContainer.style.height = contentHeight;

    setTimeout(function timeoutFunction() {
      utilNarrowContent.style.maxHeight = contentHeight;
      utilNarrowContainer.style.opacity = "1";
    }, 50);
  } else {
    closeNarrowUtilContent();
  }
});

function closeNarrowUtilContent() {
  const thisNavContainer = utilNarrowButton.closest(".ma__utility-nav__item");

  utilNarrowButton.setAttribute("aria-expanded", "false");
  thisNavContainer.style.pointerEvents = "none";

  setTimeout(function timeoutFunction() {
    thisNavContainer.removeAttribute("style");
  }, 700);

  utilNarrowContent.style.maxHeight = "0";
  utilNarrowContainer.style.opacity = "0";
  setTimeout(function timeoutFunction() {
    utilNarrowContent.classList.add("is-closed");
  }, 500);
}

function closeSubMenu() {
  let openSubMenu = document.querySelector(".submenu-open");
  let openSubMenuButton = openSubMenu.querySelector(".js-main-nav-hamburger__top-link");
  let openSubMenuContent = openSubMenu.querySelector(".js-main-nav-hamburger-content");
  let openSubMenuContainer = openSubMenu.querySelector(".js-main-nav-hamburger__container");

  openSubMenuButton.setAttribute("aria-expanded", "false");
  openSubMenuContent.style.height = "0";
  openSubMenuContainer.style.opacity = 0;

  setTimeout(function timeoutFunction() {
    openSubMenuContent.classList.add("is-closed");
  }, 500);

  setTimeout(function timeoutFunction() {
    openSubMenu.removeAttribute("style");
    openSubMenu.classList.remove("submenu-open");
  }, 700);
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  // ESC to close menus.
  if (e.key === "Escape" || e.which === "27") {

    // Check which menu is open.
    if (utilNavWide.querySelector(".js-util-nav-content").style.opacity === "1") {// Log in to... in Utility nav bar
      closeUtilWideContent();
      utilNavWide.querySelector(".js-util-nav-toggle").focus();
    }
    else if (utilNarrowContent.style.opacity === "1") {// Log in to... in Hamburger menu
      closeNarrowUtilContent();
      setTimeout(function timeoutFunction() {
        utilNarrowButton.focus();
      }, 90);
    }
    else {// Menu button
      closeMenu();
      setTimeout(function timeoutFunction() {
        document.querySelector(".js-header-menu-button").focus();
      }, 100);

      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value").removeAttribute("tabindex");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .direct-link").removeAttribute("tabindex");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle").removeAttribute("tabindex");
    }

    // if (body.classList.contains("show-menu") && utilNarrowContent.style.opacity === "0" ) {// Hamburger menu
      // NOTE: Currently ESC close the hamburger menu, but it doesn't move focus to the menu button as it closes. To set the focus, need to confirm all sub menus are close.
      // closeMenu(); --- THIS IS NOT NECESSARY.
      // menuButton.focus();
    // };
  }
});
