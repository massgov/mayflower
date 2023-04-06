export default (function (window, document, $) {

  let windowWidth = window.innerWidth;

  window.addEventListener("resize", function () {
    windowWidth = window.innerWidth;
  });
  
  $('.js-main-nav').each(function () {
    let openClass = "is-open",
      hasFocus = "has-focus",
      closeClass = "is-closed",
      submenuClass = "show-submenu",
      $mainNavList = $(this),
      $mainNavItems = $mainNavList.find('.js-main-nav-toggle'), // li
      $mainNavItemsToggle = $mainNavList.find('.js-main-nav-toggle > button'), // button
      breakpoint = 840; // matches CSS breakpoint for Main Nav

    $mainNavItems.on('keydown', function (e) {
      // Grab all the DOM info we need...
      debugger;
      let $link = $(this),
        $otherLinks = $mainNavItems.not($link),
        open = $link.hasClass(openClass),
        $openContent = $mainNavList.find('.js-main-nav-content.' + openClass),
        $focusedElement = $(document.activeElement),
        menuFlipped = (windowWidth < breakpoint),
        // Easy access to the key that was pressed.
        keycode = e.keyCode,
        action = {
          'tab': keycode === 9, // tab
          'close': keycode === 27, // esc
          'left': keycode === 37, // left arrow
          'right': keycode === 39, // right arrow
          'up': keycode === 38, // up arrow
          'down': keycode === 40, // down arrow
          // 'space': keycode === 32, //space
          // 'enter': keycode === 13 // enter
        };
        // relevant if open..
        let $topLevelItem = $focusedElement.parents('.js-main-nav-toggle'), // li
          $topLevelLink = $topLevelItem.find('.js-main-nav-toggle > button'), // button
          $dropdownLinks = $link.find('.ma__main-nav__subitem > a'),
          dropdownLinksLength = $dropdownLinks.length,
          focusIndexInDropdown = $dropdownLinks.index($focusedElement);

      // Default behavior is prevented for all actions except 'tab'.
      if (action.close || action.left || action.right || action.up || action.down) {
        e.preventDefault();
      }

      if (action.left || action.right) {
        let index = $mainNavItems.index($topLevelItem),
          prev = action.left,
          linkCount = $mainNavItems.length;
        // hide content
        // If menubar focus
        //  - Change menubar item
        //
        // If dropdown focus
        //  - Open previous pull down menu and select first item
        hide($openContent);
        $topLevelLink.attr('aria-expanded', 'false');
        $link.removeClass(hasFocus);
        // Get previous item if left arrow, next item if right arrow.
        index += (prev ? -1 : 1);
        console.log(index)
        // Wrap around if at the end of the set of menus.
        index = ((index % linkCount) + linkCount) % linkCount;
        $mainNavItemsToggle[index].focus();
        // return;
      }
      console.log($link)
      console.log($dropdownLinks)
      console.log($focusedElement)
      console.log(dropdownLinksLength, focusIndexInDropdown);

      if (action.up || action.down) {
        // Open pull down menu if not already.
        if (!open && !$link.hasClass(hasFocus)) {
          show($topLevelItem.find('.js-main-nav-content'));
          $topLevelLink.attr('aria-expanded', 'true');
          $link.addClass(openClass);
        }

        if (action.up) {
          console.log('up!!!!')
          console.log($dropdownLinks[dropdownLinksLength-1])
          $dropdownLinks[dropdownLinksLength-1].focus();
        }

        if (action.down) {
          $dropdownLinks[0].focus();
        }
      }

      // if (action.tab && dropdownLinksLength === (focusIndexInDropdown + 1)) {
      //   console.log(focusIndexInDropdown);
      //   hide($openContent);
      //   $topLevelLink.attr('aria-expanded', 'false');
      //   $link.removeClass(hasFocus);
      //   return;
      // }

      // Navigate into or within a submenu. This is needed on up/down actions
      // (unless the menu is flipped and closed) and when using the right arrow
      // while the menu is flipped and submenu is closed.
      // if (((action.up || action.down) && !(menuFlipped && !open))
      //   || (action.right && menuFlipped && !open)) {
      //   // Open pull down menu if necessary.
      //   if (!open && !$link.hasClass(hasFocus)) {
      //     show($topLevelItem.find('.js-main-nav-content'));
      //     $topLevelLink.attr('aria-expanded', 'true');
      //     $link.addClass(openClass);
      //   }

      //   // Adjust index of active menu item based on performed action.
      //   focusIndexInDropdown += (action.up ? -1 : 1);

      //   // Wrap around if at the end of the submenu.
      //   focusIndexInDropdown = ((focusIndexInDropdown % dropdownLinksLength) + dropdownLinksLength) % dropdownLinksLength;
      //   $dropdownLinks[focusIndexInDropdown].focus();
      //   return;
      // }

      // // Close menu and return focus to menubar
      // if (action.close || (menuFlipped && action.left)) {
      //   hide($openContent);
      //   $link.removeClass(openClass);
      //   $link.removeClass(hasFocus);
      //   $topLevelLink.focus().attr('aria-expanded', 'false');
      //   return;
      // }

      // Navigate between submenus. This is needed for left/right actions in
      // normal layout, or up/down actions in flipped layout (when nav is closed).
      // if (((action.left || action.right) && !menuFlipped) ||
      //   ((action.up || action.down) && menuFlipped && !open)) {
      //   let index = $mainNavItems.index($topLevelLink),
      //     prev = action.left || action.up,
      //     linkCount = $mainNavItems.length;

      //   // hide content
      //   // If menubar focus
      //   //  - Change menubar item
      //   //
      //   // If dropdown focus
      //   //  - Open previous pull down menu and select first item
      //   hide($openContent);
      //   $topLevelLink.attr('aria-expanded', 'false');
      //   $link.removeClass(hasFocus);
      //   // Get previous item if left arrow, next item if right arrow.
      //   index += (prev ? -1 : 1);
      //   // Wrap around if at the end of the set of menus.
      //   index = ((index % linkCount) + linkCount) % linkCount;
      //   $mainNavItems[index].focus();
      //   return;
      // }

    })

 
    // mouse events + space and enter keyboard events
    $mainNavItemsToggle.on('click mouseenter mouseleave', function (e) {
      let $el = $(this),
        $elParent = $el.parent(),
        $content = $elParent.find('.js-main-nav-content'),
        isOpen = $content.hasClass(openClass);

        switch(e.type) {
          case 'click':
            if (isOpen) {
              hide($content);
              $el.attr('aria-expanded', 'false');
              $elParent.removeClass('is-open');
            } else {
              show($content);
              $el.attr('aria-expanded', 'true');
              $elParent.addClass('is-open');
            }
            break;
          case 'mouseenter':
            show($content);
            $el.attr('aria-expanded', 'true');
            $elParent.addClass('is-open');
            break;
          case 'mouseleave':
            hide($content);
            $el.attr('aria-expanded', 'false');
            $elParent.removeClass('is-open');
        }
    });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $mainNavList.find("." + openClass).removeClass(openClass);
      $content
      .stop(true, true)
      .slideUp('fast', function () {
        $content
          .addClass(closeClass)
          .slideDown(0);
      });
    }

    function show($content) {
      $('body').addClass(submenuClass);
      $content
      .stop(true, true)
      .delay(200)
      .slideUp(0, function () {
        $content
          .addClass(openClass)
          .removeClass(closeClass)
          .slideDown('fast');
      });
    }
  });

})(window, document, jQuery);
