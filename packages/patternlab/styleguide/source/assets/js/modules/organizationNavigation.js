export default (function (window, document, $, undefined) {

  $('.ma__organization-navigation').each(function () {
    // Org Nav Wrapper.
    const $orgNav = $(this);
    const $menuWrapper = $orgNav.find('.ma__organization-navigation--inner-wrapper');

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
        if (!$orgNav.hasClass('stuck')) {
          $orgNav.addClass('stuck')
        }
      } else {
      // when menu is closed, put it back to its original location. 
        stickyOnScroll();
      }

      // Lock body scroll on mobile open/close.
      $('body').toggleClass('scroll-disabled');

      feedbackButton.toggle();

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

    $(".ma__organization-navigation__item > a").on('click', function (e) {
      // Close open menus and reset markup.
      $('.menu-open').removeClass('menu-open');

      e.preventDefault();
      let location = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(location).offset().top - 120 }, 1000);

      if (feedbackButton.is(":hidden")) {
        feedbackButton.show();
      }
    });

    $(window).on("resize", function () {
      let windowWidth = $(window).width();
      let $contactGroups = $orgNav.find('.ma__org-nav-contact-us .ma__contact-group');

      if (windowWidth > mobileBreak) {
        // Check if already wrapped.
        if ($('.wrappedGroup').length === 0) {

          if (!$('.ma__contact-group__seeAll').length) {
            // If no 'see all link', wrap address separately.
            $('.ma__contact-group:first-child').addClass('wrappedGroup');
            $contactGroups = $contactGroups.not(':first');
          }
          else {
            $contactGroups.slice(0, 2).wrapAll("<div class='wrappedGroup' />");
            $contactGroups = $contactGroups.slice(2);
          }

          if ($contactGroups.length < 3) {
            $contactGroups.wrap("<div class='wrappedGroup' />");
          }
          else {
            // Wrap contact groups in sets of 2 for layout.
            for (let i = 0; i < $contactGroups.length; i += 2) {
              $contactGroups.slice(i, i + 2).wrapAll("<div class='wrappedGroup' />");
            }
          }
        }
      }
      else {
        $('.wrappedGroup').find($contactGroups).unwrap();
        $('body').removeClass('scroll-disabled');
      }

    }).resize();
  });
})(window, document, jQuery);
