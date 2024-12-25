export default (function (window, document, $) {

  $('.js-button-dropdown').each(function () {
    let openClass = "is-open",
      hasFocus = "has-focus",
      closeClass = "is-closed",
      submenuClass = "show-submenu",
      $mainNavList = $(this),
      $mainNavItems = $mainNavList.find('.js-button-dropdown-toggle'), // li
      $mainNavItemsToggle = $mainNavList.find('button.js-button-dropdown-toggle'); // button

    // mouse events + space and enter keyboard events
    $mainNavItemsToggle.on('click', function (e) {
      let $topLevelButton = $(this), // button
      $topLevelItem = $topLevelButton.parent(), //div
      $dropdownContent = $topLevelItem.find('.js-button-dropdown-content'), // ul wrapper
      isOpen = $dropdownContent.hasClass(openClass);
      // DP-14430: In some cases after interaction with the li element some broken inline
      // styles remain in place, we do clean up here before proceeding with the event handling.
      $dropdownContent.removeAttr('style');
      if (isOpen) {
        hide($dropdownContent);
        $topLevelButton.attr('aria-expanded', 'false');
        $topLevelItem.removeClass('is-open');
      } else {
        show($dropdownContent);
        $topLevelButton.attr('aria-expanded', 'true');
        $topLevelItem.addClass('is-open');
      }
    });

    function hide($dropdownContent) {
      $dropdownContent.removeClass(submenuClass);
      $mainNavList.find("." + openClass).removeClass(openClass);
      $dropdownContent
      .stop(true, true)
      .slideUp('fast', function () {
        $dropdownContent
          .addClass(closeClass)
          .slideDown(0);
      });
    }

    function show($dropdownContent) {
      $dropdownContent.addClass(submenuClass);
      $dropdownContent
      .stop(true, true)
      .slideUp(0, function () {
        $dropdownContent
          .addClass(openClass)
          .removeClass(closeClass)
          .slideDown('fast');
      });
    }
  });

})(window, document, jQuery);
