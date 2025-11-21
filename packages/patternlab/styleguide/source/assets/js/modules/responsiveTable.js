import isHighZoom from "../helpers/isHighZoom";

export default (function (window, document, $) {
  const $window = $(window);
  let responsiveTables = [];

  function setWidths(rt) {
    rt.$table.find("thead th").each(function (i) {
      rt.$stickyHeader.find("th").eq(i).width($(this).width());
    });

    if (rt.$stickyHeader) {
      rt.$stickyHeader.find("table").width(rt.$table.width());
      rt.$stickyHeader.width(rt.$stickyHeader.parent().width());
    }
  }

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

    if (hasThead && hasTh && !isNestedThead) {
      theadHeight = $thead[0].offsetHeight || $thead.outerHeight();

      if (!reset) {
        $thead = $thead.clone();
        $table.after(
          "<div class='sticky-thead' aria-hidden='true'><div class='sticky-thead-wrapper' tabindex='-1'><table></table></div></div>"
        );

        $stickyHeader = $element.find(".sticky-thead");
        $stickyHeader.find("table").append($thead);
      } else {
        $stickyHeader = $element.find(".sticky-thead");
      }

      let tableLeft = $element.offset().left + 2;
      $stickyHeader.css({
        "pointer-events": "none",
        position: "fixed",
        left: tableLeft,
        top: getAdditionalOffset() + "px",
        opacity: 0,
        height: "auto",
      });
      $stickyHeader[0].scrollLeft = 0;
    }

    $table.addClass("sticky-enabled").css({ margin: 0, width: "100%" });

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

    if (isHighZoom()) {
      if (rt.$stickyHeader) rt.$stickyHeader.hide();
    } else {
      setWidths(rt);
    }

    if (reset) {
      responsiveTables[index] = rt;
    } else {
      responsiveTables.push(rt);
      rt.$root[0].addEventListener("scroll", handleTableScroll, true);
    }

    checkVisibility(rt);
  }

  function getAdditionalOffset() {
    let additionalOffset = 0;
    if ($(".js-scroll-anchors")[0] && document.documentElement.clientWidth <= 765) {
      additionalOffset += $(".js-scroll-anchors").height();
    }
    if (document.documentElement.classList.contains("stickyTOC")) {
      additionalOffset += document.documentElement.clientWidth <= 841 ? 75 : 70;
    }
    return additionalOffset > 0 ? additionalOffset : 0;
  }

  function checkVisibility(rt) {
    const { index, $table, $stickyHeader, headerStuck } = rt;

    if ($stickyHeader && $table.find("thead").length > 0) {
      const stuckTop = $stickyHeader.offset().top;
      const stuckBottom = stuckTop + $stickyHeader.height();
      const $tableHeader = $table.find("thead");
      const elementTop = $tableHeader.offset().top;
      const tableBottom = elementTop + $table.height();

      if (!headerStuck && elementTop < stuckTop && tableBottom > stuckBottom) {
        responsiveTables[index].headerStuck = true;
        $stickyHeader.css({
          opacity: 1,
          "pointer-events": "all",
        });
      } else if (headerStuck && (elementTop > stuckTop || tableBottom < stuckBottom)) {
        responsiveTables[index].headerStuck = false;
        $stickyHeader.css({
          opacity: 0,
          "pointer-events": "none",
        });
      }
    }
  }

  function handleStickyHeader() {
    responsiveTables.forEach((rt) => {
      checkVisibility(rt);
    });
  }

  function handleWindowResize() {
    const highZoom = isHighZoom();

    responsiveTables.forEach((rt) => {
      if (highZoom) {
        if (rt.$stickyHeader) {
          rt.$stickyHeader.hide();
        }
      } else {
        initializeTable(rt.$root[0], true, rt.index);
        if (rt.$stickyHeader) {
          rt.$stickyHeader.show();
        }
      }
    });
  }

  let skip = 0;
  function handleTableScroll(e) {
    if (skip === 0) {
      const t = e.target;
      ["ma__table--responsive__wrapper", "sticky-thead-wrapper"].map((scrollable) => {
        if (t.className !== scrollable) {
          const elements = document.getElementsByClassName(scrollable);
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

  $(".js-ma-responsive-table").each((i, el) => initializeTable(el));

  $window.on("scroll", handleStickyHeader);
  $window.on("resize", handleWindowResize);
})(window, document, jQuery);
