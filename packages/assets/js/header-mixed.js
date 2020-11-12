"use strict";

(function () {
  window.__forceSmoothScrollPolyfill__ = true;
  var script = document.createElement('script');
  script.src = "https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.js";
  script.crossOrigin = true;
  var element = document.getElementsByTagName('head')[0];
  element.appendChild(script);
})();

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: '',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
  document.querySelector('#google_translate_element') !== null ? document.querySelector('#google_translate_element').classList.add('has-rendered') : '';
}

(function () {
  var script = document.createElement('script');
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  var element = document.getElementsByTagName('head')[0];
  element.appendChild(script);
})();

(function (window, document, $, undefined) {
  var windowWidth = window.innerWidth;
  window.addEventListener("resize", function () {
    windowWidth = window.innerWidth;
  });
  document.querySelectorAll(".js-main-nav").forEach(function ($parent) {
    var openClass = "is-open",
        hasFocus = "has-focus",
        closeClass = "is-closed",
        submenuClass = "show-submenu",
        $mainNavItem = $parent.querySelectorAll(".js-main-nav-toggle"),
        breakpoint = 840; // matches CSS breakpoint for Main Nav

    $mainNavItem.forEach(function ($link) {
      $link.addEventListener("keydown", function (e) {
        // Grab all the DOM info we need...
        var $otherLinks = $mainNavItem.filter(function (child) {
          return e.currentTarget !== $link;
        }),
            $topLevelLinks = $parent.querySelectorAll(".ma__main-nav__top-link"),
            open = $link.classList.contains(openClass),
            $openContent = $parent.querySelectorAll(".js-main-nav-content." + openClass),
            $focusedElement = document.activeElement,
            menuFlipped = windowWidth < breakpoint,
            // relevant if open..
        $topLevelItem = $focusedElement.closest(".ma__main-nav__item"),
            $topLevelLink = $topLevelItem.querySelector(".ma__main-nav__top-link"),
            $dropdownLinks = $link.querySelectorAll(".ma__main-nav__subitem .ma__main-nav__link"),
            dropdownLinksLength = $dropdownLinks.length,
            focusIndexInDropdown = Array.from($dropdownLinks).findIndex(function (link) {
          return link === $focusedElement;
        }),
            // Easy access to the key that was pressed.
        keycode = e.keyCode,
            action = {
          skip: keycode === 9,
          // tab
          close: keycode === 27,
          // esc
          left: keycode === 37,
          // left arrow
          right: keycode === 39,
          // right arrow
          up: keycode === 38,
          // up arrow
          down: keycode === 40,
          // down arrow
          space: keycode === 32,
          //space
          enter: keycode === 13 // enter

        }; // Default behavior is prevented for all actions except 'skip'.

        if (action.close || action.left || action.right || action.up || action.down) {
          e.preventDefault();
        }

        if (action.enter || action.space) {
          $link.classList.add(hasFocus);
          $otherLinks.classList.remove(hasFocus);
        }

        if (action.skip) {
          console.log(focusIndexInDropdown);
        }

        if (action.skip && dropdownLinksLength === focusIndexInDropdown + 1) {
          console.log(focusIndexInDropdown);
          hide($openContent);
          $topLevelLink.setAttribute("aria-expanded", "false");
          $link.classList.remove(hasFocus);
          return;
        } // if (action.skip && focusIndexInDropdown === -1) {
        //   console.log('back');
        // }
        // Navigate into or within a submenu. This is needed on up/down actions
        // (unless the menu is flipped and closed) and when using the right arrow
        // while the menu is flipped and submenu is closed.


        if ((action.up || action.down) && !(menuFlipped && !open) || action.right && menuFlipped && !open) {
          // Open pull down menu if necessary.
          if (!open && !$link.classList.contains(hasFocus)) {
            show($topLevelItem.querySelector(".js-main-nav-content"));
            $topLevelLink.setAttribute("aria-expanded", "true");
            $link.classList.add(openClass);
          } // Adjust index of active menu item based on performed action.


          focusIndexInDropdown += action.up ? -1 : 1; // If the menu is flipped, skip the last item in each submenu. Otherwise,
          // skip the first item. This is done by repeating the index adjustment.

          if (menuFlipped) {
            if (focusIndexInDropdown === dropdownLinksLength - 1) {
              focusIndexInDropdown += action.up ? -1 : 1;
            }
          } else {
            if (focusIndexInDropdown === 0 || focusIndexInDropdown >= dropdownLinksLength) {
              focusIndexInDropdown += action.up ? -1 : 1;
            }
          } // Wrap around if at the end of the submenu.


          focusIndexInDropdown = (focusIndexInDropdown % dropdownLinksLength + dropdownLinksLength) % dropdownLinksLength;
          $dropdownLinks[focusIndexInDropdown].focus();
          return;
        } // Close menu and return focus to menubar


        if (action.close || menuFlipped && action.left) {
          hide($openContent);
          $link.classList.remove(openClass);
          $link.classList.remove(hasFocus);
          $topLevelLink.focus();
          $topLevelLink.setAttribute("aria-expanded", "false");
          return;
        } // Navigate between submenus. This is needed for left/right actions in
        // normal layout, or up/down actions in flipped layout (when nav is closed).


        if ((action.left || action.right) && !menuFlipped || (action.up || action.down) && menuFlipped && !open) {
          var index = Array.from($topLevelLinks).findIndex(function (link) {
            return link === $topLevelLink;
          }),
              prev = action.left || action.up,
              linkCount = $topLevelLinks.length; // hide content
          // If menubar focus
          //  - Change menubar item
          //
          // If dropdown focus
          //  - Open previous pull down menu and select first item

          hide($openContent);
          $topLevelLink.setAttribute("aria-expanded", "false");
          $link.classList.remove(hasFocus); // Get previous item if left arrow, next item if right arrow.

          index += prev ? -1 : 1; // Wrap around if at the end of the set of menus.

          index = (index % linkCount + linkCount) % linkCount;
          $topLevelLinks[index].focus();
          return;
        }
      });
      $link.addEventListener("mouseenter", function (e) {
        $link.querySelector("button").setAttribute("aria-expanded", "true");

        if (document.querySelector(".has-focus")) {
          document.querySelector(".has-focus").classList.remove("has-focus");
        }

        if (windowWidth > breakpoint) {
          var $openContent = e.currentTarget.querySelector(".js-main-nav-content");
          show($openContent);
        }
      });
      $link.addEventListener("mouseleave", function (e) {
        e.currentTarget.querySelector("button").setAttribute("aria-expanded", "false");

        if (windowWidth > breakpoint) {
          var $openContent = e.currentTarget.querySelector(".js-main-nav-content");
          hide($openContent);
        }
      });
      $link.querySelectorAll("button, a").forEach(function (child) {
        child.addEventListener("click", function (e) {
          var $el = e.currentTarget,
              $elParent = $el.parentElement,
              $content = $elParent.querySelector(".js-main-nav-content"),
              $openContent = $parent.querySelector(".js-main-nav-content." + openClass),
              isOpen = $content.classList.contains(openClass); // mobile

          if (windowWidth <= breakpoint) {
            e.preventDefault(); // add open class to this item

            $elParent.classList.add(openClass);
            show($content);
            $el.setAttribute("aria-expanded", "true");
          } else {
            hide($openContent);
            $el.setAttribute("aria-expanded", "false");

            if (!isOpen) {
              show($content);
              $el.setAttribute("aria-expanded", "true");
            }
          }
        });
      });

      if (document.querySelector(".js-close-sub-nav")) {
        document.querySelector(".js-close-sub-nav").addEventListener("click", function () {
          var $openContent = $parent.querySelector(".js-main-nav-content." + openClass);
          hide($openContent);
        }); // Hide any open submenu content when the sidebar menu is closed
      }

      document.querySelector(".js-header-menu-button").addEventListener("click", function () {
        var $openContent = $parent.querySelector(".js-main-nav-content." + openClass);
        hide($openContent);
        document.querySelector(".ma__utility-nav__content").classList.add("is-closed");
      });

      function hide($content) {
        document.querySelector("body").classList.remove(submenuClass);

        if ($parent.querySelector("." + openClass)) {
          $parent.querySelector("." + openClass).classList.remove(openClass);
        }

        if (windowWidth <= breakpoint) {
          //this should not animate
          $content.classList.add(closeClass);
        } else {
          //this should animate sliding upwards
          //$content.getAnimations().forEach(contentAnimation => contentAnimation.cancel());
          $content.classList.add(closeClass);
        }
      }

      function show($content) {
        document.querySelector("body").classList.add(submenuClass);

        if (windowWidth <= breakpoint) {
          $content.classList.add(openClass);
          $content.classList.remove(closeClass);
        } else {
          //this should animate sliding downwards
          //$content.getAnimations().forEach(contentAnimation => contentAnimation.cancel());
          $content.classList.add(openClass);
          $content.classList.remove(closeClass); //setInterval(function () {
          //}, 500);
        }
      }
    });
  });
})(window, document, jQuery);

var mixedBody = document.querySelector("body");
var mixedWidth = document.documentElement.clientWidth;
var mixedMenuButton = document.querySelector(".js-header-menu-button");
var mixedMenuOverlay = document.querySelector(".menu-overlay"); // Hide hamburger menu when window size is resized to over 840 while hamburger menu is open.

window.addEventListener("resize", hideHamburgerMenu);

function hideHamburgerMenu() {
  if (mixedWidth > 840) {
    if (mixedBody.classList.contains("show-menu")) {
      mixedBody.classList.remove("show-menu");
      mixedMenuButton.setAttribute("aria-expanded", "false");
      mixedMenuButton.setAttribute("aria-label", "Open the main menu for mass.gov");
      mixedMenuOverlay.classList.remove("overlay-open");
    }
  }
}

var osInfo = navigator.appVersion;
var body = document.querySelector("body");
var width = body.clientWidth;
var alertlOffsetPosition;
var feedbackButton = document.querySelector(".ma__fixed-feedback-button");
var menuOverlay = document.querySelector(".menu-overlay");
var alertOverlay = document.querySelector(".alert-overlay");
var menuButton = document.querySelector(".js-header-menu-button");
var jumpToSearchButton = document.querySelector(".js-header-search-access-button");
var searchInput = document.querySelector(".ma__header__hamburger__nav-container .ma__header-search__input");
var hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");
var menuItems = document.querySelectorAll(".js-main-nav-hamburger-toggle");
var utilNavWide = document.querySelector(".js-utility-nav--wide");
var utilNarrowNav = document.querySelector(".ma__header__hamburger__utility-nav--narrow");
var utilNarrowButton = document.querySelector(".ma__header__hamburger__utility-nav--narrow button.js-util-nav-toggle");
var utilNarrowContent = utilNarrowButton ? utilNarrowButton.nextElementSibling : null;
var utilNarrowContainer = utilNarrowContent ? utilNarrowContent.querySelector(".ma__utility-nav__container") : null; // Check whether the narrow utility nav is open.

var utilNavNarrowCheck = function utilNavNarrowCheck() {
  return utilNarrowNav ? utilNarrowNav.offsetWidth > 0 && utilNarrowNav.offsetHeight > 0 : false;
}; // Open and close the menu


if (menuButton !== null) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault(); // For Safari, this ensures to move focus to the menu content.

    if (osInfo.indexOf("Safari") !== -1) {
      menuButton.focus();
    }

    toggleMenu();
  });
  menuButton.addEventListener("keydown", function (e) {
    if (e.key === "Tab" || e.code === "Tab") {
      if (width < 621) {
        e.preventDefault();

        var _hamburgerMenuContainer = document.querySelector(".ma__header__hamburger__nav-container");

        var focusable = _hamburgerMenuContainer.querySelectorAll("button, [href], input, [tabindex]:not([tabindex='-1'])");

        focusable[0].focus();
      }
    }
  });
  var logoLink = document.querySelector(".ma__header__hamburger__nav-container .ma__header__hamburger__logo--mobile a");

  if (logoLink) {
    logoLink.addEventListener("keydown", function (e) {
      if (e.shiftKey && e.key === "Tab" || e.shiftKey && e.code === "Tab") {
        setTimeout(function timeoutFunction() {
          document.querySelector(".js-header-menu-button").focus();
        }, 100);
      }
    });
  }

  var firstTopMenuItem = document.querySelector(".ma__header__hamburger__nav .ma__main__hamburger-nav__item:first-of-type .js-main-nav-hamburger__top-link"); // To accomodate both button and link as the last top menu item, use 'ma__' classes instead of 'js-'.

  var lastTopMenuItem = document.querySelector(".ma__main__hamburger-nav__item:last-of-type .ma__main__hamburger-nav__top-link");
  var lastSubmenuLink = document.querySelector(".js-main-nav-hamburger-toggle:last-of-type .js-main-nav-hamburger-content .js-main-nav-hamburger__subitem:last-of-type .js-main-nav-hamburger__link");
  var lastUtilMenuItem = document.querySelector(".js-utility-nav--narrow .ma__utility-nav__item:last-of-type .ma__utility-nav__link");
  var lastUtilMenuContentLink = document.querySelector(".js-utility-nav--narrow .ma__utility-nav__item:last-of-type .ma__utility-panel:last-of-type .js-clickable:last-of-type .js-clickable-link"); // no utility nav, sub menu closed

  if (lastTopMenuItem) {
    lastTopMenuItem.addEventListener("keydown", function (e) {
      // Without this, sift + tab set focus on the first top menu button.
      if (e.shiftKey && e.key === "Tab" || e.shiftKey && e.code === "Tab") {
        if (width < 841) {
          setTimeout(function timeOutFunction() {
            this.closest(".js-main-nav-hamburger-toggle").previousElementSibling.querySelector(".ma__main__hamburger-nav__top-link").focus();
          }, 1);
        }
      } else if (e.key === "Tab" || e.code === "Tab") {
        if (width > 840) {
          if (!this.hasAttribute("aria-expanded")) {
            // For link
            setFocusOnFirstTopMenu();
          } else {
            // For buttons
            if (this.getAttribute("aria-expanded") === "false") {
              setFocusOnFirstTopMenu();
            }
          }
        }
      }
    }); // no utility nav, last sub menu open

    if (lastTopMenuItem === document.querySelector(".ma__main__hamburger-nav__item:last-of-type button")) {
      lastSubmenuLink.addEventListener("keydown", function (e) {
        var subMenuContainer = this.closest(".js-main-nav-hamburger-content");

        if ((e.key === "Tab" || e.code === "Tab") && !subMenuContainer.classList.contains(".is-closed")) {
          // Close the submenu and move focus to the first top menu button.
          if (width > 840) {
            setTimeout(function timeOutFunction() {
              subMenuContainer.querySelector(".js-main-nav-hamburger__subitem:first-of-type .js-main-nav-hamburger__link").focus();
            }, 1);
          }
        }
      });
    }
  }

  if (lastUtilMenuItem) {
    // with utility nav, utility nav content closed
    lastUtilMenuItem.addEventListener("keydown", function (e) {
      if (e.key === "Tab" || e.code === "Tab") {
        if (width < 841 && this.getAttribute("aria-expanded") === "false") {
          setFocusOnFirstTopMenu();
        }
      }
    }); // with utility nav, last utility nav content open

    lastUtilMenuContentLink.addEventListener("keydown", function (e) {
      // Without this, sift + tab set focus on the first top menu button.
      if (e.shiftKey && e.key === "Tab" || e.shiftKey && e.code === "Tab") {
        if (width < 841) {
          setTimeout(function timeOutFunction() {
            e.target.closest(".js-clickable").previousElementSibling.querySelector("a").focus();
          }, 1);
        }
      } else if (e.key === "Tab" || e.code === "Tab") {
        // Close the nav content and move focus to the first top menu button.
        if (width < 841) {
          setTimeout(function timeOutFunction() {
            e.target.closest(".js-util-nav-content").querySelector("a:first-of-type").focus();
          }, 1);
        }
      }
    });
  }

  var setFocusOnFirstTopMenu = function setFocusOnFirstTopMenu() {
    // Timeout function is necessary to set focus on the first top menu button. Otherwise, focus is set on next focusable element outside the menu.
    setTimeout(function timeOutFunction() {
      firstTopMenuItem.focus();
    }, 1);
  };

  document.addEventListener("keydown", function (e) {
    // ESC to close menus.
    // 'e.key === "Esc"' is necessary for IE11.
    if (e.key === "Escape" || e.key === "Esc" || e.code === "Escape") {
      // Log in to... in Utility nav bar
      if (utilNavWide.querySelector(".js-util-nav-content").style.opacity === "1") {
        closeUtilWideContent();
        utilNavWide.querySelector(".js-util-nav-toggle").focus();
      } // Util nav menus in the hamburger menu


      if (utilNarrowNav) {
        if (utilNarrowButton !== document.activeElement && utilNarrowContainer.style.opacity === "1") {
          // Open Log in to... in Hamburger menu: To be consisitent with submenu, keep the content open and set focus on nav button.
          var utilNavContentLinks = utilNarrowNav.querySelectorAll(".js-clickable-link");

          for (var i = 0; i < utilNavContentLinks.length; i++) {
            if (utilNavContentLinks[i].innerText === document.activeElement.innerText) {
              utilNarrowButton.focus();
            }
          }

          closeNarrowUtilContent();
        } else {
          var narrowNavItems = utilNarrowNav.querySelectorAll(".ma__utility-nav__link");

          for (var _i = 0; _i < narrowNavItems.length; _i++) {
            if (narrowNavItems[_i].innerText === document.activeElement.innerText) {
              closeMenu();
            }
          }
        }
      } // Main nav elements


      var openSubmenu = document.querySelector(".submenu-open .js-main-nav-hamburger__top-link");

      if (openSubmenu !== document.activeElement) {
        // To prevent to set focus on another top menu button with open submenu.
        var menus = document.querySelectorAll(".ma__main__hamburger-nav__top-link");

        for (var _i2 = 0; _i2 < menus.length; _i2++) {
          if (menus[_i2] === document.activeElement) {
            closeMenu();
          }
        } // Set focus on its parent top menu button.


        var openSubmenuItems = document.querySelectorAll(".submenu-open .js-main-nav-hamburger-content:not(is-closed) .js-main-nav-hamburger__link");

        for (var _i3 = 0; _i3 < openSubmenuItems.length; _i3++) {
          if (openSubmenuItems[_i3] === document.activeElement) {
            openSubmenu.focus();
          }
        }
      } else {
        closeMenu();
      }
    }
  }); // Arrow keyboard navigation in the menu.

  var submenuLinks = document.querySelectorAll(".js-main-nav-hamburger__link");
  submenuLinks.forEach(function (link) {
    link.addEventListener("keydown", function (e) {
      var targetParent = e.target.closest(".js-main-nav-hamburger__subitem");

      if (e.key === "ArrowDown" || e.code === "ArrowDown") {
        if (targetParent.nextElementSibling) {
          targetParent.nextElementSibling.querySelector("a").focus();
        } else {
          // Set focus on the first sibling submenu item link.
          document.querySelector(".js-main-nav-hamburger-content:not(.is-closed) .js-main-nav-hamburger__subitem:first-of-type a").focus();
        }
      }

      if (e.key === "ArrowUp" || e.code === "ArrowUp") {
        if (targetParent.previousElementSibling) {
          targetParent.previousElementSibling.querySelector("a").focus();
        } else {
          // Set focus on the last sibling submenu item link.
          document.querySelector(".js-main-nav-hamburger-content:not(.is-closed) .js-main-nav-hamburger__subitem:last-of-type a").focus();
        }
      }
    });
  });
  var narrowUtilContentLinks = document.querySelectorAll(".js-utility-nav--narrow .js-util-nav-content a.js-clickable-link");
  var lastIndex = narrowUtilContentLinks.length - 1;
  narrowUtilContentLinks.forEach(function (link, i) {
    link.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.code === "ArrowDown") {
        if (e.target === narrowUtilContentLinks[i]) {
          if (e.target === narrowUtilContentLinks[lastIndex]) {
            i = 0;
          } else {
            i++;
          }
        } else {
          if (e.target === narrowUtilContentLinks[lastIndex]) {
            i = 0;
          } else {
            var targetIndex;

            for (var index = 0; index < narrowUtilContentLinks.length; index++) {
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
          } else {
            i--;
          }
        } else {
          if (e.target === narrowUtilContentLinks[0]) {
            i = lastIndex;
          } else {
            var _targetIndex;

            for (var _index = lastIndex; _index > -1; _index--) {
              if (e.target === narrowUtilContentLinks[_index]) {
                _targetIndex = _index;
              }
            }

            i = _targetIndex;
            i--;
          }
        }
      }

      narrowUtilContentLinks[i].focus();
    });
  }); // NOTE: KEEPING BELOW FOR MORE KEYBOARD NAVIGATION WORK AFTER ACCESSIBILITY TEST.
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

if (jumpToSearchButton !== null) {
  jumpToSearchButton.addEventListener("click", function (e) {
    e.preventDefault();
    jumpToSearch();
  });
}

function toggleMenu() {
  if (hamburgerMenuContainer) {
    // To prevent null in the original mobile main nav.
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
      openMenu(); // Set buttons between menu button and hamburger menu unfocusable to set focus on the first focusable item in the menu at next tabbing.

      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .goog-te-menu-value").setAttribute("tabindex", "-1");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .direct-link").setAttribute("tabindex", "-1");
      document.querySelector(".js-utility-nav--wide .ma__utility-nav__item  .js-util-nav-toggle").setAttribute("tabindex", "-1");
    }
  }
}

function closeMenu() {
  commonCloseMenuTasks();
  menuButton.setAttribute("aria-pressed", "false"); // Set focus on the menu button.

  setTimeout(function timeoutFunction() {
    document.querySelector(".js-header-menu-button").focus();
  }, 100);

  if (width > 840 && document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .direct-link").hasAttribute("tabindex")) {
    document.querySelector(".js-utility-nav--wide .ma__utility-nav__item .goog-te-menu-value").removeAttribute("tabindex");
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
  } // if (hamburgerMenuContainer.hasAttribute("tabindex")) {
  //   hamburgerMenuContainer.removeAttribute("tabindex");
  // }


  if (searchInput.hasAttribute("autofocus")) {
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
  var heightAboveMenuContainer;
  var emergencyAlertsHeight;
  var alertOffsetAdjusted = 0; // Set the alert to its offset position in the window to prevent the page to shift as the menu opens.

  var lockPage = function lockPage() {
    if (document.querySelector(".ma__emergency-alerts")) {
      document.querySelector("body").style.top = "-".concat(alertlOffsetPosition, "px");
    } else {
      document.querySelector("body").style.top = 0;
    }

    heightAboveMenuContainer = hamburgerMenuContainer.getBoundingClientRect().top;
  };

  if (document.querySelector("html.stickyTOC")) {
    document.querySelector("html.stickyTOC").classList.add("stickyTOCtmp");
    document.querySelector("html.stickyTOC").classList.remove("stickyTOC");
  } // Start open menu tasks.


  body.classList.add("show-menu");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close the main menu for mass.gov");

  if (feedbackButton) {
    feedbackButton.classList.add("hide-button");
  }

  jumpToSearchButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-pressed", "true");
  var alertsHeader = document.querySelector(".ma__emergency-alerts__header");
  document.querySelector("body").style.position = "fixed";

  if (alertsHeader !== null) {
    var emergencyAlerts = document.querySelector(".ma__emergency-alerts");
    emergencyAlertsHeight = emergencyAlerts.offsetHeight;
    alertOffsetAdjusted = alertsHeader.offsetHeight / 2;
    alertlOffsetPosition = emergencyAlertsHeight - alertOffsetAdjusted; // if (osInfo.indexOf("iPhone") !== -1) {
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

    lockPage(); //}

    var hamburgerNavOffset = document.querySelector(".ma__header__hamburger__nav").offsetHeight;
    heightAboveMenuContainer = alertOffsetAdjusted + hamburgerNavOffset;
    hamburgerMenuContainer.style.height = "calc(100vh - ".concat(heightAboveMenuContainer, "px)");
  }

  if (menuOverlay) {
    var overlayOffset = heightAboveMenuContainer;

    if (width > 840) {
      overlayOffset = overlayOffset - 1;
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
  menuItems.forEach(function (li) {
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
} // function closeSubMenus(item) {
//   //Close other open submenus
//   let siblings = [];
//   let thisSibling = item.parentNode.firstChild;
//   while (thisSibling) {
//     if (thisSibling !== item && thisSibling.nodeType === Node.ELEMENT_NODE)
//       siblings.push(thisSibling);
//     thisSibling = thisSibling.nextElementSibling || thisSibling.nextSibling;
//   }
//   for (let i = 0; i < siblings.length; i++) {
//     if (siblings[i].classList.contains("submenu-open")) {
//       siblings[i].classList.remove("submenu-open");
//       siblings[i].querySelector(".js-main-nav-hamburger__top-link").setAttribute("aria-expanded", "false");
//       siblings[i].style.pointerEvents = "none";
//       //setTimeout(function timeoutFunction() {
//       //}, 700);
//       /** Slide up. */
//       siblings[i].querySelector(".js-main-nav-hamburger-content").style.height = "0";
//       siblings[i].querySelector(".js-main-nav-hamburger__container").style.opacity = "0";
//       siblings[i].removeAttribute("style");
//       //setTimeout(function timeoutFunction() {
//         siblings[i].querySelector(".js-main-nav-hamburger-content").classList.add("is-closed");
//       //}, 500);
//     }
//   }
// }
// Close menu when utility nav is clicked


if (utilNavWide !== null && body.classList.contains("show-menu")) {
  closeMenu();
} // Close and reset menu on overlay click


if (null !== menuOverlay) {
  menuOverlay.addEventListener("click", function () {
    closeMenu();
  });
}

if (alertOverlay !== null) {
  alertOverlay.addEventListener("click", function () {
    closeMenu();
  });
}

var debouncer;
window.addEventListener("resize", function () {
  clearTimeout(debouncer);
  var osInfo = navigator.appVersion; // On Android devices resize event is triggered when keyboard appears
  // and it closes the menu.

  if (osInfo.indexOf("Android") === -1 && osInfo.indexOf("iPhone") === -1) {
    debouncer = setTimeout(function () {
      closeMenu();
    }, 100);
  }
}); // ** Utility nav
// Wide/utility nav bar

var utilWideButton = document.querySelector(".js-utility-nav--wide .js-util-nav-toggle");
var utilWideCloseButton = document.querySelector(".js-utility-nav--wide .js-close-util-nav");
var utilWideContent = document.querySelector(".js-utility-nav--wide .js-util-nav-content");

if (utilWideButton !== null && utilWideCloseButton !== null && utilWideContent !== null) {
  // Open
  utilWideButton.addEventListener("click", function (e) {
    var thisWideButton = e.target.closest(".js-util-nav-toggle");
    var thisWideContent = thisWideButton.nextElementSibling;

    if (thisWideContent.classList.contains("is-closed")) {
      //  To open
      thisWideButton.closest(".ma__header__hamburger__nav").classList.add("util-nav-content-open");
      thisWideContent.classList.remove("is-closed");
      thisWideContent.removeAttribute("aria-hidden");
      thisWideContent.removeAttribute("style");
      thisWideContent.style.height = "auto";
      thisWideContent.style.opacity = "1"; // Button State

      thisWideButton.setAttribute("aria-expanded", "true");
      thisWideButton.setAttribute("aria-pressed", "true");
    }

    thisWideButton.setAttribute("aria-expanded", "true");
    thisWideButton.setAttribute("aria-pressed", "true");
  });
} // Close - Utility nav dropdown on the utility nav bar overwaps the button to open it once it's open. To close the dropdown, use the close button within the dropdown container. This is the control for that inside button.


if (utilWideCloseButton !== null) {
  utilWideCloseButton.addEventListener("click", function (e) {
    closeUtilWideContent();
  });
}

function closeUtilWideContent() {
  // Content state
  utilWideContent.style.height = "0";
  utilWideContent.style.opacity = "0";
  utilWideContent.classList.add("is-closed");
  utilWideContent.setAttribute("aria-hidden", "true"); // Close button state

  utilWideCloseButton.setAttribute("aria-expanded", "false"); // Utility button state

  utilWideButton.setAttribute("aria-expanded", "false");
  utilWideButton.setAttribute("aria-pressed", "false");
  utilWideButton.closest(".ma__header__hamburger__nav").classList.toggle("util-nav-content-open");
} // Narrow/in hamburger menu


if (utilNarrowButton !== null) {
  // utilNarrowContent = utilNarrowButton.nextElementSibling;
  utilNarrowContent.style.maxHeight = "0";
  utilNarrowContainer.style.opacity = "0";
  utilNarrowButton.addEventListener("click", function (e) {
    var thisButton = e.target.closest(".js-util-nav-toggle");
    var thisNavContainer = e.target.closest(".ma__utility-nav__item");
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
      utilNarrowContent.style.Height = "0"; // These height settings display the bottom border of the parent li at the correct spot.

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
    var thisNavContainer = utilNarrowButton.closest(".ma__utility-nav__item");
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
  var openSubMenu = document.querySelector(".submenu-open");

  if (openSubMenu) {
    var openSubMenuButton = openSubMenu.querySelector(".js-main-nav-hamburger__top-link");
    var openSubMenuContent = openSubMenu.querySelector(".js-main-nav-hamburger-content");
    var openSubMenuContainer = openSubMenu.querySelector(".js-main-nav-hamburger__container");
    openSubMenuButton.setAttribute("aria-expanded", "false");
    openSubMenuContent.style.height = "0";
    openSubMenuContainer.style.opacity = "0";
    openSubMenuContent.classList.add("is-closed");
    openSubMenu.removeAttribute("style");
    openSubMenu.classList.remove("submenu-open");
  }
} // Target iOS Safari versions less than 11 to handle issues that cannot be targeted
// with behavior detection due to either buggy or idiosyncratic browser implementation
// issues addressed in later major versions.


if (osInfo.indexOf("Safari") !== -1) {
  osInfo.split(" ").forEach(function (splitVar) {
    if (splitVar.length > 0 && splitVar.indexOf("Version/", 0) !== false) {
      var version = splitVar.match(/\d+/);

      if (version !== null && version[0] < 11) {
        body.classList.add("ios-safari-less-than-11");
      }
    }
  });
}

menuItems.forEach(function (item) {
  var itemButton = item.querySelector(".js-main-nav-hamburger__top-link");
  var subMenu = item.querySelector(".js-main-nav-hamburger-content");
  var subItems = subMenu.querySelector(".js-main-nav-hamburger__container");
  subItems.style.opacity = "0";
  item.querySelector(".js-main-nav-hamburger-content").addEventListener("transitionend", function (e) {
    if (e.propertyName === "height") {
      item.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
    }
  });
  itemButton.addEventListener("click", function (e) {
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

      var height = item.querySelector(".js-main-nav-hamburger-content").clientHeight + "px";
      /** Set the height of the submenu as 0px, */

      /** so we can trigger the slide down animation. */

      item.querySelector(".js-main-nav-hamburger-content").style.height = "0";
      setTimeout(function timeoutFunction() {
        item.querySelector(".js-main-nav-hamburger-content").style.height = height;
        item.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start"
        });
        subItems.style.opacity = "1";
      }, 500);
      /** Close Utility menu content when a sub menu is open. */

      if (width < 840) {
        closeNarrowUtilContent();
      }
    } else {
      item.querySelector(".js-main-nav-hamburger-content").style.height = "0";
      subItems.style.opacity = "0"; // Set a little bit of delay to run
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
      var first = subItems.getElementsByTagName("li")[0];
      first.querySelector(".js-main-nav-hamburger__link").focus();
    } // 'e.key === "Esc"' is for IE11.


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
}); // // ****** Menu button ******

var mobileMenuButton = document.querySelector(".js-header-menu-button");
var mobileFeedbackButton = document.querySelector(".ma__fixed-feedback-button");
var mobileJumpToSearchButton = document.querySelector(".js-header-search-access-button");

if (mobileMenuButton !== null) {
  mobileMenuButton.addEventListener("click", function (event) {
    event.preventDefault(); // Toggle mobile menu.

    if (window.innerWidth < 841 && document.querySelector(".ma__header")) {
      toggleMobileMenu();
    } // Hide feedback button when menu opens.


    toggleFeedbackButton();
  });
} // // ****** Access to Search button on mobile should hide feedback button when menu opens  ******


if (mobileJumpToSearchButton !== null) {
  mobileJumpToSearchButton.addEventListener("click", function (event) {
    toggleFeedbackButton();
  });
}

function toggleFeedbackButton() {
  if (mobileFeedbackButton) {
    // Cannot use .toggle. It results to show the button with the dropdown and hide it with the closed dropdown.
    if (mobileFeedbackButton.classList.contains("hide-button") === false) {
      mobileFeedbackButton.classList.add("hide-button");
    } else {
      mobileFeedbackButton.classList.remove("hide-button");
    }
  }
}

function toggleMobileMenu() {
  var body = document.querySelector("body");

  if (body.classList.contains("show-menu")) {
    body.classList.remove("show-menu");
  } else {
    body.classList.add("show-menu");
  }
}