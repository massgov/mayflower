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
        var $otherLinks = $mainNavItem.filter(
            (child) => e.currentTarget !== $link
          ),
          $topLevelLinks = $parent.querySelectorAll(".ma__main-nav__top-link"),
          open = $link.classList.contains(openClass),
          $openContent = $parent.querySelectorAll(
            ".js-main-nav-content." + openClass
          ),
          $focusedElement = document.activeElement,
          menuFlipped = windowWidth < breakpoint,
          // relevant if open..
          $topLevelItem = $focusedElement.closest(".ma__main-nav__item"),
          $topLevelLink = $topLevelItem.querySelector(
            ".ma__main-nav__top-link"
          ),
          $dropdownLinks = $link.querySelectorAll(
            ".ma__main-nav__subitem .ma__main-nav__link"
          ),
          dropdownLinksLength = $dropdownLinks.length,
          focusIndexInDropdown = Array.from($dropdownLinks).findIndex(
            (link) => link === $focusedElement
          ),
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

        if (
          action.close ||
          action.left ||
          action.right ||
          action.up ||
          action.down
        ) {
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

        if (
          ((action.up || action.down) && !(menuFlipped && !open)) ||
          (action.right && menuFlipped && !open)
        ) {
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
            if (
              focusIndexInDropdown === 0 ||
              focusIndexInDropdown >= dropdownLinksLength
            ) {
              focusIndexInDropdown += action.up ? -1 : 1;
            }
          } // Wrap around if at the end of the submenu.

          focusIndexInDropdown =
            ((focusIndexInDropdown % dropdownLinksLength) +
              dropdownLinksLength) %
            dropdownLinksLength;
          $dropdownLinks[focusIndexInDropdown].focus();
          return;
        } // Close menu and return focus to menubar

        if (action.close || (menuFlipped && action.left)) {
          hide($openContent);
          $link.classList.remove(openClass);
          $link.classList.remove(hasFocus);
          $topLevelLink.focus();
          $topLevelLink.setAttribute("aria-expanded", "false");
          return;
        } // Navigate between submenus. This is needed for left/right actions in
        // normal layout, or up/down actions in flipped layout (when nav is closed).

        if (
          ((action.left || action.right) && !menuFlipped) ||
          ((action.up || action.down) && menuFlipped && !open)
        ) {
          var index = Array.from($topLevelLinks).findIndex(
              (link) => link === $topLevelLink
            ),
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

          index = ((index % linkCount) + linkCount) % linkCount;
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
          var $openContent = e.currentTarget.querySelector(
            ".js-main-nav-content"
          );
          show($openContent);
        }
      });
      $link.addEventListener("mouseleave", function (e) {
        e.currentTarget
          .querySelector("button")
          .setAttribute("aria-expanded", "false");

        if (windowWidth > breakpoint) {
          var $openContent = e.currentTarget.querySelector(
            ".js-main-nav-content"
          );
          hide($openContent);
        }
      });
      $link.querySelectorAll("button, a").forEach((child) => {
        child.addEventListener("click", function (e) {
          var $el = e.currentTarget,
            $elParent = $el.parentElement,
            $content = $elParent.querySelector(".js-main-nav-content"),
            $openContent = $parent.querySelector(
              ".js-main-nav-content." + openClass
            ),
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
        document
          .querySelector(".js-close-sub-nav")
          .addEventListener("click", function () {
            var $openContent = $parent.querySelector(
              ".js-main-nav-content." + openClass
            );
            hide($openContent);
          }); // Hide any open submenu content when the sidebar menu is closed
      }
      document
        .querySelector(".js-header-menu-button")
        .addEventListener("click", function () {
          var $openContent = $parent.querySelector(
            ".js-main-nav-content." + openClass
          );
          hide($openContent);
          document
            .querySelector(".ma__utility-nav__content")
            .classList.add("is-closed");
        });

      function hide($content) {
        document.querySelector("body").classList.remove(submenuClass);
        if ($parent.querySelector("." + openClass)) {
          $parent.querySelector("." + openClass).classList.remove(openClass);
        }

        if (windowWidth <= breakpoint) {
          $content.classList.add(closeClass);
        } else {
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
          //$content.getAnimations().forEach(contentAnimation => contentAnimation.cancel());
          $content.classList.remove(closeClass);

          setInterval(function () {
            $content.classList.add(openClass);
          }, 500);
        }
      }
    });
  });
})(window, document, jQuery);