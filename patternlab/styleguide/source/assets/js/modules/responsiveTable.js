import throttle from "../helpers/throttle.js";

export default (function (window, document, $, undefined) {

  // Responsive table HTML structure
  // <div class="ma__table--responsive">
  //   <div class="ma__table--responsive__wrapper">
  //    <table class="ma__table"> ... </table>
  //   </div>
  // </div>

  const $window = $(window);
  let responsiveTables = [];

  function setWidths(rt) {

    rt.$table
      .find("thead th")
      .each(function (i) {
        rt.$stickyHeader
          .find("th")
          .eq(i)
          .width($(this).width());
      });

    if (rt.$stickyHeader) {
      // Set width of sticky table head.
      rt.$stickyHeader.width(rt.$table.width());
    }

  }

  function updatePositions(rt) {

    // Check if the table width is greater than the width of the parent.
    let canScrollHorizontally = rt.$table.width() > rt.$table.parent().width();
    if (canScrollHorizontally) {
      // If so, update class and set the width navbar,
      // to the width of the parent.
      rt.$root.toggleClass("has-horizontal-scroll", canScrollHorizontally);
      rt.$root.find(".ma__table__horizontal-nav").width(rt.$table.parent().width());
    }
  }

  function initializeTable(element) {
    const $element = $(element);
    let $table = $element.find("table").not("table table");
    let $thead = $table.find("thead").not("table table thead");
    const hasThead = $thead.length;
    const isNestedThead = $thead.closest("table table").length;
    const hasTh = $table.find("th").length;
    let $stickyHeader = null;

    if (hasThead && hasTh && !isNestedThead) {
      $thead = $thead.clone();
      $table.after("<table class='ma__table sticky-thead' />");

      $stickyHeader = $element.find(".sticky-thead");
      $stickyHeader.append($thead);

    }


    responsiveTables.push({
      $root: $(element),
      $table: $table,
      $stickyHeader: $stickyHeader
    });

  }

  function getVisibleParams(element) {
    let pageTop = $(window).scrollTop();
    let pageBottom = pageTop + $(window).height();
    let elementTop = $(element).offset().top;
    let elementBottom = elementTop + $(element).height();

    let topOutOfView = elementTop > pageTop && elementTop < pageBottom;
    let bottomOutOfView = pageTop > elementBottom;
    let entirelyOutOfView = pageTop > elementBottom || pageBottom < elementTop;

    return {
      topOutOfView: topOutOfView,
      bottomOutOfView: bottomOutOfView,
      entirelyOutOfView: entirelyOutOfView
    };
  }

  function recalcScrollbar(rt) {
    let containerWidth = rt.$table.parent().width();
    let tableWidth = rt.$table.width();
    let visiblePercentage = (containerWidth / tableWidth) * 100;
    let leftVisiblePercentage = Math.abs((rt.$table.offset().left - rt.$table.parent().offset().left) / tableWidth) * 100;
    let calcOperator;

    if (leftVisiblePercentage == 0) {
      calcOperator = "-";
    }
    else {
      calcOperator = "+";
    }

    rt.$root.find(".ma__scroll-indicator__button").css({
      left: `calc(${leftVisiblePercentage}% ${calcOperator} 2px)`,
      width: `calc(${visiblePercentage}%)`
    });
  }

  // Apply scroll-based classes.
  function applyScrollClasses(rt) {
    let visibleParams = getVisibleParams(rt.$root[0]);

    rt.$root.toggleClass("has-top-visible", visibleParams.topOutOfView);
    rt.$root.toggleClass("has-bottom-visible", visibleParams.bottomOutOfView);
    rt.$root.toggleClass("is-out-of-view", visibleParams.entirelyOutOfView);

  }

  function handleWindowResize () {
    responsiveTables.forEach((rt) => {
      setWidths(rt);
      updatePositions(rt);
      recalcScrollbar(rt);
    });
  }

  function handleScroll() {
    responsiveTables.forEach((rt) => {
      updatePositions(rt);
      applyScrollClasses(rt);
    });
  }

  // Scroller click handler.
  function handleScrollerClick(e) {
    const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
    let posX = $(this).position().left;
    let midpoint = $(e.target).offset().left + $(e.target).width() / 2;
    let clickpoint = e.pageX - posX;

    if (clickpoint < midpoint ) {
      // Scroll left.
      $scrollContainer.animate({
        scrollLeft: $scrollContainer.scrollLeft() - Math.abs(midpoint - clickpoint)
      }, 250);
    }
    else {
      // Scroll right.
      $scrollContainer.animate({
        scrollLeft: $scrollContainer.scrollLeft() + Math.abs(midpoint - clickpoint)
      }, 250);
    }
  }

  function handleScrollerInteraction(e) {
    const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");

    let initialPosition = {
      x: e.pageX,
      y: e.pageY
    };

    function handleMouseUp() {
      // Remove listeners.
      $("body")
        .off("mousemove", handleMouseMove)
        .off("mouseup", handleMouseUp);
    }

    function handleMouseMove(e) {
      let newPosition = {
        x: e.pageX,
        y: e.pageY
      };

      $scrollContainer.scrollLeft($scrollContainer.scrollLeft() + newPosition.x - initialPosition.x);
    }
    // Attach to body so you don't get a
    // disconnected handler if you drag off the bar.
    $("body")
      .on("mouseup", handleMouseUp)
      .on("mousemove", handleMouseMove);

  }

  // Scrollbar event handlers.
  function scrollbarEventHandlers() {
    const amountToScroll = 200;
    // @todo Cache `$scrollContainer` to avoid multiple lookups.

    // Scrollbar left arrow.
    $(".ma__table__horizontal-nav__left").click(function() {
      // On click of left arrow element, animate the movement of the scrollbar
      // to the left by the integer amount defined in `amountToScroll`.
      const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
      const currentScrollLeft = $scrollContainer.scrollLeft();

      $scrollContainer.animate({
        scrollLeft: (currentScrollLeft - amountToScroll) < 0 ? 0 : (currentScrollLeft - amountToScroll)
      }, 250);
    });

    // Scrollbar right arrow.
    $(".ma__table__horizontal-nav__right").click(function() {
      // On click of left arrow element, animate the movement of the scrollbar
      // to the left by the integer amount defined in `amountToScroll`.
      const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
      $scrollContainer.animate({
        scrollLeft: $scrollContainer.scrollLeft() + amountToScroll
      }, 250);
    });

    // Scroll indicator element.
    $(".ma__scroll-indicator").on("click", handleScrollerClick);

    $(".ma__scroll-indicator__button")
      .on("mousedown", handleScrollerInteraction)
      // Deaden clicking on the scroll button
      // in order to handle click on parent.
      .on("click", e => e.stopPropagation());

  }


  // fire on horizontal scroll of container as well.
  $(".ma__table--responsive__wrapper").on("scroll", throttle(handleScroll, 100));

  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  // Setup resize events.
  $window.on("resize", handleWindowResize);

  // @todo - Is this needed to run on :attach?
  handleWindowResize();

  // Setup scrollbar handlers.
  scrollbarEventHandlers();

  $('.ma__table--responsive.has-horizontal-scroll').each(function() {
    let $thisTable = $(this);
    let headersHeight = $thisTable.find('.ma__table.sticky-thead thead').height();
    let navBarHeight = $thisTable.find('.ma__table__horizontal-nav').height();
    let tableLeft = $thisTable[0].getBoundingClientRect().left   + $(window)['scrollLeft']();

    $window.on('scroll', function() {
      let pageTop = $window.scrollTop();
      let pageBottom = pageTop + $window.height();
      let tableTop = $thisTable.offset().top + headersHeight + navBarHeight;
      
      if(tableTop < pageBottom) {
        $thisTable.addClass('stickNav');
        $('.ma__table__horizontal-nav').css('left', tableLeft);
        $('body').addClass('stickyTable');
      }
    });
  });
  

})(window, document, jQuery);
