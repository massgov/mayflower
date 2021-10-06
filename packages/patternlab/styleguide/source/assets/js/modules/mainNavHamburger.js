import focusTrapping from "../helpers/focusTrapping.js";

const osInfo = navigator.appVersion;
const body = document.querySelector("body");
let width = body.clientWidth;
let alertlOffsetPosition;
const feedbackButton = document.querySelector(".ma__fixed-feedback-button");
const menuOverlay = document.querySelector(".menu-overlay");
const alertOverlay = document.querySelector(".alert-overlay");

const menuButton = document.querySelector(".js-header-menu-button");

const jumpToSearchButton = document.querySelector(".js-header-search-access-button");
const searchInput = document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input");

const hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");
let menuItems = document.querySelectorAll(".js-main-nav-hamburger-toggle");

let utilNavWide = document.querySelector(".js-utility-nav--wide");
const utilWideGTranslate = document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .ma__utility-nav__translate");
let utilNarrowNav = document.querySelector(".ma__header__hamburger__utility-nav--narrow");
const utilNarrowButton = document.querySelector(".ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle");
let utilNarrowContent = utilNarrowButton ? utilNarrowButton.nextElementSibling : null;
let utilNarrowContainer = utilNarrowContent ? utilNarrowContent.querySelector(".ma__utility-nav__container") : null;

// Check whether the narrow utility nav is open.
const utilNavNarrowCheck = function() {
  return utilNarrowNav ? (utilNarrowNav.offsetWidth > 0 && utilNarrowNav.offsetHeight > 0) : false;
};

// Open and close the menu
if (menuButton !== null) {

  menuButton.addEventListener("click", function (event) {
    event.preventDefault();

    // For Safari, this ensures to move focus to the menu content.
    if (osInfo.indexOf("Safari") !== -1) {
      menuButton.focus();
    }

    toggleMenu();
  });

  // Skip the magnifier icon button (skip to search)
  const logoLink = document.querySelector(".ma__header__hamburger__nav-container .ma__header__hamburger__logo--mobile a");
  if(logoLink) {
    menuButton.addEventListener("keydown", function (e) {
      if (((e.key === "Tab") && !(e.shiftKey && e.key === "Tab")) || ((e.code === "Tab") && !(e.shiftKey && e.code === "Tab"))) {
        if(menuButton.getAttribute("aria-expanded") === "true") {
          setTimeout(function timeoutFunction() {
            logoLink.focus();
          }, 100);
        }
      }
    });

    logoLink.addEventListener("keydown", function (e) {
      if ((e.shiftKey && e.key === "Tab") || (e.shiftKey && e.code === "Tab")) {
        setTimeout(function timeoutFunction() {
          menuButton.focus();
        }, 100);
      }
    });
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
          closeNarrowUtilContent();
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

      let openSubmenu = document.querySelector(".submenu-open .js-main-nav-hamburger__top-link");
      let openTopMenuUnit = document.querySelector(".submenu-open");
      // Main nav elements
      if (!openTopMenuUnit || openSubmenu !== document.activeElement) {
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
            // Close sub menu
            openTopMenuUnit.classList.remove("submenu-open");
            openTopMenuUnit.querySelector(".js-main-nav-hamburger__top-link").setAttribute("aria-expanded", "false");
            openTopMenuUnit.style.pointerEvents = "none";
            /** Slide up. */
            openTopMenuUnit.querySelector(".js-main-nav-hamburger-content").style.height = "0";
            openTopMenuUnit.querySelector(".js-main-nav-hamburger__container").style.opacity = "0";
            setTimeout(function timeoutFunction() {
              openTopMenuUnit.removeAttribute("style");
              openTopMenuUnit.querySelector(".js-main-nav-hamburger-content").classList.add("is-closed");
            }, 500);
          }
        }
      }
      else {
        closeMenu();
      }
    }
  });


  // Arrow keyboard navigation in the menu.
  let submenuLinks = document.querySelectorAll(".js-main-nav-hamburger__link");
  submenuLinks.forEach(link => {
    link.addEventListener("keydown", function(e) {
      let targetParent = e.target.closest(".js-main-nav-hamburger__subitem");

      if (e.key === "ArrowDown" || e.code === "ArrowDown") {
        if(targetParent.nextElementSibling) {
          targetParent.nextElementSibling.querySelector("a").focus();
        }
        else {
          // Set focus on the first sibling submenu item link.
          document.querySelector(".js-main-nav-hamburger-content:not(.is-closed) .js-main-nav-hamburger__subitem:first-of-type a").focus();
        }
      }

      if (e.key === "ArrowUp" || e.code === "ArrowUp") {
        if(targetParent.previousElementSibling) {
          targetParent.previousElementSibling.querySelector("a").focus();
        }
        else {
          // Set focus on the last sibling submenu item link.
          document.querySelector(".js-main-nav-hamburger-content:not(.is-closed) .js-main-nav-hamburger__subitem:last-of-type a").focus();
        }
      }
    });
  });

  let narrowUtilContentLinks = document.querySelectorAll(".js-utility-nav--narrow .js-util-nav-content a.js-clickable-link");
  const lastIndex = narrowUtilContentLinks.length - 1;
  narrowUtilContentLinks.forEach(function(link, i) {

    link.addEventListener("keydown", function(e) {
      if (e.key === "ArrowDown" || e.code === "ArrowDown") {
        if (e.target === narrowUtilContentLinks[i]) {
          if (e.target === narrowUtilContentLinks[lastIndex]) {
            i = 0;
          }
          else {
            i++;
          }
        }
        else {
          if (e.target === narrowUtilContentLinks[lastIndex]) {
            i = 0;
          }
          else {
            let targetIndex;
            for (let index = 0; index < narrowUtilContentLinks.length; index++) {
              if (e.target === narrowUtilContentLinks[index]) {
                targetIndex = index;
              }
            }
            i = targetIndex;
            i++;
          }
        }
      }

      if (e.key === "ArrowUp" || e.code === "ArrowUp") {
        if (e.target === narrowUtilContentLinks[i]) {
          if (e.target === narrowUtilContentLinks[0]) {
            i = lastIndex;
          }
          else {
            i--;
          }
        }
        else {
          if (e.target === narrowUtilContentLinks[0]) {
            i = lastIndex;
          }
          else {
            let targetIndex;
            for (let index = lastIndex; index > -1; index--) {
              if (e.target === narrowUtilContentLinks[index]) {
                targetIndex = index;
              }
            }
            i = targetIndex;
            i--;
          }
        }
      }
      narrowUtilContentLinks[i].focus();
    });
  });
}

// hamburger menu keyboard nav
// Tabbing through all links and buttons in the hamburger menu container and the menu button.
document.addEventListener("keydown", function (e) {
  if (menuButton.getAttribute("aria-expanded") === "true") {
    focusTrapping({
      focusableSelectors: "[role='menuitem'], .ma__utility-nav__item .ma__utility-nav__link, .ma__utility-nav__item .ma__utility-nav__container a",
      closeButtonSelector: ".js-header-menu-button",
      modalSelector: ".ma__header__hamburger__nav-container",
      keyEvent: e
    });
  }
});

if (jumpToSearchButton !== null) {
  jumpToSearchButton.addEventListener("click", (e) => {
    e.preventDefault();
    jumpToSearch();
  });
}

function toggleMenu() {
  if(hamburgerMenuContainer) {// To prevent null in the original mobile main nav.
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
    }
  }
}

function closeMenu() {
  commonCloseMenuTasks();
  menuButton.setAttribute("aria-pressed", "false");

  // Set focus on the menu button.
  setTimeout(function timeoutFunction() {
    document.querySelector(".js-header-menu-button").focus();
  }, 100);

  if (document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .direct-link").hasAttribute("tabindex")) {
    if (utilWideGTranslate) {// Google translate elements aren't rendered screen width under 840px and the object is null.
      utilWideGTranslate.querySelector("a").removeAttribute("tabindex");
    }
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .direct-link").removeAttribute("tabindex");
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .js-util-nav-toggle").removeAttribute("tabindex");
    document.querySelector(".js-header-search-access-button").removeAttribute("tabindex");
  }

  if (body.style.position === "fixed") {
    // At the same time, the alert needs to be scrolled up to the position again to retain the page elements position.
    body.removeAttribute("style");
    body.style.position = "relative";
    window.scrollTo(0, alertlOffsetPosition);
  }
}

function commonCloseMenuTasks() {
  body.classList.remove("show-menu");

  if (document.querySelector("html.stickyTOCtmp")) {
    document.querySelector("html.stickyTOCtmp").classList.add("stickyTOC");
    document.querySelector("html.stickyTOCtmp").classList.remove("stickyTOCtmp");
  }
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open the main menu for mass.gov");

  if (hamburgerMenuContainer.hasAttribute("style")) {
    hamburgerMenuContainer.removeAttribute("style");
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
  if (alertOverlay) {
    alertOverlay.classList.remove("overlay-open");
    alertOverlay.removeAttribute("style");
  }
}

function openMenu() {
  let heightAboveMenuContainer;
  let emergencyAlertsHeight;
  let alertOffsetAdjusted = 0;
  // Set the alert to its offset position in the window to prevent the page to shift as the menu opens.
  let lockPage = function () {
    if (document.querySelector(".ma__emergency-alerts")) {
      document.querySelector("body").style.top = `-${alertlOffsetPosition}px`;
    } else {
      document.querySelector("body").style.top = 0;
    }

    heightAboveMenuContainer = hamburgerMenuContainer.getBoundingClientRect().top;
  };

  if (document.querySelector("html.stickyTOC")) {
    document.querySelector("html.stickyTOC").classList.add("stickyTOCtmp");
    document.querySelector("html.stickyTOC").classList.remove("stickyTOC");
  }

  // Start open menu tasks.
  body.classList.add("show-menu");

  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close the main menu for mass.gov");
  if (feedbackButton) {
    feedbackButton.classList.add("hide-button");
  }
  jumpToSearchButton.setAttribute("aria-expanded", "true");

  menuButton.setAttribute("aria-pressed", "true");
  let alertsHeader = document.querySelector(".ma__emergency-alerts__header");
  document.querySelector("body").style.position = "fixed";

  // Set buttons between menu button and hamburger menu unfocusable to set focus on the first focusable item in the menu at next tabbing.
  if (utilWideGTranslate && (body.clientWidth > 840)) {// Google translate elements aren't rendered screen width under 840px, and the object is null.
      utilWideGTranslate.querySelector("a").setAttribute("tabindex", "-1");
  }
  document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .direct-link").setAttribute("tabindex", "-1");
  document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .js-util-nav-toggle").setAttribute("tabindex", "-1");

  if (alertsHeader !== null) {
    let emergencyAlerts = document.querySelector(".ma__emergency-alerts");
    emergencyAlertsHeight = emergencyAlerts.offsetHeight;
    alertOffsetAdjusted = alertsHeader.offsetHeight/2;
    alertlOffsetPosition = emergencyAlertsHeight - alertOffsetAdjusted;

    // if (osInfo.indexOf("iPhone") !== -1) {
    //   // Changed the duration value to 600.
    //   customScrollTo(alertlOffsetPosition, 600);
    //   setTimeout(lockPage(), 600);
    // }
    // else {
      // window.scrollTo({
      //   top: 0,
      //   left: 0,
      //   behavior: "smooth"
      // });
      lockPage();
    //}

    let hamburgerNavOffset = document.querySelector(".ma__header__hamburger__nav").offsetHeight;
    heightAboveMenuContainer = alertOffsetAdjusted + hamburgerNavOffset;
    hamburgerMenuContainer.style.height = `calc(100vh - ${heightAboveMenuContainer}px)`;
  }

  if (menuOverlay) {
    let overlayOffset = heightAboveMenuContainer;
    if (width > 840) {
      overlayOffset = overlayOffset -1;
    }
    menuOverlay.style.top = overlayOffset + "px";
    menuOverlay.classList.add("overlay-open");
  }
  if (alertOverlay) {
    if (document.querySelector(".ma__emergency-alerts")) {
      alertOverlay.classList.add("overlay-open");
      alertOverlay.style.height = alertOffsetAdjusted + "px";
    }
  }
}

function jumpToSearch(e) {

  if (body.classList.contains("show-menu")) {
    // This control the visibility of the dropdown to keyboard and screen reader users while maintaining the show/hide animation effect.
    hamburgerMenuContainer.setAttribute("aria-hidden", "");
    searchInput.focus();
  } else {
    hamburgerMenuContainer.removeAttribute("aria-hidden");
    openMenu();
    setTimeout(function timeoutFunction() {
      jumpToSearchButton.setAttribute("aria-pressed", "true");
      searchInput.setAttribute("autofocus", "");
      searchInput.focus();
    }, 200);
  }
}

function anotherCloseSubMenus(item) {
  menuItems.forEach((li) => {
    if (item !== li && li.classList.contains("submenu-open")) {
      li.classList.remove("submenu-open");
      li.querySelector(".js-main-nav-hamburger__top-link").setAttribute("aria-expanded", "false");
      li.style.pointerEvents = "none";
      /** Slide up. */
      li.querySelector(".js-main-nav-hamburger-content").style.height = "0";
      li.querySelector(".js-main-nav-hamburger__container").style.opacity = "0";
      setTimeout(function timeoutFunction() {
        li.removeAttribute("style");
        li.querySelector(".js-main-nav-hamburger-content").classList.add("is-closed");
      }, 500);
    }
  });
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
if (alertOverlay !== null) {
  alertOverlay.addEventListener("click", () => {
    closeMenu();
  });
}

let debouncer;
window.addEventListener("resize", function () {
  clearTimeout(debouncer);
  const osInfo = navigator.appVersion;
  // On Android devices resize event is triggered when keyboard appears
  // and it closes the menu.
  if (osInfo.indexOf("Android") === -1 && osInfo.indexOf("iPhone") === -1) {
    debouncer = setTimeout(() => {
      closeMenu();
    }, 100);
  }
});


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

      thisWideButton.setAttribute("aria-expanded", "true");
      thisWideButton.setAttribute("aria-pressed", "true");
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
      utilNarrowContent.removeAttribute("aria-hidden");
      thisNavContainer.style.pointerEvents = "none";
      /** Slide down. */
        thisNavContainer.removeAttribute("style");

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

        utilNarrowContent.style.maxHeight = contentHeight;
        utilNarrowContainer.style.opacity = "1";
    } else {
      closeNarrowUtilContent();
    }
  });
}

function closeNarrowUtilContent() {
  if (utilNarrowContent) {
    const thisNavContainer = utilNarrowButton.closest(".ma__utility-nav__item");

    utilNarrowButton.setAttribute("aria-expanded", "false");
    utilNarrowContent.setAttribute("aria-hidden", "true");
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

    openSubMenuContent.classList.add("is-closed");

    openSubMenu.removeAttribute("style");
    openSubMenu.classList.remove("submenu-open");
  }
}

// Target iOS Safari versions less than 11 to handle issues that cannot be targeted
// with behavior detection due to either buggy or idiosyncratic browser implementation
// issues addressed in later major versions.
if (osInfo.indexOf("Safari") !== -1) {
  osInfo.split(" ").forEach(function(splitVar) {
    if (splitVar.length > 0 && splitVar.indexOf("Version/", 0) !== false) {
      let version = splitVar.match(/\d+/);
      if (version !== null && version[0] < 11) {
        body.classList.add("ios-safari-less-than-11");
      }
    }
  });
}

menuItems.forEach((item) => {

  const itemButton = item.querySelector(".js-main-nav-hamburger__top-link");
  const subMenu = item.querySelector(".js-main-nav-hamburger-content");
  const subItems = subMenu.querySelector(".js-main-nav-hamburger__container");
  subItems.style.opacity = "0";
  itemButton.addEventListener("click", (e) => {

    anotherCloseSubMenus(item);

    if (item.classList.contains("submenu-open")) {
      item.classList.remove("submenu-open");
      itemButton.setAttribute("aria-expanded", "false");
      item.style.pointerEvents = "none";

      setTimeout(function timeoutFunction() {
         //item.style.height = "0";
         //item.style.opacity = "0";
         item.removeAttribute("style");
      }, 700);
    } else {
      item.classList.add("submenu-open");
      itemButton.setAttribute("aria-expanded", "true");
      item.style.pointerEvents = "none";
      setTimeout(function timeoutFunction() {
        item.removeAttribute("style");
      }, 500);
    }

    if (item.querySelector(".js-main-nav-hamburger-content").classList.contains("is-closed")) {
      /** Show the subMenu. */

      item.querySelector(".js-main-nav-hamburger-content").classList.remove("is-closed");
      item.querySelector(".js-main-nav-hamburger-content").style.height = "auto";

      /** Get the computed height of the subMenu. */
      const height = item.querySelector(".js-main-nav-hamburger-content").clientHeight + "px";


      /** Set the height of the submenu as 0px, */
      /** so we can trigger the slide down animation. */
      item.querySelector(".js-main-nav-hamburger-content").style.height = "0";

      setTimeout(function timeoutFunction() {
        item.querySelector(".js-main-nav-hamburger-content").style.height = height;
        item.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });

        subItems.style.opacity = "1";
      }, 500);

      /** Close Utility menu content when a sub menu is open. */
      if (width < 840) {
        closeNarrowUtilContent();
      }
    }
    else {
      item.querySelector(".js-main-nav-hamburger-content").style.height = "0";
      subItems.style.opacity = "0";

      // Set a little bit of delay to run
      // The open/close submenu animation is CSS.
      // Unable to confirm the completion of the animation in JS.
      // Unable to use callback in this case.
      setTimeout(function timeoutFunction() {
        item.querySelector(".js-main-nav-hamburger-content").classList.add("is-closed");

      }, 500);
    }

  });

  itemButton.addEventListener("keydown", function (e) {
    if (e.code == "ArrowDown" || e.key == "ArrowDown") {
      let first = subItems.getElementsByTagName("li")[0];
      first.querySelector(".js-main-nav-hamburger__link").focus();
    }
  });

});


// Close Google Translate option container with ESC.
// Set focus on the (closest/visible) Google Translate button whether it's on the blue bar or in the hamburger menu.
setTimeout(function timeoutFunction() {// This prevents GT elements get null.
  let gTranslateButtons = document.querySelectorAll(".ma__utility-nav__translate #google_translate_element a");
  const gTranslateOptionContainer = document.querySelector("iframe.goog-te-menu-frame.skiptranslate");

  if (gTranslateOptionContainer) {
    gTranslateOptionContainer.contentWindow.document.addEventListener("keydown", function (e) {
      let key = e.code ? e.code : e.key;
      if (key == "Escape" || key === "Esc" ) {
        gTranslateOptionContainer.style.display = "none";
        gTranslateButtons[0].focus();
      }
    });
  }
}, 500);
