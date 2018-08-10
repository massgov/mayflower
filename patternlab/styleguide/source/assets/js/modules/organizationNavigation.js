export default (function (window,document,$,undefined) {

  $('.ma__organization-navigation').each(function() {
    // Org Nav Wrapper.
    let $orgNav = $(this);
    let $orgNavItems = $orgNav.find('.ma__organization-navigation__items');

    // Page wrapper and fillers. 
    const $pageWrapper = $orgNav.parent().next();
    let $newsLink = $pageWrapper.find('.ma__press-listing');
    let $eventsLink = $pageWrapper.find('.ma__event-listing');
    let $locationsLink = $pageWrapper.find('.ma__mapped-locations');
    let $relatedOrgs = $pageWrapper.find('.ma__related-organizations');

    // Mobile Menu vars.
    let $mobileToggle = $orgNav.find('.ma__organization-navigation__mobile-toggle');
    let $mobileMenu = $orgNav.find('.ma__organization-navigation--inner-wrapper');
    const $mobileBreak = 910;

    // Search Wrapper vars.
    let $orgNavSearch = $orgNav.find('.ma__organization-navigation__search');
    let $orgNavSearchForm = $orgNav.find('.js-organization-navigation__search');
    let $orgNavSearchInput = $orgNav.find('#organization-navigation-search');
    let $orgNavSearchFormWrapper = $orgNav.find('.ma__organization-navigation__search--wrapper');
    let $searchOpen = $orgNavSearch.find('.js-toggle-open');
    let $searchClose = $orgNavSearch.find('.js-toggle-close');

    // Subnav buttons. 
    let $menuButton = $orgNav.find('.subnav-toggle');

    // I want to section.
    let $sectionButton = $orgNav.find('.ma__org-nav-i-want-to-section h3');

    // Contact Sections.
    $(window).one("resize", function () {

      if ($(window).width() > 910) {
        if($('.ma__contact-group__seeAll').length > 0) {
          let $contactGroups = $orgNav.find('.ma__contact-group');
          for(let i = 0; i < $contactGroups.length; i+=2) {
            $contactGroups.slice(i, i+2).wrapAll("<div class='wrappedGroup'></div>");
          }
        } else {
          $('.ma__contact-group:first-child').addClass('wrappedGroup');
          let $contactGroups = $orgNav.find('.ma__contact-group:not(:first-child)');
          for(let i = 0; i < $contactGroups.length; i+=2) {
            $contactGroups.slice(i, i+2).wrapAll("<div class='wrappedGroup'></div>");
          }
        }
      } else {
        $('.wrappedGroup').removeClass('wrappedGroup');
      }
    }).resize();

    // Sticky on scroll.
    if($('.pre-content').length) {
      const bannerBottom = $('.ma__page-banner').offset().top + $('.ma__page-banner').height();

      $(window).scroll(function () {
        const orgWindowTop = $(window).scrollTop();

        // Active Sticky TOC when on page TOC scrolls past.
        if (bannerBottom > orgWindowTop) {
          $orgNav.removeClass('stuck');
        } else {
          $orgNav.addClass('stuck');
        }
      });
    }  

    // Mobile toggle. 
    $mobileToggle.on( 'click', function() {
      $mobileToggle.add($mobileMenu).toggleClass('menu-open');
    });

    // Search form swing open/closed.
    $searchOpen.on( 'click', function() {
      $searchOpen.add($searchClose).addClass('form-open');
      $orgNavSearchFormWrapper.toggleClass('form-open');
      $('.item-open').removeClass('item-open');
    });

    $searchClose.on( 'click', function() {
      $searchOpen.add($searchClose).removeClass('form-open');
      $orgNavSearchFormWrapper.toggleClass('form-open');
    });

    $orgNavSearchForm.on( 'submit', function() {
      let searchAction = $(this).attr('action') + "&q=";
      let searchParams = $orgNavSearchInput.val();
      $(this).attr('action', searchAction + searchParams);
    });

    // Open the dropdowns.
    $menuButton.each(function() {
      let $button = $(this);
      let $buttonItem = $button.parent('li');
  
      $button.on( 'click', function() {
        $buttonItem.toggleClass('item-open');
        $buttonItem.siblings().removeClass('item-open');
        $('.form-open').removeClass('form-open');
      });
    });

    // Close menus on click off.
    $('body').on('click', function(event) {
        if($('.item-open').length && !$(event.target).closest('.ma__organization-navigation__item').length ) {
          $('.item-open').removeClass('item-open');
        }
    });
    

    // Mobile view open the "I want to sections".
    $sectionButton.each(function() {
      let $button = $(this);
      let $seeAll = $button.parent().find('.ma__link-list__see-all');
      if ($(window).width() < $mobileBreak) {
        $button.on( 'click', function() {
          $button.toggleClass('item-open');
          $button.next('.ma__link-list__container').add($seeAll).toggleClass('item-open');
        });
      }
    });

    if($relatedOrgs.length){
      $relatedOrgs.attr('id', 'organizations');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#organizations">Our Organizations</a></li>');
    }

    if($newsLink.length){
      $newsLink.attr('id', 'news');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#news">News</a></li>');
    }

    if($eventsLink.length){
      $eventsLink.attr('id', 'events');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#events">Events</a></li>');
    }

    if($locationsLink.length){
      $locationsLink.attr('id', 'locations');
      $orgNavItems.append('<li class="ma__organization-navigation__item"><a class="internal-link" href="#locations">Locations</a></li>');
    }
  });

  $(".internal-link").on('click', function(e) {
    // Close open menus
    $('.menu-open').removeClass('menu-open');
    $('.item-open').removeClass('item-open');
    $('.form-open').removeClass('form-open');

    e.preventDefault();
    let location = $(this).attr("href");
    $('html,body').animate({scrollTop: $(location).offset().top - 120}, 1000 );
  });
}) (window,document,jQuery);
