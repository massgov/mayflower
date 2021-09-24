import focusTrapping from "../helpers/focusTrapping.js";

export default (function (document,$) {
  const wideContainerClass = '.js-utility-nav--wide .js-util-nav-content';
  let $panels = $('.js-util-nav-content');
  let $panel = "";
  let $utilityButtons = $('.js-util-nav-toggle');

  // Keyboard navigation.
  $(document).keydown(function(e) {
    // check if menu open
    if (!$(wideContainerClass).hasClass('is-closed')) {
      focusTrapping({
        focusableSelectors: 'a, button',
        modalSelector: wideContainerClass,

        keyEvent: e
      });
    }
  });

  // In the hamburger menu container.
  $panels.each(function () {
    if ($(this).closest(".ma__header__hamburger__utility-nav--narrow") !== true) {
      $panel = $(this);
    }
    const height = $panel.height();
    const $closeButton = $panel.find('.js-close-util-nav');

    $panel.css('top', '-' + height + 'px');
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
      $panel.toggleClass('is-closed');
      $panel.attr("aria-hidden", "true");
    });

    $panel.on('keydown', function (e) {
      if (e.key == "Escape") {
        $panel.css('top', '-' + height + 'px');
        $panel.toggleClass('is-closed');
        $panel.attr("aria-hidden", "true");
      }
    });
  });

  $utilityButtons.each(function () {
    const $thisButton = $(this);
    let $thisPanel = $thisButton.next('.js-util-nav-content');
    const $closePanel = $thisPanel.find('.js-close-util-nav');

    $thisButton.on('click', function () {
      if ($thisButton.closest(".ma__header__hamburger__utility-nav--narrow")) {
        $thisPanel = null;
      }
      else {
        $thisPanel.removeClass('is-closed');
        $thisPanel.removeAttr('style');
        $thisPanel.attr("aria-hidden", "false");
      }

      $('body').addClass('show-submenu');

      // Only affects utility nav on the utility nav bar with the hamburger menu.
      if ($(this).closest(".ma__header__hamburger__utility-nav--wide")) {
        if ($thisPanel && $thisPanel.hasClass("is-closed")) {
          $(this).closest(".ma__header__hamburger__nav").removeClass("util-nav-content-open");
        }
        else {
          $(this).closest(".ma__header__hamburger__nav").addClass("util-nav-content-open");
        }
      }

      setTimeout(function () {
        $closePanel.focus();
      }, 250);

    });
  });

  $('.js-close-sub-nav').on('click', function () {
    $('.js-util-nav-content').addClass('is-closed');
    $('.js-util-nav-content').removeAttr('style');
    $('body').removeClass('show-submenu');
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
