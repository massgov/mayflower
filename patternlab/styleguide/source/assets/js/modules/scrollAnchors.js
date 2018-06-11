import checkMobile from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {

  $(".js-scroll-anchors").each(function() {
    let $el = $(this),
        $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent(),
        $links = $el.find('.js-scroll-anchors-link'),
        elHeight,
        headerBuffer = 0,
        lowerLimit,
        upperLimit,
        debounceTimer,
        activeClass = "is-active",
        activeAnchorIndex = 0,
        anchors = [],
        numAnchors = 0,
        isMobile = false,
        linkScrolling = false;

    setVariables();

    // default assumption as to where the screen will load
    $el.attr('data-sticky','top');

    // update variables one more time to catch any post page load changes
    window.setTimeout(function(){
      setVariables();
    },1000);

    $links.on('click',function(e) {
      e.preventDefault();

      let $link = $(this);

      // is the menu closed on mobile
      if(!$el.hasClass('is-open') && isMobile) {
        // just show the menu
        $el.addClass('is-open');
        return;
      }

      activeAnchorIndex = $(this).data('index');
      // find the location of the desired link and scroll the page
      let position = anchors[activeAnchorIndex].position;
      // close the menu
      $el.removeClass('is-open');
      // prevent the scroll event from updating active links
      linkScrolling = true;

      $("html,body").stop(true,true).animate({scrollTop:position}, '750', function(){
        linkScrolling = false;
        // Get the link hash target so we can bring focus to it
        let hash = anchors[activeAnchorIndex].hash;
        // bring focus to the item we just scrolled to
        $(hash).focus();
        // timing issue with window.scroll event firing.
        setTimeout(function(){
          // set this link as active.
          $el.find('.' + activeClass).removeClass(activeClass);
          $link.addClass(activeClass);
        },30);
      });
    });

    // if the content contains accordions,
    // readjust settings when there state changes.
    $('.js-accordion-link').on('click',function() {
      if(typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function(){
        setVariables();
        setPosition();
        activateLink();
      },400);
    })

    $el.find(".js-scroll-anchors-toggle").on('click',function() {
      $el.toggleClass('is-open');
    });

    // make the links sticky
    $(window).resize(function() {
      if(typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function(){
        setVariables();
        setPosition();
        activateLink();
      },300);
    });

    $(window).scroll(function () {
      setPosition();

      if(!linkScrolling){
        activateLink();
      }
    });

    function setVariables() {
      let topOffset = 0;

      headerBuffer = 0;
      elHeight = $el.outerHeight(true);
      upperLimit = $elParent.offset().top;
      isMobile = checkMobile($el);

      if($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if(isMobile) {
        headerBuffer = $('.js-sticky-header').height() || 0;
        upperLimit -= headerBuffer;
        topOffset = elHeight;
      }

      lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

      // locate the position of all of the anchor targets
      anchors = new Array;
      $links.each(function(i,e){
        let $el = $(this),
          $link = $el.is('a') ? $el : $el.find('a'),
          hash = $link[0].hash,
          position = $(hash).offset() ? $(hash).offset().top - headerBuffer - topOffset : upperLimit;

        anchors[i] = { hash, position };

        $el.data('index',i);
      });

      // record the number of anchors for performance
      numAnchors = anchors.length;
    }

    function setPosition() {
      let windowTop = $(window).scrollTop(),
          attr = $el.attr('data-sticky'),
          top = attr !== 'top' && windowTop <= upperLimit,
          middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
          bottom = attr !== 'bottom' && windowTop >= lowerLimit;

      if($elParent[0].hasAttribute("style") && !isMobile) {
        $elParent.removeAttr('style');
      }

      if(!$elParent[0].hasAttribute("style") && isMobile && attr === 'middle') {
        $elParent.css({'paddingTop':elHeight});
      }

      if(top) {
        $el.attr('data-sticky','top');

        if(isMobile){
          $elParent.removeAttr('style');
        }
      }
      else if (middle) {
        $el.attr('data-sticky','middle');

        if(isMobile){
          $elParent.css({'paddingTop':elHeight});
        }
      }
      else if (bottom) {
        $el.attr('data-sticky','bottom');

        if(isMobile){
          $elParent.removeAttr('style');
        }
      }
    }

    function activateLink() {
      // do we have more than one anchor
      if(numAnchors < 2 || linkScrolling) {
        return;
      }

      // get the current scroll position and offset by half the view port
      let windowTop = $(window).scrollTop() + (window.innerHeight/2),
          currentAnchor = activeAnchorIndex;

      // is there a prev target
      // and
      // is the current scroll position above the current target
      if(currentAnchor > 0 && windowTop < anchors[activeAnchorIndex].position) {
        // make the prev link active
        --activeAnchorIndex;
      }

      // is there a next target
      // and
      // is the current scroll position below the next target
      else if(currentAnchor < numAnchors-1 && windowTop > anchors[activeAnchorIndex+1].position) {
        // make the next link active
        ++activeAnchorIndex;
      }

      if (currentAnchor !== activeAnchorIndex) {
        // move the active flag
        $el.find('.' + activeClass).removeClass(activeClass);
        $links.eq(activeAnchorIndex).addClass(activeClass);
      }
    }
  });
}(window,document,jQuery);
