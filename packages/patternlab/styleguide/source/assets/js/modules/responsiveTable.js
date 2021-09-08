export default (function (window, document, $) {

  // Responsive table HTML structure
  // <div class="ma__table--responsive">
  //   <div class="ma__table--responsive__wrapper">
  //    <table> ... </table>
  //   </div>
  // </div>

  const $window = $(window);
  let responsiveTables = [];

  // Set the width of each sticky header cell and the width of the sticky
  // header table.
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

    // If the table has a thead with th elements, setup the sticky version.
    if (hasThead && hasTh && !isNestedThead) {
      theadHeight = $thead[0].offsetHeight;

      // Only wrap the table if this is the first time we have encountered it.
      if (!reset) {
        $thead = $thead.clone();
        $table.after("<div class='sticky-thead'><div class='sticky-thead-wrapper'><table></table></div></div>");

        $stickyHeader = $element.find(".sticky-thead");
        $stickyHeader.find("table").append($thead);
      }
      else {
        $stickyHeader = $element.find(".sticky-thead");
      }

      // Setting it in a fixed position, but initially invisible.
      let tableLeft = $element.offset().left;
      $stickyHeader
        .css({
          "pointer-events": "none",
          "position": "fixed",
          "left": tableLeft,
          "top": getAdditionalOffset(),
          "opacity": 0,
          "z-index": 50,
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
    // Make sure the scrollbar is the width of the table.
    $element.find(".ma__table__horizontal-nav").width($table.parent().width());

    // If we are not resetting, use the length as the index.
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
    // Set the widths of the header.
    setWidths(rt);
    // Setup the scrollbar deminsions.
    recalcScrollbar(rt);

    // If we are reseting, replace the element. Otherwise, add it.
    if (reset) {
      responsiveTables[index] = rt;
    }
    else {
      responsiveTables.push(rt);
      rt.$root[0].addEventListener("scroll", handleTableScroll, true);
    }
    // Decide what should be showing or stuck.
    checkVisibility(rt);

    // Reset scroll since this may have changed the max scroll amount.
    if (rt.canScroll) {
      const tableWrapper = element.getElementsByClassName("ma__table--responsive__wrapper")[0];
      const scrollbar = element.getElementsByClassName("ma__scroll-indicator")[0];
      tableWrapper.scrollLeft = 0;
      scrollbar.scrollLeft = scrollbar.scrollWidth - scrollbar.offsetWidth;
    }

  }

  // Certain other components that stick to the top of the page need to be accounted for.
  // This calculates the additional offset that a table sticky header should drop down.
  function getAdditionalOffset() {
    let additionalOffset = 0;
    if ($(".js-scroll-anchors")[0] &&
      document.documentElement.clientWidth <= 765) {
      additionalOffset += $(".js-scroll-anchors").height();
    }
    if (document.documentElement.classList.contains("stickyTOC")) {
      if (document.documentElement.clientWidth <= 841) {
        additionalOffset += 75;
      }
      else {
        additionalOffset += 70;
      }
    }
    return additionalOffset > 0 ? additionalOffset + "px" : 0;
  }

  // Based on the scroll position, decide whether or not to show or hide or scroll
  // or stick the header and scrollbar.
  function checkVisibility(rt) {
    const elementTop = rt.$root.offset().top;
    const windowTop = $window.scrollTop();
    const windowBottom = windowTop + $window.height();
    // + 50 to accommodate table padding for stickyNav
    const elementBottom = (elementTop + (rt.$root.height() + 50));
    const tableBottom = elementTop + rt.$table.height();

    // Handle header visibility.
    if (rt.$stickyHeader) {
      const stuckTop = rt.$stickyHeader.offset().top;
      const stuckBottom = stuckTop + rt.$stickyHeader.height();
      if (!rt.headerStuck && elementTop < stuckTop && tableBottom > stuckBottom) {
        responsiveTables[rt.index].headerStuck = true;
        rt.$stickyHeader.css("opacity", 1);
        rt.$stickyHeader.css("-webkit-box-shadow", "");
        rt.$stickyHeader.css("box-shadow", "");
        rt.$stickyHeader.css("pointer-events", "all");
      }
      else if (rt.headerStuck && (elementTop > stuckTop || tableBottom < stuckBottom)) {
        responsiveTables[rt.index].headerStuck = false;
        rt.$stickyHeader.css("opacity", 0);
        rt.$stickyHeader.css("-webkit-box-shadow", "none");
        rt.$stickyHeader.css("box-shadow", "none");
        rt.$stickyHeader.css("pointer-events", "none");
      }
    }

    // Handle scrollbar stuck / unstuck.
    if (rt.canScroll) {
      let headerBottom = elementTop;
      if (rt.$stickyHeader) {
        headerBottom += rt.$stickyHeader.height();
      }
      if (!rt.scrollStuck && windowBottom < elementBottom && headerBottom < windowBottom) {
        responsiveTables[rt.index].scrollStuck = true;
        rt.$root.addClass("stickNav");
        const tableLeft = rt.$root[0].getBoundingClientRect().left + $window["scrollLeft"]();
        rt.$root.find(".ma__table__horizontal-nav").css("left", tableLeft);
      }
      else if (rt.scrollStuck &&
        (windowBottom > elementBottom && windowTop < elementBottom ||
          headerBottom > windowBottom || elementBottom < windowTop)) {

        responsiveTables[rt.index].scrollStuck = false;
        rt.$root.removeClass("stickNav");
        rt.$root.find(".ma__table__horizontal-nav").css("left", "");
      }
    }
  }

  // When scrolling the window, handle header / scrollbar visibility and position.
  function handleScroll() {
    responsiveTables.forEach((rt) => {
      checkVisibility(rt);
    });
  }

  // When the window is resized, reset the tables.
  function handleWindowResize() {
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

    if (clickpoint < midpoint) {
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

  // Handle dragging the scrollbar.
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

  // Handle additional interactions with scrollbars.
  function scrollbarEventHandlers() {
    // @todo make this amount calculated based on a percentage of the scroll amount.
    const amountToScroll = 200;

    // Scrollbar left arrow.
    $(".ma__table__horizontal-nav__left").click(function () {
      const $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
      // On click of left arrow element, animate the movement of the scrollbar
      // to the left by the integer amount defined in `amountToScroll`.
      const currentScrollLeft = $scrollContainer.scrollLeft();

      $scrollContainer.animate({
        scrollLeft: (currentScrollLeft - amountToScroll) < 0 ? 0 : (currentScrollLeft - amountToScroll)
      }, 250);
    });

    // Scrollbar right arrow.
    $(".ma__table__horizontal-nav__right").click(function () {
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

  // Calculate and set the widths of scrollbar elements.
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
    const scrollbarWidth = scrollbarContainerWidth + scrollbarContainerWidth * (tableWidth - tableContainerWidth) / tableWidth;
    // Button width.
    const buttonWidth = scrollbarContainerWidth * tableContainerWidth / tableWidth;

    const $scrollbar = rt.$root.find(".clip-scrollbar");
    const $scrollbarIndicator = $scrollbar.find(".ma__scroll-indicator");

    $scrollbar.find(".ma__scroll-indicator--bar").css("width", `${scrollbarWidth}px`);
    $scrollbarIndicator.css("width", `${scrollbarContainerWidth}px`);
    $scrollbarIndicator.find(".ma__scroll-indicator__button").css("width", `${buttonWidth}px`);
  }

  // Allow a parameter to prevent triggering scrolling in an infinite loop.
  let skip = 0;

  // Calculate and set the scroll position of the other components when one component is scrolled.
  function handleTableScroll(e) {
    if (skip === 0) {
      const t = e.target;
      // No matter the element, the percentage as a decimal should be the amount of pixels scrolled
      // divided by the max amount that can be scrolled which is the scroll width minus the width.
      const scrollPercent = t.scrollLeft / (t.scrollWidth - t.offsetWidth);
      ["ma__table--responsive__wrapper", "ma__scroll-indicator", "sticky-thead-wrapper"].map(scrollable => {
        if (t.className !== scrollable) {
          const elements = this.getElementsByClassName(scrollable);
          if (elements.length > 0) {
            let el = elements[0];
            // If we are scrolling the scrollbar or the target is the scrollbar, inverse the scroll.
            if (scrollable === "ma__scroll-indicator" || t.className === "ma__scroll-indicator") {
              skip++;
              el.scrollLeft = (el.scrollWidth - el.offsetWidth) * (1 - scrollPercent);
            }
            // Set the scroll to the same as the target.
            else {
              skip++;
              el.scrollLeft = t.scrollLeft;
            }
          }
        }
      });
    }
    else {
      skip--;
    }
  }

  // Initialize the tables.
  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  // Set the scrollbar event handlers.
  scrollbarEventHandlers();

  // Set window scroll handler.
  $window.on("scroll", handleScroll);
  // Set window resize.
  $window.on("resize", handleWindowResize);

})(window, document, jQuery);
