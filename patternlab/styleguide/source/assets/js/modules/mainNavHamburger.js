const body = document.querySelector("body");
let width = body.clientWidth;
const feedbackButton = document.querySelector(".ma__fixed-feedback-button");
const menuBarHeight = document.querySelector(".ma__header__hamburger__nav") ? document.querySelector(".ma__header__hamburger__nav").offsetHeight : null;
const menuOverlay = document.querySelector(".menu-overlay");

const menuButton = document.querySelector(".js-header-menu-button");

const jumpToSearchButton = document.querySelector(".js-header-search-access-button");
const searchInput = document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input");

const hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");
let menuItems = document.querySelectorAll(".js-main-nav-hamburger-toggle");

let utilNavWide = document.querySelector(".js-utility-nav--wide");
let utilNarrowNav = document.querySelector(".ma__header__hamburger__utility-nav--narrow");
const utilNarrowButton = document.querySelector(".ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle");
let utilNarrowContent = utilNarrowButton ? utilNarrowButton.nextElementSibling : null;
let utilNarrowContainer = utilNarrowContent ? utilNarrowContent.querySelector(".ma__utility-nav__container") : null;

// Check whether the wide utility nav is open.
const utilNavWideCheck = function() {
  return utilNavWide ? (utilNavWide.offsetWidth > 0 && utilNavWide.offsetHeight > 0) : null;
};

/** DP-19336 begin: add padding to hamburger menu to allow scrolling when alerts are loaded */
const hamburgerMainNav = document.querySelector(".ma__header__hamburger__main-nav");
let emergencyAlerts = document.querySelector(".ma__emergency-alerts__content");
let hamburgerMenuAlertScrolling = function() {
  if (hamburgerMainNav !== null && emergencyAlerts !== null && utilNavWideCheck() !== false) {
    let alertHeight = document.querySelector(".ma__emergency-alerts").clientHeight || 0;
    let hamburgerMenuTop = document.querySelector(".ma__header__hamburger__nav-container").offsetTop || 0;

    // Add bottom padding when function is initially called.
    hamburgerMainNav.style.paddingBottom = alertHeight + hamburgerMenuTop + "px";

    // Add bottom padding when alert style changes occur.
    const alertObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutationRecord) {
        if (mutationRecord.oldValue !== null && utilNavWideCheck() !== false) {
          let result = {};
          let attributes = mutationRecord.oldValue.split(";");
          for (let i = 0; i < attributes.length; i++) {
            let entry = attributes[i].split(":");
            result[entry.splice(0,1)[0]] = entry.join(":");
          }

          let oldDisplayValue = result.display ? result.display.trim() : null;
          let currentDisplayValue = document.querySelector(".ma__emergency-alerts__content").style.display;
          if (currentDisplayValue === oldDisplayValue) {
            alertHeight = document.querySelector(".ma__emergency-alerts").clientHeight;
            hamburgerMainNav.style.paddingBottom = alertHeight + hamburgerMenuTop + "px";
          }
        }
      });
    });
    alertObserver.observe(emergencyAlerts, {
      attributes : true,
      attributeFilter: ["style"],
      attributeOldValue: true
    });
  }
};

// Not ideal, but this is here to wait for alerts to load via AJAX.
const maAjaxPattern = document.querySelectorAll(".ma__ajax-pattern");
let siteAlertWrapper = null;
if (maAjaxPattern !== null) {
  maAjaxPattern.forEach(function(value, key) {
    if (value.dataset.maAjaxRenderPattern === "@organisms/by-template/emergency-alerts.twig") {
      siteAlertWrapper = value;
    }
  });
}

if (siteAlertWrapper !== null) {
  const jsonApiObserver = new MutationObserver(function(mutations, observer) {
    emergencyAlerts = document.querySelector(".ma__emergency-alerts__content");
    if (emergencyAlerts !== null) {
      observer.disconnect();
    }
    hamburgerMenuAlertScrolling();
  });
  jsonApiObserver.observe(siteAlertWrapper, {
    childList: true
  });
}
else {
  hamburgerMenuAlertScrolling();
}
/** DP-19336 end */

// Open and close the menu
if (menuButton !== null) {

  menuButton.addEventListener("click", function (event) {
    event.preventDefault();

    toggleMenu();
  });

  // for touch devices
  menuButton.addEventListener("touchend", function (event) {
    event.preventDefault();

    toggleMenu();
  });

  menuButton.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.code === "Tab") {
      if (width < 621) {
        hamburgerMenuContainer.setAttribute("tabindex", "0");
        hamburgerMenuContainer.focus();
      }
    }
  });

  const firstTopMenuItem = document.querySelector(".ma__header__hamburger__nav .ma__main__hamburger-nav__item:first-of-type .js-main-nav-hamburger__top-link");
  // To accomodate both button and link as the last top menu item, use 'ma__' classes instead of 'js-'.
  const lastTopMenuItem = document.querySelector(".ma__main__hamburger-nav__item:last-of-type .ma__main__hamburger-nav__top-link");
  const lastSubmenuLink = document.querySelector(".js-main-nav-hamburger-toggle:last-of-type .js-main-nav-hamburger-content .js-main-nav-hamburger__subitem:last-of-type .js-main-nav-hamburger__link");
  const lastUtilMenuItem = document.querySelector(".js-utility-nav--narrow .ma__utility-nav__item:last-of-type .ma__utility-nav__link");
  const lastUtilMenuContentLink = document.querySelector(".js-utility-nav--narrow .ma__utility-nav__item:last-of-type .ma__utility-panel:last-of-type .js-clickable:last-of-type .js-clickable-link");
  // no utility nav, sub menu closed
  if (lastTopMenuItem) {
    lastTopMenuItem.addEventListener("keydown", function (e) {
      // Without this, sift + tab set focus on the first top menu button.
      if ((e.shiftKey && e.key === "Tab") || (e.shiftKey && e.code === "Tab")) {
        if (width < 841) {
          setTimeout(function timeOutFunction () {
            this.closest(".js-main-nav-hamburger-toggle").previousElementSibling.querySelector(".ma__main__hamburger-nav__top-link").focus();
          }, 1);
        }
      }
      else if (e.key === "Tab" || e.code === "Tab") {
        if (width > 840) {
          if (!this.hasAttribute("aria-expanded")) {// For link
            setFocusOnFirstTopMenu();
          }
          else {// For buttons
            if(this.getAttribute("aria-expanded") === "false") {
              setFocusOnFirstTopMenu();
            }
          }
        }
      }
    });

    // no utility nav, last sub menu open
    if(lastTopMenuItem === document.querySelector(".ma__main__hamburger-nav__item:last-of-type button")) {
      lastSubmenuLink.addEventListener("keydown", function (e) {
        const subMenuContainer = this.closest(".js-main-nav-hamburger-content");
        if ((e.key === "Tab" || e.code === "Tab") && !subMenuContainer.classList.contains(".is-closed")) {
          // Close the submenu and move focus to the first top menu button.
          if (width > 840) {
            closeSubMenu();
            setFocusOnFirstTopMenu();
          }
        }
      });
    }
  }

  if (lastUtilMenuItem) {
    // with utility nav, utility nav content closed
    lastUtilMenuItem.addEventListener("keydown", function (e) {
      if (e.key === "Tab" || e.code === "Tab") {
        if (width < 841 && (this.getAttribute("aria-expanded") === "false")) {
          setFocusOnFirstTopMenu();
        }
      }
    });

    // with utility nav, last utility nav content open
    lastUtilMenuContentLink.addEventListener("keydown", function (e) {
      // Without this, sift + tab set focus on the first top menu button.
      if ((e.shiftKey && e.key === "Tab") || (e.shiftKey && e.code === "Tab")) {
        if (width < 841) {
          setTimeout(function timeOutFunction () {
            this.closest(".js-clickable").previousElementSibling.querySelector("a").focus();
          }, 1);
        }
      }
      else if (e.key === "Tab" || e.code === "Tab") {
        // Close the nav content and move focus to the first top menu button.
        if (width < 841) {
          closeNarrowUtilContent();
          setFocusOnFirstTopMenu();
        }
      }
    });
  }



  function setFocusOnFirstTopMenu () {
    // Timeout function is necessary to set focus on the first top menu button. Otherwise, focus is set on next focusable element outside the menu.
    setTimeout(function timeOutFunction () {
      firstTopMenuItem.focus();
    }, 1);
  }

  document.addEventListener("keydown", function (e) {
    // ESC to close menus.
    // 'e.key === "Esc"' is necessary for IE11.
    if (e.key === "Escape" || e.key === "Esc" || e.code === "Escape") {
      // Log in to... in Utility nav bar
      if (utilNavWide.querySelector(".js-util-nav-content").style.opacity === "1") {
        closeUtilWideContent();
        utilNavWide.querySelector(".js-util-nav-toggle").focus();
      }

      // Util nav menus in the hamburger menu
      if (utilNarrowNav) {
        if ((utilNarrowButton !== document.activeElement) && (utilNarrowContainer.style.opacity === "1")) {// Open Log in to... in Hamburger menu: To be consisitent with submenu, keep the content open and set focus on nav button.
          let utilNavContentLinks = utilNarrowNav.querySelectorAll(".js-clickable-link");
          for (let i = 0; i < utilNavContentLinks.length; i++) {
            if (utilNavContentLinks[i].innerText === document.activeElement.innerText) {
              utilNarrowButton.focus();
            }
          }
        }
        else {
          let narrowNavItems = utilNarrowNav.querySelectorAll(".ma__utility-nav__link");
          for (let i = 0; i < narrowNavItems.length; i++) {
            if (narrowNavItems[i].innerText === document.activeElement.innerText) {
              closeMenu();
            }
          }
        }
      }

      // Main nav elements
      let openSubmenu = document.querySelector(".submenu-open .js-main-nav-hamburger__top-link");
      if (openSubmenu !== document.activeElement) {
        // To prevent to set focus on another top menu button with open submenu.
        const menus = document.querySelectorAll(".ma__main__hamburger-nav__top-link");
        for(let i = 0; i < menus.length; i++) {
          if (menus[i] === document.activeElement) {
            closeMenu();
          }
        }

        // Set focus on its parent top menu button.
        let openSubmenuItems = document.querySelectorAll(".submenu-open .js-main-nav-hamburger-content:not(is-closed) .js-main-nav-hamburger__link");
        for(let i = 0; i < openSubmenuItems.length; i++) {
          if (openSubmenuItems[i] === document.activeElement) {
            openSubmenu.focus();
          }
        }
      }
      else {
        closeMenu();
      }
    }
  });

  // NOTE: KEEPING BELOW FOR MORE KEYBOARD NAVIGATION WORK AFTER ACCESSIBILITY TEST.
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

    // if (e.code == "Escape" || e.key == "Escape"|| e.key === "Esc") {
    //   closeMenu();
    // }
  // });
}

[].forEach.call(menuItems, function (item, i, arr) {

  const itemButton = item.querySelector(".js-main-nav-hamburger__top-link");
  const subMenu = item.querySelector(".js-main-nav-hamburger-content");
  const subItems = subMenu.querySelector(".js-main-nav-hamburger__container");
  let subMenuItems = subMenu.querySelectorAll(".js-main-nav-hamburger__subitem");

  subItems.style.opacity = "0";

  itemButton.addEventListener("click", function (e) {

    closeSubMenus(item);

    // Set a little bit of delay to run
    // The open/close submenu animation is CSS. Unable to confirm the completion of the animation in JS. Unable to use callback in this case.
    setTimeout(function timeoutFunction() {
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
        if (width < 840) {
          closeNarrowUtilContent();
        }
      }
      else {
        subMenu.style.height = "0";
        subItems.style.opacity = "0";

        setTimeout(function timeoutFunction() {
        subMenu.classList.add("is-closed");

        }, 500);
      }
    }, 230);
  });

  itemButton.addEventListener("keydown", function (e) {

    if (e.code == "ArrowDown" || e.key == "ArrowDown") {
      let first = subItems.getElementsByTagName("li")[0];
      first.querySelector(".js-main-nav-hamburger__link").focus();
    }

    // 'e.key === "Esc"' is for IE11.
    if (e.code == "Escape" || e.key == "Escape" || e.key === "Esc") {
      if (item.classList.contains("submenu-open")) {
        // NOTE: KEEP BELOW COMMENTED LINES UNTIL THE DESIGN TEAM FINALIZES THE BEHAVIOR.

        // subItems.style.opacity = "0";
        // subMenu.style.height = "0";
        // itemButton.parentElement.classList.remove("submenu-open");
        // itemButton.setAttribute("aria-expanded", "false");

        // setTimeout(function timeoutFunction() {
        //   subMenu.classList.add("is-closed");
        // }, 500);

      // }
      // else {
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
      }
    });
  });
});

if (jumpToSearchButton !== null) {
  jumpToSearchButton.addEventListener("click", (e) => {
    e.preventDefault();
    jumpToSearch();
  });

  jumpToSearchButton.addEventListener("touchend", (e) => {
    e.preventDefault();

    jumpToSearch();
  }, false);
}

// Adjust the overlay position as the alert accordion opens/closes while the menu is open.
setTimeout(function timeoutFunction() {
  if (document.querySelector(".js-ajax-pattern")) {
    document.querySelector(".ma__button-alert").addEventListener("click", function () {
      if (body.classList.contains("show-menu")) {
        let openAboveNavBar = document.querySelector(".js-accordion-content").getBoundingClientRect().top;
        let closeOverlayOffset = openAboveNavBar + menuBarHeight;
        if (document.querySelector(".js-emergency-alerts").classList.contains("is-open") === true) {
          if (width > 840) {
            closeOverlayOffset = closeOverlayOffset -1;
          }
          menuOverlay.style.top = closeOverlayOffset + "px";
        }

        // When the alert is close, wait till accordion animation to complete
        // to get the complete height of the alert header and the accordion content.
        if (document.querySelector(".js-emergency-alerts").classList.contains("is-open") === false) {
          setTimeout(function () {
            let openOverlayOffset = document.querySelector(".ma__header__hamburger").getBoundingClientRect().top + menuBarHeight;

            if (width > 840) {
              openOverlayOffset = openOverlayOffset -1;
            }
            menuOverlay.style.top = openOverlayOffset + "px";
          }, 400);
        }
      }
    });
  }
}, 1000);

function toggleMenu() {
  if (body.classList.contains("show-menu")) {
    // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
    // .toggleAttribute() doesn't work with ios11.
    hamburgerMenuContainer.setAttribute("aria-hidden", "");
    closeMenu();

    setTimeout(function timeoutFunction() {
      document.querySelector(".js-header-menu-button").focus();
    }, 100);
  } else {
    hamburgerMenuContainer.removeAttribute("aria-hidden");
    openMenu();

    if (utilNavWideCheck() === false) {
      hamburgerMainNav.style.paddingBottom = 0;
    }
    // Set buttons between menu button and hamburger menu unfocusable to set focus on the first focusable item in the menu at next tabbing.
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value").setAttribute("tabindex", "-1");
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .direct-link").setAttribute("tabindex", "-1");
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle").setAttribute("tabindex", "-1");
  }
}

function closeMenu() {
  commonCloseMenuTasks();
  menuButton.setAttribute("aria-pressed", "false");

  // Set focus on the menu button.
  setTimeout(function timeoutFunction() {
    document.querySelector(".js-header-menu-button").focus();
  }, 100);

  if ((width > 840) && document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .direct-link").hasAttribute("tabindex")) {
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value").removeAttribute("tabindex");
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .direct-link").removeAttribute("tabindex");
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle").removeAttribute("tabindex");
    document.querySelector(".js-header-search-access-button").removeAttribute("tabindex");
  }
}

function commonCloseMenuTasks() {
  body.classList.remove("show-menu");

  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open the main menu for mass.gov");

  if (hamburgerMenuContainer.hasAttribute("tabindex")) {
    hamburgerMenuContainer.removeAttribute("tabindex");
  }

  if(searchInput.hasAttribute("autofocus")) {
    searchInput.removeAttribute("autofocus");
  }

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

function commonOpenMenuTasks() {
  body.classList.add("show-menu");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close the main menu for mass.gov");
  if (feedbackButton) {
    feedbackButton.classList.add("hide-button");
  }
  jumpToSearchButton.setAttribute("aria-expanded", "true");
  if (menuOverlay) {
    offsetMenuOverlay();
    menuOverlay.classList.add("overlay-open");
  }
}

function offsetMenuOverlay () {
  let overlayOffset = document.querySelector(".ma__header__hamburger").getBoundingClientRect().top + menuBarHeight;
  if (width > 840) {
    overlayOffset = overlayOffset -1;
  }
  menuOverlay.style.top = overlayOffset + "px";
}

function jumpToSearch(e) {

  if (body.classList.contains("show-menu")) {
    // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
    hamburgerMenuContainer.setAttribute("aria-hidden", "");
    searchInput.focus();
  } else {
    hamburgerMenuContainer.removeAttribute("aria-hidden");
    commonOpenMenuTasks();
    jumpToSearchButton.setAttribute("aria-pressed", "true");
    // Set focus on the search input field.
    const osInfo = navigator.appVersion;
    if (osInfo.indexOf("iPhone") !== -1) {
      // Set up a temp input to display onscreen keyboard.
      const __tempEl = document.createElement("input");
      document.body.appendChild(__tempEl);
      __tempEl.classList.add("ma__visually-hidden");
      __tempEl.focus();

      setTimeout(function timeoutFunction() {
        searchInput.setAttribute("autofocus", "");
        // Setting focus on the search box twice. Both are necessary to make it work.
        searchInput.focus();
        // Remove the temp input.
        // Timings are set differently per version to minimize the awekwardness by delay.
        if (osInfo.indexOf("OS 12") !== -1) {
          setTimeout(function removeTempInput() {
            cleanUpTemp();
          }, 300);
        } else if (osInfo.indexOf("OS 11") !== -1) {
          setTimeout(function removeTempInput() {
            cleanUpTemp();
          }, 170);
        } else {
          setTimeout(function removeTempInput() {
            cleanUpTemp();
          }, 70);
        }

        function cleanUpTemp() {
          searchInput.focus();
          document.body.removeChild(__tempEl);
        }
      }, 70);
    }
    else {
      setTimeout(function timeoutFunction() {
        searchInput.setAttribute("autofocus", "");
        searchInput.focus();
      }, 70);
    }
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

      siblings[i].classList.remove("submenu-open");
      siblings[i].querySelector(".js-main-nav-hamburger__top-link").setAttribute("aria-expanded", "false");
      siblings[i].style.pointerEvents = "none";

      setTimeout(function timeoutFunction() {
        siblings[i].removeAttribute("style");
      }, 700);

      /** Slide up. */
      siblings[i].querySelector(".js-main-nav-hamburger-content").style.height = "0";
      siblings[i].querySelector(".js-main-nav-hamburger__container").style.opacity = "0";

      setTimeout(function timeoutFunction() {
        siblings[i].querySelector(".js-main-nav-hamburger-content").classList.add("is-closed");

      }, 500);
    }
  }
}

// Close menu when utility nav is clicked
if ((utilNavWide !== null) && body.classList.contains("show-menu")) {
  closeMenu();
}

// Close and reset menu on overlay click
if (null !== menuOverlay) {
  menuOverlay.addEventListener("click", () => {
    closeMenu();
  });
}

let debouncer;
window.onresize = function () {
  clearTimeout(debouncer);
  debouncer = setTimeout( () => {
    width = body.clientWidth;
    if (utilNavWideCheck() !== false) {
      hamburgerMenuAlertScrolling();
    }
  }, 100);
};


// ** Utility nav

// Wide/utility nav bar
const utilWideButton = document.querySelector(".js-utility-nav--wide .js-util-nav-toggle");
const utilWideCloseButton = document.querySelector(".js-utility-nav--wide .js-close-util-nav");
const utilWideContent = document.querySelector(".js-utility-nav--wide .js-util-nav-content");
if (utilWideButton !== null && utilWideCloseButton !== null && utilWideContent !== null) {
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

    setTimeout(function () {
      thisWideButton.setAttribute("aria-expanded", "true");
      thisWideButton.setAttribute("aria-pressed", "true");
    }, 200);
  });
}

// Close - Utility nav dropdown on the utility nav bar overwaps the button to open it once it's open. To close the dropdown, use the close button within the dropdown container. This is the control for that inside button.
if (utilWideCloseButton !== null) {
  utilWideCloseButton.addEventListener("click", function (e) {
    closeUtilWideContent();
  });
}

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
if (utilNarrowButton !== null) {
  // utilNarrowContent = utilNarrowButton.nextElementSibling;
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
      utilNarrowContent.style.Height = "0";

      // These height settings display the bottom border of the parent li at the correct spot.
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
}

function closeNarrowUtilContent() {
  if (utilNarrowContent) {
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
}

function closeSubMenu() {
  let openSubMenu = document.querySelector(".submenu-open");

  if (openSubMenu) {
    let openSubMenuButton = openSubMenu.querySelector(".js-main-nav-hamburger__top-link");
    let openSubMenuContent = openSubMenu.querySelector(".js-main-nav-hamburger-content");
    let openSubMenuContainer = openSubMenu.querySelector(".js-main-nav-hamburger__container");

    openSubMenuButton.setAttribute("aria-expanded", "false");
    openSubMenuContent.style.height = "0";
    openSubMenuContainer.style.opacity = "0";

    setTimeout(function timeoutFunction() {
      openSubMenuContent.classList.add("is-closed");
    }, 500);

    setTimeout(function timeoutFunction() {
      openSubMenu.removeAttribute("style");
      openSubMenu.classList.remove("submenu-open");
    }, 700);
  }
}
