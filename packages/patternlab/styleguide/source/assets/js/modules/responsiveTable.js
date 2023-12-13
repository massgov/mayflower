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
        $table.after(
          "<div class='sticky-thead'><div class='sticky-thead-wrapper'><table></table></div></div>"
        );

        $stickyHeader = $element.find(".sticky-thead");
        $stickyHeader.find("table").append($thead);
      } else {
        $stickyHeader = $element.find(".sticky-thead");
      }

      // Setting it in a fixed position, but initially invisible.
      let tableLeft = $element.offset().left;
      $stickyHeader.css({
        "pointer-events": "none",
        position: "fixed",
        left: tableLeft,
        top: getAdditionalOffset(),
        opacity: 0,
        "z-index": 50,
        height: theadHeight,
      });
      $stickyHeader[0].scrollLeft = 0;
    }

    // Add class, remove margins, reset width and wrap table.
    $table.addClass("sticky-enabled").css({
      margin: 0,
      width: "100%",
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
      canScroll,
    };
    // Set the widths of the header.
    setWidths(rt);

    // If we are reseting, replace the element. Otherwise, add it.
    if (reset) {
      responsiveTables[index] = rt;
    }
    else {
      responsiveTables.push(rt);
    //   rt.$root[0].addEventListener("scroll", handleTableScroll, true);
    }
    // Decide what should be showing or stuck.
    checkVisibility(rt);

    // Reset scroll since this may have changed the max scroll amount.
    let tableTitleCount = $table.find(".ma__table__caption__content").length;
    let scrollInfo = $table.find(".ma__table__caption__scroll-info");

      if (rt.canScroll) {
        //        SYNC THE JOB TO SCREEN RESIZE.
        const tableWrapper = element.getElementsByClassName("ma__table--responsive__wrapper")[0];
        const caption = $(tableWrapper).find("caption");
        const captionId = $(caption).attr("id");
        // const scrollInfo = $(tableWrapper).find(".ma__table__caption__scroll-info");

        $(tableWrapper).attr("tabindex", "0");

        // Table caption and screen reader instructions are separated.
        // Caption is announced first, then the instrucions follow.
        let srInfo = captionId + " sr-instructions";
        $(tableWrapper).attr("aria-labelledby", srInfo);
        $(scrollInfo).addClass("show");

        if ($(caption).hasClass("hide")) {
          $(caption).removeClass("hide");
        }
      }

    // Hide caption if no table title in no overflow.
    // scrollInfo is hardcoded in caption, so don't remove caption.
    if (!rt.canScroll) {
      if (tableTitleCount == 0) {
        $table.find(".ma__table__caption").addClass("hide");
      }

      // Remove the class at window size change.
      if ($(scrollInfo).hasClass("show")) {
        $(scrollInfo).removeClass("show");
      }
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

  // Initialize the tables.
  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  // Set window scroll handler.
  // $window.on("scroll", handleScroll);
  // Set window resize.
  $window.on("resize", handleWindowResize);

})(window, document, jQuery);
