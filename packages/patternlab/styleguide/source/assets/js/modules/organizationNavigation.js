
import focusTrapping from "../helpers/focusTrapping.js";

export default (function (window, document, $, undefined) {

  $('.ma__organization-navigation').each(function () {
    // Org Nav Wrapper.
    const $orgNav = $(this);
    const $menuWrapper = $orgNav.find('.ma__organization-navigation--inner-wrapper');
    const $menuItems = $orgNav.find(".ma__organization-navigation__item > a");

    const feedbackButton = $('body').find('.ma__fixed-feedback-button');

    $orgNav.find('svg').each(function () {
      $(this).attr('focusable', 'false');
    });

    // Mobile Menu vars.
    const $mobileToggle = $orgNav.find('.ma__organization-navigation__mobile-toggle');
    const mobileBreak = 910;

    // Search Wrapper vars.
    const $orgNavSearchForm = $orgNav.find('.js-organization-navigation__search');
    const $orgNavSearchInput = $orgNav.find('#organization-navigation-search');
    const $searchToggle = $orgNav.find('.ma__organization-navigation__search .js-search-toggle');

    // Sticky on scroll.
    const bannerBottom = $('.ma__page-banner').offset().top + $('.ma__page-banner').height();
    const menuHeight = $orgNav.height();

    function stickyOnScroll() {
      const orgWindowTop = $(window).scrollTop();

      // Active Sticky TOC when on page TOC scrolls past.
      if (bannerBottom > orgWindowTop) {
        $('.pre-content').removeAttr('style');
        $orgNav.removeClass('stuck');
      }
      else {
        $('.pre-content').css('padding-top', menuHeight);
        $orgNav.addClass('stuck');
      }
    }

    // Sticky on scroll.
    if ($('.pre-content').length) {
      $(window).scroll(function () {
        stickyOnScroll();
      });
    }

    // Mobile toggle.
    $mobileToggle.on('click', function () {
      const $this = $(this);
      $this.add($menuWrapper).toggleClass('menu-open');

      // when menu is open, always stick it to the top of the screen
      if($this.hasClass('menu-open')) {
        $this.attr('aria-expanded', true);
        if (!$orgNav.hasClass('stuck')) {
          $orgNav.addClass('stuck')
        }
      } else {
        $this.attr('aria-expanded', false);
      // when menu is closed, put it back to its original location.
        stickyOnScroll();
      }

      // Lock body scroll on mobile open/close.
      $('body').toggleClass('scroll-disabled');

      feedbackButton.toggle();

    });

    // org nav mobile modal keyboard nav
    document.addEventListener("keydown", function (e) {
      if ($mobileToggle.hasClass('menu-open')) {
        focusTrapping({
          focusableSelectors:
            ".ma__organization-navigation__item > a, #organization-navigation-search, .ma__button-search--secondary",
          closeButtonSelector: ".ma__organization-navigation__mobile-toggle.menu-open",
          modalSelector: ".ma__organization-navigation",
          keyEvent: e,
        });
      }
    });

    // Search form swing open/closed.
    $searchToggle.on('click', function () {
      $menuWrapper.toggleClass('form-open');

      let $buttonLabel = $searchToggle.find('.search-label');
      $buttonLabel.text($buttonLabel.text() == "Close" ? "Search this organization" : "Close");
    });

    $orgNavSearchForm.on('submit', function () {
      let searchAction = $(this).attr('action') + "&q=";
      let searchParams = $orgNavSearchInput.val();
      $(this).attr('action', searchAction + searchParams);
    });

    $menuItems.on('click', function (e) {
      // Close open menus and reset markup.
      $('.menu-open').removeClass('menu-open');

      if ($('body').hasClass('scroll-disabled')) {
        $('body').removeClass('scroll-disabled');
      }

      let location = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(location).offset().top - 120 }, 1000);

      if (feedbackButton.is(":hidden")) {
        feedbackButton.show();
      }
    });

    $(window).on("resize", function () {
      let windowWidth = $(window).width();
      // mobile only after window resize
      if (windowWidth <= mobileBreak) {
        $('body').removeClass('scroll-disabled');
      }
    }).resize();
  });
})(window, document, jQuery);
