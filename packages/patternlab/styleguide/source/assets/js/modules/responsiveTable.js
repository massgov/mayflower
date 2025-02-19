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
    rt.$table.find("thead th").each(function (i) {
      rt.$stickyHeader.find("th").eq(i).width($(this).width());
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
    const $tableWrapper = $table.parent();
    const horizontalScrollable = $table.width() > $tableWrapper.width();

    // If the table has a thead with th elements, setup the sticky version.
    if (hasThead && hasTh && !isNestedThead) {
      theadHeight = $thead[0].offsetHeight;

      // Only wrap the table if this is the first time we have encountered it.
      if (!reset) {
        $thead = $thead.clone();
        $table.after(
          "<div class='sticky-thead' tabindex='-1' aria-hidden='true'><div class='sticky-thead-wrapper'><table></table></div></div>"
        );

        $stickyHeader = $element.find(".sticky-thead");
        $stickyHeader.find("table").append($thead);
      } else {
        $stickyHeader = $element.find(".sticky-thead");
      }

      // Setting it in a fixed position, but initially invisible.
      let tableLeft = $element.offset().left + 2;
      $stickyHeader.css({
        "pointer-events": "none",
        position: "fixed",
        left: tableLeft,
        top: getAdditionalOffset() + "px",
        opacity: 0,
        height: theadHeight,
      });
      $stickyHeader[0].scrollLeft = 0;
    }

    // Add class, remove margins, reset width and wrap table.
    $table.addClass("sticky-enabled").css({
      margin: 0,
      width: "100%",
    });

    // If we are not resetting, use the length as the index.
    if (index === false) {
      index = responsiveTables.length;
    }

    let rt = {
      index,
      $root: $element,
      $table,
      $stickyHeader,
      theadHeight,
      horizontalScrollable,
      headerStuck: false
    };
    // Set the widths of the header.
    setWidths(rt);

    // If we are reseting, replace the element. Otherwise, add it.
    if (reset) {
      responsiveTables[index] = rt;
    } else {
      responsiveTables.push(rt);
      rt.$root[0].addEventListener("scroll", handleTableScroll, true);
    }
    // Decide what should be showing or stuck.
    checkVisibility(rt);
  }

  // Certain other components that stick to the top of the page need to be accounted for.
  // This calculates the additional offset that a table sticky header should drop down.
  function getAdditionalOffset() {
    let additionalOffset = 0;
    if (
      $(".js-scroll-anchors")[0] &&
      document.documentElement.clientWidth <= 765
    ) {
      additionalOffset += $(".js-scroll-anchors").height();
    }
    if (document.documentElement.classList.contains("stickyTOC")) {
      if (document.documentElement.clientWidth <= 841) {
        additionalOffset += 75;
      } else {
        additionalOffset += 70;
      }
    }
    return additionalOffset > 0 ? additionalOffset : 0;
  }

  // Based on the scroll position, decide whether or not to show or hide or scroll
  // or stick the header and scrollbar.
  function checkVisibility(rt) {
    const { index, $table, $stickyHeader, headerStuck } = rt;

      // Handle header visibility.
    if ($stickyHeader && $table.find("thead").length > 0) {
      const stuckTop = $stickyHeader.offset().top;
      const stuckBottom = stuckTop + $stickyHeader.height();

      const $tableHeader = $table.find('thead');
      const elementTop = $tableHeader.offset().top;
      const tableBottom = elementTop + $table.height();

      if (
        !headerStuck &&
        elementTop < stuckTop &&
        tableBottom > stuckBottom
      ) {
        responsiveTables[index].headerStuck = true;
        $stickyHeader.css("opacity", 1);
        $stickyHeader.css("-webkit-box-shadow", "");
        $stickyHeader.css("box-shadow", "");
        $stickyHeader.css("pointer-events", "all");
      } else if (
        headerStuck &&
        (elementTop > stuckTop || tableBottom < stuckBottom)
      ) {
        responsiveTables[index].headerStuck = false;
        $stickyHeader.css("opacity", 0);
        $stickyHeader.css("-webkit-box-shadow", "none");
        $stickyHeader.css("box-shadow", "none");
        $stickyHeader.css("pointer-events", "none");
      }
    }
  }

  // When scrolling the window, handle header / scrollbar visibility and position.
  function handleStickyHeader() {
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

  // Sync horizontal scrolling in sticky table header and table
  // Allow a parameter to prevent triggering scrolling in an infinite loop.
  let skip = 0;
  // Calculate and set the scroll position of the other components when one component is scrolled.
  function handleTableScroll(e) {
    if (skip === 0) {
      const t = e.target;
      // No matter the element, the percentage as a decimal should be the amount of pixels scrolled
      // divided by the max amount that can be scrolled which is the scroll width minus the width.
      [
        "ma__table--responsive__wrapper",
        "sticky-thead-wrapper",
      ].map((scrollable) => {
        if (t.className !== scrollable) {
          const elements = this.getElementsByClassName(scrollable);
          if (elements.length > 0) {
            let el = elements[0];
            skip++;
            el.scrollLeft = t.scrollLeft;
          }
        }
      });
    } else {
      skip--;
    }
  }

  // Initialize the tables.
  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  // Set window scroll handler.
  $window.on("scroll", handleStickyHeader);
  // Set window resize.
  $window.on("resize", handleWindowResize);
})(window, document, jQuery);
