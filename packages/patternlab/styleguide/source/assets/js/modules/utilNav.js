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
    let $panel = $(this);
    const $thisButton = $panel.prev('.js-util-nav-toggle');
    const $closeButton = $panel.find('.js-close-util-nav');
    const $closestHamburgerNav = $panel.closest('.ma__header__hamburger__nav');

    const height = $panel.height();

    const closePanel = () => {
      console.log('close')
      $panel.css('top', '-' + height + 'px');
     // $panel.addClass('is-closed');
      $panel.attr("aria-hidden", "true");
      $thisButton.attr("aria-expanded", "false");
      $closestHamburgerNav.removeClass('util-nav-content-open');
    }

    const openPanel = () => {
      console.log('open')
      $panel.css('top', '0px');
      // $panel.removeClass('is-closed');
      $panel.attr("aria-hidden", "false");
      $thisButton.attr("aria-expanded", "true");
      $closestHamburgerNav.addClass('util-nav-content-open');
    }

    closePanel();

    $thisButton.on('click', function () {
      // if the panel is closed, then open it
      console.log($thisButton.attr("aria-expanded"))
      if ($thisButton.attr("aria-expanded") == 'false') {
        openPanel()
      } else {
      // else close the panel
        closePanel()
      }

      // $panel.css('top', '0px');
      // $panel.removeAttr('style');
      // $('body').addClass('show-submenu');
    });

    $thisButton.on('keydown', function (e) {
      if (e.key === "Escape")  {
        // If utility panel is open
        //if (!$panel.hasClass("is-closed")) {
          closePanel();
        //} 
      }
    });

    $(window).on('resized', function () {
      if ($(window).width() > 840) {
        $panel.css('top', '-' + height + 'px');
      }
      else {
        $panel.removeAttr('style')
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

    $panel.on('keydown', function (e) {
      if (e.key == "Escape") {
        closePanel();
      }
    });
  });

  // // Utility toggles buttons desktop only
  // $utilityButtons.each(function () {
  //   const $thisButton = $(this);
  //   const $panel = $thisButton.next('.js-util-nav-content');
  //   const $closestHamburgerNav = $thisButton.closest('.ma__header__hamburger__nav');

  //   const openPanel = () => {
  //     $panel.removeClass('is-closed');
  //     $panel.attr("aria-hidden", "false");
  //     $thisButton.attr("aria-expanded", "true");
  //     $closestHamburgerNav.addClass('util-nav-content-open');
  //   }

  //   const closePanel = () => {
  //     $panel.addClass('is-closed');
  //     $panel.attr("aria-hidden", "true");
  //     $thisButton.attr("aria-expanded", "false");
  //     $closestHamburgerNav.removeClass('util-nav-content-open');
  //   }

  //   $thisButton.on('click', function () {
  //     // if the panel is closed, then open it
  //     if ($panel.hasClass("is-closed")) {
  //       openPanel()
  //     } else {
  //     // else close the panel
  //       closePanel()
  //     }

  //     $panel.css('top', '0px');
  //     $panel.removeAttr('style');
  //     $('body').addClass('show-submenu');
  //   });

  //   $thisButton.on('keydown', function (e) {
  //     if (e.key === "Escape")  {
  //       // If utility panel is open
  //       if (!$panel.hasClass("is-closed")) {
  //         closePanel();
  //       } 
  //     }
  //   });
  // });



  // debouncer
  var resize_timeout;
  $(window).on('resize orientationchange', function () {
    clearTimeout(resize_timeout);

    resize_timeout = setTimeout(function () {
      $(window).trigger('resized');
    }, 150);

  });
})(document,jQuery);
