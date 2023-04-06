export default (function (window, document, $, undefined) {

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
      $mainNavItem = $mainNavList.find('.js-main-nav-toggle'),
      $mainNavItemToggle = $mainNavList.find('.js-main-nav-toggle > button'),
      breakpoint = 840; // matches CSS breakpoint for Main Nav

      $mainNavItemToggle.on('keydown', function (e) {
      // Grab all the DOM info we need...
      let $link = $(this).parent(),
        $otherLinks = $mainNavItem.not($link),
        $topLevelLinks = $mainNavList.find('.ma__main-nav__top-link'),
        open = $link.hasClass(openClass),
        $openContent = $mainNavList.find('.js-main-nav-content.' + openClass),
        $focusedElement = $(document.activeElement),
        menuFlipped = (windowWidth < breakpoint),
        // relevant if open..
        $topLevelItem = $focusedElement.parents('.ma__main-nav__item'),
        $topLevelLink = $topLevelItem.find('.ma__main-nav__top-link'),
        $dropdownLinks = $link.find('.ma__main-nav__subitem .ma__main-nav__link'),
        dropdownLinksLength = $dropdownLinks.length,
        focusIndexInDropdown = $dropdownLinks.index($focusedElement),
        // Easy access to the key that was pressed.
        keycode = e.keyCode,
        action = {
          'tab': keycode === 9, // tab
          'close': keycode === 27, // esc
          'left': keycode === 37, // left arrow
          'right': keycode === 39, // right arrow
          'up': keycode === 38, // up arrow
          'down': keycode === 40, // down arrow
          'space': keycode === 32, //space
          'enter': keycode === 13 // enter
        };

        console.log($link)

      // Default behavior is prevented for all actions except 'tab'.
      if (action.close || action.left || action.right || action.up || action.down) {
        e.preventDefault();
      }

      if (action.enter || action.space) {
        $link.addClass(hasFocus);
        $otherLinks.removeClass(hasFocus);
      }

      if (action.tab) {
        console.log(focusIndexInDropdown);
      }

      if (action.tab && dropdownLinksLength === (focusIndexInDropdown + 1)) {
        console.log(focusIndexInDropdown);
        hide($openContent);
        $topLevelLink.attr('aria-expanded', 'false');
        $link.removeClass(hasFocus);
        return;
      }

      // if (action.tab && focusIndexInDropdown === -1) {
      //   console.log('back');
      // }

      // Navigate into or within a submenu. This is needed on up/down actions
      // (unless the menu is flipped and closed) and when using the right arrow
      // while the menu is flipped and submenu is closed.
      if (((action.up || action.down) && !(menuFlipped && !open))
        || (action.right && menuFlipped && !open)) {
        // Open pull down menu if necessary.
        if (!open && !$link.hasClass(hasFocus)) {
          show($topLevelItem.find('.js-main-nav-content'));
          $topLevelLink.attr('aria-expanded', 'true');
          $link.addClass(openClass);
        }

        // Adjust index of active menu item based on performed action.
        focusIndexInDropdown += (action.up ? -1 : 1);

        // Wrap around if at the end of the submenu.
        focusIndexInDropdown = ((focusIndexInDropdown % dropdownLinksLength) + dropdownLinksLength) % dropdownLinksLength;
        $dropdownLinks[focusIndexInDropdown].focus();
        return;
      }

      // Close menu and return focus to menubar
      if (action.close || (menuFlipped && action.left)) {
        hide($openContent);
        $link.removeClass(openClass);
        $link.removeClass(hasFocus);
        $topLevelLink.focus().attr('aria-expanded', 'false');
        return;
      }

      // Navigate between submenus. This is needed for left/right actions in
      // normal layout, or up/down actions in flipped layout (when nav is closed).
      if (((action.left || action.right) && !menuFlipped) ||
        ((action.up || action.down) && menuFlipped && !open)) {
        let index = $topLevelLinks.index($topLevelLink),
          prev = action.left || action.up,
          linkCount = $topLevelLinks.length;

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
        // Wrap around if at the end of the set of menus.
        index = ((index % linkCount) + linkCount) % linkCount;
        $topLevelLinks[index].focus();
        return;
      }

    })

    $mainNavItem.children('button').on('click mouseenter mouseleave', function (e) {
      let $el = $(this),
        $elParent = $el.parent(),
        $content = $elParent.find('.js-main-nav-content'),
        $openContent = $mainNavList.find('.js-main-nav-content.' + openClass),
        isOpen = $content.hasClass(openClass);

        switch(e.type) {
          case 'click':
            if (isOpen) {
              hide($openContent);
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
            hide($openContent);
            $el.attr('aria-expanded', 'false');
            $elParent.removeClass('is-open');
        }
    });

    // $('.js-close-sub-nav').on('click', function () {
    //   let $openContent = $mainNavList.find('.js-main-nav-content.' + openClass);
    //   hide($openContent);
    // });

    // // Hide any open submenu content when the sidebar menu is closed
    // $('.js-header-menu-button').click(function () {
    //   let $openContent = $mainNavList.find('.js-main-nav-content.' + openClass);
    //   hide($openContent);

    //   $('.ma__utility-nav__content').addClass('is-closed');
    // });

    function hide($content) {
      $('body').removeClass(submenuClass);
      $mainNavList.find("." + openClass).removeClass(openClass);

      if (windowWidth <= breakpoint) {
        $content.addClass(closeClass);
      } else {
        $content
          .stop(true, true)
          .slideUp('fast', function () {
            $content
              .addClass(closeClass)
              .slideDown(0);
          });
      }
    }

    function show($content) {
      $('body').addClass(submenuClass);
      if (windowWidth <= breakpoint) {
        $content
          .addClass(openClass)
          .removeClass(closeClass);
      } else {
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
    }


  });

})(window, document, jQuery);
