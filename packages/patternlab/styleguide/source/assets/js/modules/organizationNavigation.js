import focusTrapping from "../helpers/focusTrapping.js";
export default (function (window, document, $, undefined) {

  $('.ma__organization-navigation').each(function () {
    // Org Nav Wrapper.
    const $orgNav = $(this);
    const $orgNavItems = $orgNav.find('.ma__organization-navigation__items');
    const $menuWrapper = $orgNav.find('.ma__organization-navigation--inner-wrapper');

    // Page wrapper and fillers.
    const $pageWrapper = $orgNav.parent().next();
    let $newsLink = $pageWrapper.find('.ma__press-listing');
    let $eventsLink = $pageWrapper.find('.ma__event-listing');
    let $locationsLink = $pageWrapper.find('.ma__mapped-locations');
    let $relatedOrgs = $pageWrapper.find('.ma__our-organizations');

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

    // Subnav buttons.
    let $menuButton = $orgNav.find('.subnav-toggle');

    // I want to section.
    let $sectionButton = $orgNav.find('.ma__org-nav-i-want-to-section .ma__comp-heading');

    // Sticky on scroll.
    if ($('.pre-content').length) {
      const bannerBottom = $('.ma__page-banner').offset().top + $('.ma__page-banner').height();
      let menuHeight = $orgNav.height();
      $(window).scroll(function () {
        const orgWindowTop = $(window).scrollTop();
        let windowWidth = $(window).width();

        // Active Sticky TOC when on page TOC scrolls past.
        if (bannerBottom > orgWindowTop) {
          $('.pre-content').removeAttr('style');
          $orgNav.removeClass('stuck');
        }
        else {
          $('.pre-content').css('padding-top', menuHeight);
          $orgNav.addClass('stuck');
        }
      });
    }

    // Mobile toggle.
    $mobileToggle.on('click', function () {

      if (!$orgNav.hasClass('stuck')) {
        $orgNav.addClass('stuck')
      }

      $mobileToggle.add($menuWrapper).toggleClass('menu-open');
      $mobileToggle.attr('aria-expanded', (_, attr) => attr == 'false' ? 'true' : 'false');

      // Close items when closing menu.
      $('.item-open').removeClass('item-open');
      // Remove cloned button if present.
      $('.section-toggle').remove();

      // Lock body scroll on mobile open/close.
      $('body').toggleClass('scroll-disabled');

      feedbackButton.toggle();

      // Mobile nav menu items.
      let $mobileOpenMenuButton = $('.item-open').find('.subnav-toggle');
      let $mobileOpenSubMenu = $('.item-open').find('.ma__organization-navigation__subitems');
      let $mobileOpenSubnavToggle = $mobileOpenSubMenu.find('.subnav-toggle');

      $mobileOpenMenuButton.attr('aria-expanded', (_, attr) => attr == 'false' ? 'true' : 'false');
      $mobileOpenSubMenu.attr('aria-hidden', (_, attr) => attr == 'false' ? 'true' : 'false');
      // $mobileOpenSubMenu.toggleClass('visuallyhidden');



      // $mobileOpenMenuButton.on('click', () => {
      //   if ($mobileOpenMenuButton.attr('aria-expanded') === 'true') {
      //     $mobileOpenSubMenu.css('visibility', 'visible');
      //   }
      //   else {
      //     $mobileOpenSubMenu.removeAttr('style');
      //   }
      // });

        // $searchToggle.attr('aria-expanded', (_, attr) => attr == 'false' ? 'true' : 'false');



        // if ($('.item-open').hasClass('item-open')) {
        //   $mobileOpenMenuButton.attr('aria-expanded', 'true');
        //   $mobileOpenSubMenu.attr('aria-hidden', 'false');
        //   $mobileOpenSubMenu.css('visibility','visible');


        //         // Open submenu
        // if ($buttonParent.hasClass('item-open')) {
        //   $button.attr('aria-expanded', 'true');
        //   $thisMenu.css('top', menuHeight);
        //   $thisMenu.removeAttr('aria-hidden');
        //   $thisMenu.css('visibility','visible');

        //     function closeMenuTasks () {
        //   $buttonParent.removeClass('item-open');
        //   $button.attr('aria-expanded', 'false');
        //   $thisMenu.attr('aria-hidden', 'true');
        //   $thisMenu.removeAttr('style');
        // }

        // }

    });

    // Search form swing open/closed.
    $searchToggle.on('click', function () {
      $menuWrapper.toggleClass('form-open');

      let $buttonLabel = $searchToggle.find('.search-label');
      $buttonLabel.text($buttonLabel.text() == "Close" ? "Search this organization" : "Close");
      $searchToggle.attr('aria-expanded', (_, attr) => attr == 'false' ? 'true' : 'false');
      $searchToggle.attr('aria-label', (_, attr) => attr == 'open the search box for the organization specific search' ? 'close the organization specific search component' : 'open the search box for the organization specific search');
    });

    $orgNavSearchForm.on('submit', function () {
      let searchAction = $(this).attr('action') + "&q=";
      let searchParams = $orgNavSearchInput.val();
      $(this).attr('action', searchAction + searchParams);
    });

    // Manage org submenus.
    $menuButton.each(function () {
      let $button = $(this);
      let $buttonParent = $button.parent('.has-subnav');
      let $thisMenu = $buttonParent.find('.ma__organization-navigation__subitems');
      // let $otherMenus = $('.ma__organization-navigation__subitems').not($thisMenu);
      let menuHeight = $menuWrapper.outerHeight();
      let $firstSubmenuItem = $thisMenu.find('.ma__organization-navigation__subitem a:first');

      $button.on('click', function () {
        let windowWidth = $(window).width();

        if (windowWidth < mobileBreak) {
        // Mobile version
          $buttonParent.toggleClass('item-open');
          let $buttonClone = $button.clone(true);

          // Copy the link as a close button inside the menu section.
          if (!$('.section-toggle').length) {
            $buttonClone.addClass('section-toggle').prependTo($thisMenu);
          }
        }
        else {
        // Desktop version
          $buttonParent.toggleClass('item-open');
          $thisMenu.toggleClass('visuallyhidden');
          // Open submenu
          if ($buttonParent.hasClass('item-open')) {
            $button.attr('aria-expanded', 'true');
            $thisMenu.css('top', menuHeight);
            $thisMenu.removeAttr('aria-hidden');
            // $thisMenu.css('visibility','visible');
            // $thisMenu.removeClass('visuallyhidden');

            // Close submenu with ESC.
            $thisMenu.on('keyup', function(e) {
              if (e.key === "Escape") {
                closeMenuTasks();
                $button.focus();
              }
            });

            // Close submenu with Shift + Tab on the first focusable element in the submenu.
            // Has to be 'keydown'. 'keyup' doesn't work with shift key.
            $firstSubmenuItem.on('keydown', (e) => {
              if (e.shiftKey && e.key == "Tab") {
                closeMenuTasks();
              }
            });
          }
          else {
            closeMenuTasks();
          }
        }

        // When focus moves to another menu item, close the open menu container.
        // Only one menu container opens at a time.
        $('.ma__organization-navigation__items .has-subnav').each(function () {
          let $orgNavMenuButton = $(this).find('.subnav-toggle');

          if ($(this).hasClass('item-open')) {
            if($(this).find(':focus').length === 0){
              $(this).removeClass('item-open');
              $orgNavMenuButton.attr('aria-expanded', 'false');
              $(this).find('.ma__organization-navigation__subitems').attr('aria-hidden', 'true');
              // $(this).find('.ma__organization-navigation__subitems').removeAttr('style');
              $(this).find('.ma__organization-navigation__subitems').toggleClass('visuallyhidden');
            }
          }
        });
      });

      function closeMenuTasks () {
        $buttonParent.removeClass('item-open');
        $button.attr('aria-expanded', 'false');
        $thisMenu.attr('aria-hidden', 'true');
        // $thisMenu.removeAttr('style');
        $thisMenu.toggleClass('visuallyhidden');
      }
    });

    $('body').on('click', '.section-toggle', function () {
      $('.section-toggle').remove();
    });

    // Mobile view open the "I want to sections".
    $sectionButton.each(function () {

      let $button = $(this);
      let $seeAll = $button.parent().find('.ma__link-list__see-all');
      $button.on('click', function () {
        let windowWidth = $(window).width();
        if (windowWidth < mobileBreak) {
          $button.toggleClass('item-open');
          $button.next('.ma__link-list__container').add($seeAll).toggleClass('item-open');
        }
      });

    });

    if ($relatedOrgs.length) {
      $relatedOrgs.attr('id', 'organizations');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#organizations">Our organizations</a></li>');
    }

    if ($newsLink.length) {
      $newsLink.attr('id', 'news');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#news">News</a></li>');
    }

    if ($eventsLink.length) {
      $eventsLink.attr('id', 'events');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#events">Events</a></li>');
    }

    if ($locationsLink.length) {
      $locationsLink.attr('id', 'locations');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#locations">Locations</a></li>');
    }

    $('.ma__organization-navigation__item.mobileLogin').appendTo($orgNavItems);

    $(".internal-link").on('focus', function (e) {
      closeOpenMenu ();
    });

    $('.item-open .ma__organization-navigation__subitems').focusout(closeOpenMenu());

    $(".internal-link").on('click', function (e) {
      // Close open menus and reset markup.
      $('.menu-open').removeClass('menu-open');
      $('.item-open').removeClass('item-open');
      $('.form-open').removeClass('form-open');
      $('.section-toggle').remove();

      e.preventDefault();
      let location = $(this).attr('href');
      $('html, body').animate({ scrollTop: $(location).offset().top - 120 }, 1000);

      if (feedbackButton.is(":hidden")) {
        feedbackButton.show();
      }
    });

    function closeOpenMenu () {
      $('.item-open .subnav-toggle').attr('aria-expanded', 'false');
      $('.item-open .ma__organization-navigation__subitems').attr('aria-hidden', 'true');
      // $('.item-open .ma__organization-navigation__subitems').removeAttr('style');
      $('.item-open .ma__organization-navigation__subitems').toggleClass('visuallyhidden');
      $('.item-open').removeClass('item-open');
    }

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

$(document).keydown(function(e) {
  if (document.querySelector('.ma__organization-navigation__item.has-subnav')) {
    if (document.querySelector('.ma__organization-navigation__item.has-subnav').classList.contains('item-open')) {
      focusTrapping({
        focusableSelectors: 'a',
        closeButtonSelector: '.subnav-toggle',
        modalSelector: '.ma__organization-navigation__subitems',
        keyEvent: e
      });
    }
  }
});
