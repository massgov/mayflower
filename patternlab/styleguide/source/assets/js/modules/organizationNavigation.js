export default (function (window,document,$,undefined) {

  $('.ma__organization-navigation').each(function() {
    // Org Nav Wrapper.
    let $orgNav = $(this);
    let $orgNavItems = $orgNav.find('.ma__organization-navigation__items');
    let $menuWrapper = $orgNav.find('.ma__organization-navigation--inner-wrapper');
    let $contactGroups;

    // Page wrapper and fillers. 
    const $pageWrapper = $orgNav.parent().next();
    let $newsLink = $pageWrapper.find('.ma__press-listing');
    let $eventsLink = $pageWrapper.find('.ma__event-listing');
    let $locationsLink = $pageWrapper.find('.ma__mapped-locations');
    let $relatedOrgs = $pageWrapper.find('.ma__related-organizations');

    // Mobile Menu vars.
    let $mobileToggle = $orgNav.find('.ma__organization-navigation__mobile-toggle');
    const mobileBreak = 910;

    // Search Wrapper vars.
    let $orgNavSearchForm = $orgNav.find('.js-organization-navigation__search');
    let $orgNavSearchInput = $orgNav.find('#organization-navigation-search');
    let $searchToggle = $orgNav.find('.ma__organization-navigation__search .js-search-toggle');

    // Subnav buttons. 
    let $menuButton = $orgNav.find('.subnav-toggle');

    // I want to section.
    let $sectionButton = $orgNav.find('.ma__org-nav-i-want-to-section .ma__comp-heading');


    // Sticky on scroll.
    if($('.pre-content').length) {
      const bannerBottom = $('.ma__page-banner').offset().top + $('.ma__page-banner').height();
      let menuHeight = $orgNav.height();
      $(window).scroll(function () {
        const orgWindowTop = $(window).scrollTop();
        let windowWidth = $(window).width();

        // Active Sticky TOC when on page TOC scrolls past.
        if (bannerBottom > orgWindowTop) {
          $('.pre-content').removeAttr('style');
          $orgNav.removeClass('stuck');
        } else {
          $('.pre-content').css("padding-top", menuHeight);
          $orgNav.addClass('stuck');
        }
      });
    }  

    // Mobile toggle. 
    $mobileToggle.on( 'click', function() {
      
      $mobileToggle.add($menuWrapper).toggleClass('menu-open');
      // Close items when closing menu.
      $('.item-open').removeClass('item-open');
      // Remove cloned button if present. 
      $('.section-toggle').remove();

      // Lock body scroll on mobile open/close.
      if($orgNav.hasClass('stuck')) {
        $('body').toggleClass('scroll-disabled');
      }
    });

    // Search form swing open/closed.
    $searchToggle.on( 'click', function() {
      $menuWrapper.toggleClass('form-open');

      let $buttonLabel = $searchToggle.find('.search-label');
      $buttonLabel.text($buttonLabel.text() == "Close" ? "Search this organization" : "Close");
    });

    $orgNavSearchForm.on('submit', function() {
      let searchAction = $(this).attr('action') + "&q=";
      let searchParams = $orgNavSearchInput.val();
      $(this).attr('action', searchAction + searchParams);
    });

    // Open the dropdowns.
    $menuButton.each(function() {
      let $button = $(this);
      let $buttonParent = $button.parent('.has-subnav');
      let $thisMenu = $buttonParent.find('.ma__organization-navigation__subitems');

      $button.add($thisMenu).on('mouseenter mouseleave', function() {
        let windowWidth = $(window).width();

        if(windowWidth > mobileBreak) {
          $('.section-toggle').remove();
          $buttonParent.add($thisMenu).toggleClass('item-open');
        }
        else {
          return false;
        };
      });

      $button.on( 'click', function() {
        let windowWidth = $(window).width();

        if(windowWidth < mobileBreak) {
          $buttonParent.toggleClass('item-open');
          let $buttonClone = $button.clone(true);

          // Copy the link as a close button inside the menu section.
          if (!$('.section-toggle').length) {
            $buttonClone.addClass('section-toggle').prependTo($thisMenu);
          }
        } 
        else {
          return false;
        };
      });
  
    });

    $('body').on('click', '.section-toggle', function() {
      $('.section-toggle').remove();
    });

    // Mobile view open the "I want to sections".
    $sectionButton.each(function() {
      

      let $button = $(this);
      let $seeAll = $button.parent().find('.ma__link-list__see-all');
        $button.on( 'click', function() {
          let windowWidth = $(window).width();
          if (windowWidth < mobileBreak) {
            $button.toggleClass('item-open');
            $button.next('.ma__link-list__container').add($seeAll).toggleClass('item-open');
          }
        });
      
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

    $('.ma__organization-navigation__item.mobileLogin').appendTo($orgNavItems);
  

    $(".internal-link").on('click', function(e) {
      // Close open menus and reset markup.
      $('.menu-open').removeClass('menu-open');
      $('.item-open').removeClass('item-open');
      $('.form-open').removeClass('form-open');
      $('.section-toggle').remove();

      e.preventDefault();
      let location = $(this).attr("href");
      $('html,body').animate({scrollTop: $(location).offset().top - 120}, 1000 );
    });

    $(window).on("resize", function () {
      let windowWidth = $(window).width();
      let $contactGroups = $orgNav.find('.ma__contact-group');

      if (windowWidth > 910) {
        // Check if already wrapped.
        if($('.wrappedGroup').length === 0){

          if(!$('.ma__contact-group__seeAll').length) {
            // If no 'see all link', wrap address separately.
            $('.ma__contact-group:first-child').addClass('wrappedGroup');
            $contactGroups = $contactGroups.not(':first');
          }
          // Wrap contact groups in sets of 2 for layout.
          for(let i = 0; i < $contactGroups.length; i+=2) {
            $contactGroups.slice(i, i+2).wrapAll("<div class='wrappedGroup'></div>");
          }
        }
      } 
      else {
        $('.wrappedGroup').find($contactGroups).unwrap();
      }

    }).resize();
  });
}) (window,document,jQuery);
