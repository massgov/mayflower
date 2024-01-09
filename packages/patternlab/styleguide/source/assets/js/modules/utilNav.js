import focusTrapping from "../helpers/focusTrapping.js";

export default (function (document,$) {
  // desktop only
  const $panels = $('.js-utility-nav--wide .js-util-nav-content');
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
    let $thisPanel = $(this);
    const height = $thisPanel.height();
    $thisPanel.css('top', '-' + height + 'px');
    const $closeButton = $thisPanel.find('.js-close-util-nav');
    const $closestHamburgerNav = $thisPanel.closest('.ma__header__hamburger__nav');
    const $thisButton = $thisPanel.prev('.js-util-nav-toggle');
  
    const openPanel = () => {
      $thisPanel.css('top', '0px');
      $thisPanel.removeClass('is-closed');
      $thisPanel.attr("aria-hidden", "false");
      $thisButton.attr("aria-expanded", "true");
      $closestHamburgerNav.addClass('util-nav-content-open');
    }
    
    const closePanel = () => {
      $thisPanel.css('top', '-' + height + 'px');
      $thisPanel.addClass('is-closed');
      $thisPanel.attr("aria-hidden", "true");
      $thisButton.attr("aria-expanded", "false");
      $closestHamburgerNav.removeClass('util-nav-content-open');
    }

    $(window).on('resized', function () {
      if ($(window).width() > 840) {
        $thisPanel.css('top', '-' + height + 'px');
      }
      else {
        $thisPanel.removeAttr('style')
      }
    });

    // close the utility menu when user opens Userway settings. [Temporary - remove after the testing phase] 
    $('.ma__utility-nav__userway').on('click', function () {

      setTimeout(() => {
        closePanel();
      }, 500);
    });

    $closeButton.on('click', function () {
      closePanel();
    });

    $thisPanel.on('keydown', function (e) {
      if (e.key == "Escape") {
        closePanel();
      }
    });

    // Utility toggles buttons desktop only
    $thisButton.on('click', function () {
      // if the panel is closed, then open it
      if ($thisPanel.hasClass("is-closed")) {
        openPanel()
      } else {
      // else close the panel
        closePanel()
      }

      $thisPanel.css('top', '0px');
      $thisPanel.removeAttr('style');
      $('body').addClass('show-submenu');
    });

    $thisButton.on('keydown', function (e) {
      if (e.key === "Escape")  {
        // If utility panel is open
        if (!$thisPanel.hasClass("is-closed")) {
          closePanel();
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
