import focusTrapping from "../helpers/focusTrapping.js";

export default (function (document,$) {
  const $panels = $('.js-util-nav-content');
  const $utilityButtons = $('.js-utility-nav--wide .js-util-nav-toggle');

  // Keyboard navigation.
  $(document).keydown(function(e) {
    // get the utility panel that is opened
    const wideExpendedPanelClass = '.js-utility-nav--wide .js-util-nav-content:not(.is-closed)';
    focusTrapping({
      focusableSelectors: 'a, button, input',
      modalSelector: wideExpendedPanelClass,
      keyEvent: e
    });
  });

  // In the hamburger menu container.
  $panels.each(function () {
    let $panel;
    if ($(this).closest(".ma__header__hamburger__utility-nav--narrow") !== true) {
      $panel = $(this);
    }
    const height = $panel.height();
    $panel.css('top', '-' + height + 'px');
    const $closeButton = $panel.find('.js-close-util-nav');

    // $panel.css('top', '-' + height + 'px');
    $(window).on('resized', function () {
      if ($(window).width() > 840) {
        $panel.css('top', '-' + height + 'px');
      }
      else {
        $panel.removeAttr('style')
      }
    });

    $closeButton.on('click', function () {
      $panel.css('top', '-' + height + 'px');
      $panel.addClass('is-closed');
      $panel.attr("aria-hidden", "true");
    });

    $panel.on('keydown', function (e) {
      if (e.key == "Escape") {
        $panel.css('top', '-' + height + 'px');
        $panel.addClass('is-closed');
        $panel.attr("aria-hidden", "true");
      }
    });
  });

  // Utility toggles buttons desktop only
  $utilityButtons.each(function () {
    const $thisButton = $(this);
    const $thisPanel = $thisButton.next('.js-util-nav-content');

    $thisButton.on('click', function () {
      // if the panel is closed, then open it
      if ($thisPanel.hasClass("is-closed")) {
        $thisPanel.removeClass('is-closed');
        $thisPanel.attr("aria-hidden", "false");
        $thisButton.attr("aria-expanded", "true");
      } else {
      // else close the panel
        $thisPanel.addClass('is-closed');
        $thisPanel.attr("aria-hidden", "true");
        $thisButton.attr("aria-expanded", "false");
      }

      $thisPanel.css('top', '0px');
      $thisPanel.removeAttr('style');
      $('body').addClass('show-submenu');
    });

    $thisButton.on('keydown', function (e) {
      if (e.key === "Escape")  {
        // If utility panel is open
        if (!$thisPanel.hasClass("is-closed")) {
          $thisPanel.addClass('is-closed');
          $thisPanel.attr("aria-hidden", "true");
          $thisButton.attr("aria-expanded", "false");
        } 
      }
    });


  });


  // debouncer
  var resize_timeout;
  $(window).on('resize orientationchange', function () {
    clearTimeout(resize_timeout);

    resize_timeout = setTimeout(function () {
      $(window).trigger('resized');
    }, 150);

  });
})(document,jQuery);
