export default (function (window, document, $, undefined) {

  let $panels = $('.js-util-nav-content');
  let $panel = "";
  let $utilityButtons = $('.js-util-nav-toggle');

  let $navContanier = $(".js-utility-nav--wide .js-util-nav-content");
  let $focusableElements = $navContanier.find(':focusable');
  const $containerCloseButton = $navContanier.find('.js-close-util-nav');

  // console.log($focusableElements[0]);
  // console.log($focusableElements[$focusableElements.length -1]);
  // $containerCloseButton.css("background-color", "pink");

  // Log in to on blue nav bar (wide)
  $($focusableElements[$focusableElements.length -1]).keydown(function(e) {
    // console.log(e);
    // $(this).css("background-color", "orange ");
    // if ($(this).hasFocus()) {
      $(this).css("background-color", "pink");
      let key = (e.keyCode ? e.keyCode : e.witch);
      // When tab key is hit on the last ficusable element,
      if (key == "9") {
        $(this).css("background-color", "purple");
        // Set focus on the first focusable element in the overlay.
        // $focusableElements[0].focus();
        $containerCloseButton.focus();
      }
    // }
  });

  // $($containerCloseButton).keydown(function(e) {
  //   // console.log(e);
  //   $(this).css("background-color", "orange");

  //   if ($(this).hasFocus()) {
  //     $(this).css("background-color", "orange");

  //     let key = (e.keyCode ? e.keyCode : e.witch);
  //     // When tab key is hit on the last ficusable element,
  //     if (key == "9") {
  //       if(e.shiftKey) {
  //         // Set focus on the first focusable element in the overlay.
  //         // $focusableElements[0].focus();
  //         $focusableElements[$focusableElements.length -1].focus();
  //       }
  //     }
  //   }
  // });





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
})(window, document, jQuery);
