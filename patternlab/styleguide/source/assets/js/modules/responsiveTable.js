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

  function calcAllowance($table, $stickyHeader) {
    var a = 0;
    // Calculate allowance.
    $table.find("tbody tr:lt(2)").each(function() {
      a += $(this).height();
    });

    // Set fail safe limit (last three row might be too tall).
    // Set arbitrary limit at 0.25 of viewport height,
    // or you can use an arbitrary pixel value.
    if (a > $window.height() * 0.25) {
      a = $window.height() * 0.25;
    }

    // Add the height of sticky header.
    a += $stickyHeader.height();
    return a;
  }

  function updatePositions(rt) {
    // Return value of calculated allowance.
    let visibleParams = getVisibleParams(rt.$root[0]);
    // Position sticky header based on viewport scrollTop.
    if (rt.$stickyHeader) {
      let allowance = calcAllowance(rt.$table, rt.$stickyHeader);
      if (
        $window.scrollTop() > rt.$table.offset().top &&
        $window.scrollTop() < rt.$table.offset().top + rt.$table.outerHeight() - allowance
      ) {

        let additionalOffset = 0;

        if (document.documentElement.clientWidth <= 825) {
          const $jsStickyHeader = $(".js-sticky-header");
          if ($jsStickyHeader) {
            additionalOffset += $jsStickyHeader.height();
          }
        }
        if ($(".js-scroll-anchors")[0] &&
          $(".js-scroll-anchors").css("position") === "fixed" &&
          document.documentElement.clientWidth <= 765) {
          additionalOffset += $(".js-scroll-anchors").height();
        }

        // When top of viewport is in the table itself.
        rt.$stickyHeader.css({
          "opacity": 1,
          "top": $window.scrollTop() - rt.$table.offset().top + additionalOffset
        });
      }
      else {
        // When top of viewport is above or below table.
        rt.$stickyHeader.css({
          opacity: 0,
          top: 0
        });
      }
    }

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

    // Add class, remove margins, reset width and wrap table.
    $table
      .addClass("sticky-enabled")
      .css({
        margin: 0,
        width: "100%"
      });

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

  function handleOverlappingElements(rt) {
    let visibleParams = getVisibleParams(rt.$root[0]);

    if (!visibleParams.entirelyOutOfView) {
      $(".ma__floating-action").hide();
    }
    else {
      $(".ma__floating-action").show();
    }
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
      recalcScrollbar(rt);
      handleOverlappingElements(rt);
    });
  }

  function handleBeginScrolling() {
    responsiveTables.forEach((rt) => {
      rt.$root.addClass("is-scrolling");
    });
  }

  function handleEndScrolling() {
    responsiveTables.forEach(rt => {
      rt.$root.removeClass("is-scrolling");
    });
  }

  function scrollStartStop() {
    if (Date.now() - lastScrollAt > 100) {
      handleBeginScrolling();
    }

    lastScrollAt = Date.now();

    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(function () {
      if (Date.now() - lastScrollAt > 20) {
        handleEndScrolling();
      }
    }, 100);
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

  let lastScrollAt = Date.now();
  let scrollTimeout;

  // fire on horizontal scroll of container as well.
  $(".ma__table--responsive__wrapper").on("scroll", throttle(handleScroll, 100));

  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  // Setup resize events.
  $window.on("resize", handleWindowResize);

  // @todo - Is this needed to run on :attach?
  handleWindowResize();

  $window.on("scroll", handleScroll);

  // @todo - Clean this up to be cleaner.
  $(document).on("scroll", scrollStartStop);

  $('.ma__table--responsive.has-horizontal-scroll').each(function() {
    let $thisTable = $(this);
    let $navBar = $thisTable.find('.ma__table__horizontal-nav');
    let navBarHeight = $navBar.height();
    let tableLeft;
    let bottomRows;
    let $tableWrapper = $thisTable.find('.ma__table--responsive__wrapper'); 

    $navBar.addClass('full-left');

    $tableWrapper.on('scroll', function() {
      if($(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth) {
        $navBar.addClass('full-right');
        $navBar.removeClass('full-left');
      } else if($(this).scrollLeft() === 0) {
        $navBar.addClass('full-left');
        $navBar.removeClass('full-right');
      } 
      else {
        $navBar.removeClass('full-right');
        $navBar.removeClass('full-left');
      }
    });

    $window.on('resize', function() {
      tableLeft = $thisTable[0].getBoundingClientRect().left   + $(window)['scrollLeft']();
      bottomRows = 0;
      $thisTable.find(".ma__table--wide tbody tr:gt(-3)").each(function() {
        bottomRows += $(this).height();
      });

      return tableLeft, bottomRows;
      
    }).resize();

    $window.on('scroll', function() {
      let pageTop = $window.scrollTop();
      let pageBottom = pageTop + $window.height();
      let wrapperTop = $thisTable.offset().top;
      let tableTop = wrapperTop + navBarHeight;
      let stickyNavTrigger = tableTop + 75;
      let tableBottom = tableTop + $thisTable.innerHeight() - navBarHeight;

      if(stickyNavTrigger < pageBottom) {
        $thisTable.addClass('stickNav');
        $navBar.css('left', tableLeft);
      }
      if(tableBottom < pageBottom) {
        $thisTable.removeClass('stickNav');
        $navBar.css('left', '');
      }
      if(($thisTable.hasClass('stickNav')) && (stickyNavTrigger > pageBottom)) {
        $thisTable.removeClass('stickNav');
        $navBar.css('left', '');
      }
    });
  });

  // Setup scrollbar handlers.
  scrollbarEventHandlers();

})(window, document, jQuery);
