import throttle from "../helpers/throttle.js";

export default (function (window, document, $) {

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
      rt.$stickyHeader.find("table").width(rt.$table.width());
      rt.$stickyHeader.width(rt.$stickyHeader.parent().width());
    }
  }

  // Initialize or reset the responsive tables. This includes creating a copy
  // of the header and setting its fixed position properly.
  function initializeTable(element, reset = false, index = false) {
    const $element = $(element);
    let $table = $element.find("table").not("table table");
    let $thead = $table.find("thead").not("table table thead");
    const hasThead = $thead.length;
    let theadHeight = 0;
    const isNestedThead = $thead.closest("table table").length;
    const hasTh = $table.find("th").length;
    let $stickyHeader = null;
    const canScroll = $table.width() > $table.parent().width();

    if (hasThead && hasTh && !isNestedThead) {
      theadHeight = $thead[0].offsetHeight;
      if (!reset) {
        $thead = $thead.clone();
        $table.after("<div class='sticky-thead'><div class='sticky-thead-wrapper'><table class='ma__table'></table></div></div>");

        $stickyHeader = $element.find(".sticky-thead");
        $stickyHeader.find("table").append($thead);
      }
      else {
        $stickyHeader = $element.find(".sticky-thead");
      }

      // Check return from this so that it works in IE and Edge.
      // const tableCoordinates = element.getBoundingClientRect();
      // let tableLeft;
      // if ("x" in tableCoordinates.x) {
      //   tableLeft = element.getBoundingClientRect().left;
      // }
      // else {
      //   tableLeft = element.getBoundingClientRect().x;
      // }

      let tableLeft = $element.offset().left;

      $stickyHeader
        .css({
          "position": "fixed",
          "left": tableLeft,
          "top": getAdditionalOffset(),
          "opacity": 0,
          "height": theadHeight
        });
      $stickyHeader[0].scrollLeft = 0;
    }

    // Add class, remove margins, reset width and wrap table.
    $table
      .addClass("sticky-enabled")
      .css({
        margin: 0,
        width: "100%"
      });
    
    $element.toggleClass("has-horizontal-scroll", canScroll);
    $element.find(".ma__table__horizontal-nav").width($table.parent().width());

    if (index === false) {
      index = responsiveTables.length;
    }

    let rt = {
        index: index,
        $root: $element,
        $table: $table,
        $stickyHeader: $stickyHeader,
        theadHeight: theadHeight,
        headerStuck: false,
        scrollStuck: false,
        canScroll
    };
    setWidths(rt);
    recalcScrollbar(rt);

    if (reset) {
      responsiveTables[index] = rt;
    }
    else {
      responsiveTables.push(rt);
      rt.$root[0].addEventListener("scroll", handleTableScroll, true);
    }
    checkVisibility(rt);

    // Reset scroll.
    if (rt.canScroll) {
      const tableWrapper = element.getElementsByClassName("ma__table--responsive__wrapper")[0];
      tableWrapper.scrollLeft = 0;
      element.getElementsByClassName("ma__scroll-indicator")[0].scrollLeft = tableWrapper.scrollWidth - tableWrapper.offsetWidth;
    }
    
  }
  
  // Certain other components that stick to the top of the page need to be accounted for.
  // This calculates the additional offset that a table sticky header should drop down.
  function getAdditionalOffset() {
    let additionalOffset = 0;

    if (document.documentElement.clientWidth <= 825) {
      const $jsStickyHeader = $(".js-sticky-header");
      if ($jsStickyHeader) {
        additionalOffset += $jsStickyHeader.height();
      }
    }
    if ($(".js-scroll-anchors")[0] &&
      document.documentElement.clientWidth <= 765) {
      additionalOffset += $(".js-scroll-anchors").height();
    }
    return additionalOffset > 0 ? additionalOffset + "px" : 0;
  }

  function checkVisibility(rt) {
    const elementTop = rt.$root.offset().top;
    const windowTop = $window.scrollTop();
    const windowBottom = windowTop + $window.height();
    const elementBottom = (elementTop + rt.$root.height());

    if (rt.$stickyHeader) {
      const stuckTop = rt.$stickyHeader.offset().top;
      if (!rt.headerStuck && elementTop < stuckTop && elementBottom > stuckTop) {
        responsiveTables[rt.index].headerStuck = true;
        rt.$stickyHeader.css("opacity", 1);
      }
      else if (rt.headerStuck && (elementTop > stuckTop || elementBottom < stuckTop)) {
        responsiveTables[rt.index].headerStuck = false;
        rt.$stickyHeader.css("opacity", 0);
      }
    }

    if (rt.canScroll) {
      if (!rt.scrollStuck && windowBottom < elementBottom && elementTop < windowBottom) {
        responsiveTables[rt.index].scrollStuck = true;
        rt.$root.addClass("stickNav");
        const tableLeft = rt.$root[0].getBoundingClientRect().left + $window["scrollLeft"]();
        rt.$root.find(".ma__table__horizontal-nav").css("left", tableLeft);
      }
      else if (rt.scrollStuck &&
        (windowBottom > elementBottom && windowTop < elementBottom ||
        elementTop > windowBottom || elementBottom < windowTop)) {

        responsiveTables[rt.index].scrollStuck = false;
        rt.$root.removeClass("stickNav");
        rt.$root.find(".ma__table__horizontal-nav").css("left", "");
      }
    }
  }

  function handleScroll() {
    responsiveTables.forEach((rt) => {
      checkVisibility(rt);
    });
  }

  function handleWindowResize () {
    responsiveTables.forEach((rt) => {
      initializeTable(rt.$root[0], true, rt.index);
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

  function scrollbarEventHandlers() {
    const amountToScroll = 200;

    // Scrollbar left arrow.
    $(".ma__table__horizontal-nav__left").click(function() {
      const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
      // On click of left arrow element, animate the movement of the scrollbar
      // to the left by the integer amount defined in `amountToScroll`.
      const currentScrollLeft = $scrollContainer.scrollLeft();

      $scrollContainer.animate({
        scrollLeft: (currentScrollLeft - amountToScroll) < 0 ? 0 : (currentScrollLeft - amountToScroll)
      }, 250);
    });

    // Scrollbar right arrow.
    $(".ma__table__horizontal-nav__right").click(function() {
      const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
      // On click of left arrow element, animate the movement of the scrollbar
      // to the left by the integer amount defined in `amountToScroll`.
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

  function recalcScrollbar(rt) {
    // Table width.
    const tableWidth = rt.$table.width();
    // Table container width.
    const tableContainerWidth = rt.$table.parent().width();
    // Width of the arrows: < and >.
    const scrollArrowWidth = 16;
    // Margin to the left or right of the arrows: < and >.
    const scrollArrowMargin = 15;
    // Scrollbar container width = table container width minus arrows and arrow margin.
    const scrollbarContainerWidth = tableContainerWidth - (scrollArrowWidth + scrollArrowMargin) * 2;
    // Scrollbar width.
    const scrollbarWidth = tableWidth * scrollbarContainerWidth / tableContainerWidth;
    // Button width.
    const buttonWidth = scrollbarContainerWidth * scrollbarContainerWidth / scrollbarWidth;

    const $scrollbar = rt.$root.find(".clip-scrollbar");
    const $scrollbarIndicator = $scrollbar.find(".ma__scroll-indicator");
    
    $scrollbar.find(".ma__scroll-indicator--bar").css("width", `${scrollbarWidth}px`);
    $scrollbarIndicator.css("width", `${scrollbarContainerWidth}px`);
    $scrollbarIndicator.find(".ma__scroll-indicator__button").css("width", `${buttonWidth}px`);
  }

  let skip = 0;
  function handleTableScroll(e) {
    if (skip === 0) {
      let scrollAmount;
      let scrollInverse;
      const scrollIndicatorWidth = this.getElementsByClassName("ma__scroll-indicator")[0].offsetWidth;
      const ratio = scrollIndicatorWidth / this.offsetWidth;
      if (e.target.className === "ma__scroll-indicator") {
        scrollAmount = e.target.scrollLeft * ratio;
        scrollInverse = e.target.scrollWidth - e.target.offsetWidth - scrollAmount;
      }
      else {
        scrollAmount = e.target.scrollLeft;
        scrollInverse = (e.target.scrollWidth - e.target.offsetWidth - scrollAmount) / ratio;
      }
      ["ma__table--responsive__wrapper", "ma__scroll-indicator", "sticky-thead-wrapper"].map(scrollable => {
        if (e.target.className !== scrollable) {
          const elements = this.getElementsByClassName(scrollable);
          if (elements.length > 0) {
            if (scrollable === "ma__scroll-indicator" || e.target.className === "ma__scroll-indicator") {
              skip++;
              elements[0].scrollLeft = scrollInverse;
            }
            else {
              skip++;
              elements[0].scrollLeft = scrollAmount;
            }
          }
        }
      });
    }
    else {
      skip--;
    }
  }

  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  scrollbarEventHandlers();

  $window.on("scroll", handleScroll);
  $window.on("resize", handleWindowResize);

})(window, document, jQuery);