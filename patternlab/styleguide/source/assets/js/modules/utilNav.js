export default (function (window, document, $, undefined) {
  const $menuButton = $('.js-header-menu-button');
  let $panels = $('.js-util-nav-content');
  let $utilityButtons = $('.js-util-nav-toggle');
  const $mobileUtilityNav = $('.js-utility-nav--narrow');
  const $mobileLanguageSelect = $mobileUtilityNav.find('.ma__utility-nav__item').first();
  const $stateOrgs = $mobileUtilityNav.find('#stateOrgs');
  const $logInto = $mobileUtilityNav.find('#logInTo');

  $mobileLanguageSelect.remove();
  $stateOrgs.find('.js-util-nav-content').remove();

  $stateOrgs.on('click', function() {
    window.location.pathname = 'state-a-to-z';
  });

  $logInto.on('click', function() {
    $(this).toggleClass('submenu-open');
  });

  function closeMenu() {
    $('body').removeClass('show-menu');
    $('.menu-overlay').removeClass('overlay-open');
    $('.ma__header__menu-text').text('Menu');
    $menuButton.attr('aria-pressed', 'false');
    $menuButton.attr('aria-label', 'Open the main menu for mass.gov');
    $('.feedback-button').removeClass('hide-button');
  }

  $logInto.find('button').on('keydown', function (e) {
    if ($(this).parent().hasClass('submenu-open')) {
      return;
    }
    else {
      if (e.key == "Tab") {
        closeMenu();
      }
    }
  });

  $('#ma__site-logo-link').on('focus', function() {
    closeMenu();
  });

  $panels.each(function () {
    const $panel = $(this);
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
    const $thisPanel = $thisButton.next('.js-util-nav-content');
    const $closePanel = $thisPanel.find('.js-close-util-nav');

    $thisButton.on('click', function () {
      $thisPanel.removeClass('is-closed');
      $thisPanel.removeAttr('style');
      $thisPanel.attr("aria-hidden", "false");

      $('body').addClass('show-submenu');

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
