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
      dropdownIndex = 0;

    $mainNavItems.on('keydown', function (e) {
      // Grab all the DOM info we need...
      let $topLevelItem = $(this), // li
        // open = $topLevelItem.hasClass(openClass),
        $openContent = $mainNavList.find('.js-main-nav-content.' + openClass),
        $focusedElement = $(document.activeElement),
        // Easy access to the key that was pressed.
        keycode = e.keyCode,
        action = {
          'tab': keycode === 9, // tab
          'close': keycode === 27, // esc
          'left': keycode === 37, // left arrow
          'right': keycode === 39, // right arrow
          'up': keycode === 38, // up arrow
          'down': keycode === 40
        },
        // relevant if open..
          $topLevelLink = $topLevelItem.find('.ma__main-nav__top-link'), // button
          $dropdownContent = $topLevelItem.find('.js-main-nav-content'), // div
          $dropdownLinks = $dropdownContent.find('a'),
          dropdownLinksLength = $dropdownLinks.length,
          focusIndexInDropdown = $dropdownLinks.index($focusedElement);
          console.log($topLevelItem)
          

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
        $topLevelItem.removeClass(hasFocus);
        // Get previous item if left arrow, next item if right arrow.
        index += (prev ? -1 : 1);
        // Wrap around if at the end of the set of menus.
        index = ((index % linkCount) + linkCount) % linkCount;
        $mainNavItemsToggle[index].focus();
        // return;
      }

      if (action.up || action.down) {
        // If submenu is not already
        if ($openContent.length === 0) {
          // Open the submenu
          show($dropdownContent);
          $topLevelLink.attr('aria-expanded', 'true');
          $topLevelItem.addClass(openClass);
          if (action.up) {
            console.log('up')
            // key up focus on the last item
            dropdownIndex = dropdownLinksLength - 1;
          } else {
            console.log('down')
            // key down focus on the first item
            dropdownIndex = 0;
          }  
          console.log(dropdownIndex)
          console.log($dropdownLinks[dropdownIndex])
          // not sure why this doesn't work?????
          $dropdownLinks[dropdownIndex].focus(); 
        }
        else {
          console.log('update')
          // Adjust index of active menu item based on performed action.
          dropdownIndex += (action.up ? -1 : 1);

          // Wrap around if at the end of the submenu.
          dropdownIndex = ((dropdownIndex % dropdownLinksLength) + dropdownLinksLength) % dropdownLinksLength;
          console.log('focus: ' + dropdownIndex)
          console.log($dropdownLinks[dropdownIndex])
          $dropdownLinks[dropdownIndex].focus();
        }
      }

      // Close previous menu after tabbing through the submenu to the next menu item
      if (action.tab && dropdownLinksLength === (focusIndexInDropdown + 1)) {
        hide($openContent);
        $topLevelLink.attr('aria-expanded', 'false');
        $topLevelItem.removeClass(hasFocus);
        return;
      }

      // Close menu and return focus to menubar
      if (action.close) {
        hide($openContent);
        $topLevelItem.removeClass(openClass);
        $topLevelItem.removeClass(hasFocus);
        $topLevelLink.focus().attr('aria-expanded', 'false');
        return;
      }
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
