import throttle from "../helpers/throttle.js";

// Responsive table HTML structure
// <div class="ma__table--responsive">
//   <div class="ma__table--responsive__wrapper">
//    <table class="ma__table"> ... </table>
//   </div>
// </div>

// Common `rt` object that gets passed around:
// {
//  $root: <root component wrapper jQuery element>,
//  $table: <table jQuery element>,
//  $stickyHeader: <sticky header jQuery element>
// }

export default function (window, document, $, undefined) {

    let responsiveTables = [];
    let $window = $(window);


    // Defines the widths of the sticky header to match table
    function setWidths(rt) {
        rt.$table
            .find("thead th")
            .each(function (i) {
                rt.$stickyHeader
                    .find("th")
                    .eq(i)
                    .width($(this).width());
            });

        // Set width of sticky table head
        rt.$stickyHeader.width(rt.$table.width());

    }

    function calcAllowance($table, $stickyHeader) {
        var a = 0;
        // Calculate allowance
        $table.find("tbody tr:lt(3)").each(function () {
            a += $(this).height();
        });

        // Set fail safe limit (last three row might be too tall)
        // Set arbitrary limit at 0.25 of viewport height, or you can use an arbitrary pixel value
        if (a > $window.height() * 0.25) {
            a = $window.height() * 0.25;
        }

        // Add the height of sticky header
        a += $stickyHeader.height();
        return a;
    }

    // Sets the dynamic positions of the header and footers.
    // Takes into account some other fixed-position elements on
    // the site and adjusts accordingly if they are present.
    function positionStickyHeaderFooter(rt) {
        // Return value of calculated allowance
        let allowance = calcAllowance(rt.$table, rt.$stickyHeader);
        let visibleParams = getVisibilityVars(rt.$table[0]);
        // Position sticky header based on viewport scrollTop
        if (
            $window.scrollTop() > rt.$table.offset().top &&
            $window.scrollTop() < rt.$table.offset().top + rt.$table.outerHeight() - allowance
        ) {

            // Add additional offset if global fixed components are present
            let additionalOffset = 0;
            if (document.documentElement.clientWidth <= 825) {
                additionalOffset += $('.js-sticky-header').height();
            }
            if ($(".js-scroll-anchors")[0] &&
                $(".js-scroll-anchors").css("position") === "fixed" &&
                document.documentElement.clientWidth <= 765) {
                additionalOffset += $(".js-scroll-anchors").height();
            }

            // When top of viewport is in the table itself
            rt.$stickyHeader.css({
                opacity: 1,
                top: $window.scrollTop() - rt.$table.offset().top + additionalOffset
            });

        } else {
            // When top of viewport is above or below table
            rt.$stickyHeader.css({
                opacity: 0,
                top: 0
            });
        }

        let tableBottom = rt.$table.offset().top + rt.$table.height();
        let scrolledBottom = $window.scrollTop() + $window.height();
        let canScrollHorizontally = rt.$table.width() > rt.$table.parent().width();
        rt.$root.toggleClass('has-horizontal-scroll', canScrollHorizontally);

        if (canScrollHorizontally && visibleParams.bottomOutOfView && scrolledBottom - rt.$table.offset().top > 100) {
            rt.$root.find(".ma__table__horizontal-nav").css({
                bottom: (tableBottom - scrolledBottom)
            });
        } else {
            rt.$root.find(".ma__table__horizontal-nav").css({ bottom: 0 });
        }
    }


    // Calculates visibility utility variables
    function getVisibilityVars(element) {
        let pageTop = $(window).scrollTop();
        let pageBottom = pageTop + $(window).height();
        let elementTop = $(element).offset().top;
        let elementBottom = elementTop + $(element).height();

        let topOutOfView = elementTop < pageTop;
        let bottomOutOfView = elementBottom > pageBottom;
        let entirelyOutOfView = pageTop > elementBottom || pageBottom < elementTop;
        return {
            topOutOfView: topOutOfView,
            bottomOutOfView: bottomOutOfView,
            entirelyOutOfView: entirelyOutOfView
        };
    }


    // Recalculates the width and offset of horizontal scrollbar in the footer
    function recalcScrollbar(rt) {
        let containerWidth = rt.$table.parent().width();
        let tableWidth = rt.$table.width();
        let visiblePercentage = (containerWidth / tableWidth) * 100;
        let leftVisiblePercentage = Math.abs((rt.$table.offset().left - rt.$table.parent().offset().left) / tableWidth) * 100;

        rt.$root.find(".ma__scroll-indicator__button").width(`calc(${visiblePercentage}% + 2px)`);
        rt.$root.find(".ma__scroll-indicator__button").css({
            left: `calc(${leftVisiblePercentage}% - 2px)`
        });
    }


    // apply scroll-based classes based on table visibility
    function applyScrollClasses(rt) {
        let visibleParams = getVisibilityVars(rt.$root[0]);
        rt.$root.toggleClass("has-top-visible", visibleParams.topOutOfView);
        rt.$root.toggleClass("has-bottom-visible", visibleParams.bottomOutOfView);
        rt.$root.toggleClass("is-out-of-view", visibleParams.entirelyOutOfView);
    }


    // Clears out overlapping fixed global elements
    function handleOverlappingElements(rt) {
        let visibleParams = getVisibilityVars(rt.$root[0]);

        if (!visibleParams.entirelyOutOfView) {
            $(".ma__floating-action").hide();
        } else {
            $(".ma__floating-action").show();
        }
    }

    // general window resize handler
    function handleWindowResize() {
        responsiveTables.forEach((rt) => {
            setWidths(rt);
            positionStickyHeaderFooter(rt);
            recalcScrollbar(rt);
        });
    }

    // general window scroll handler
    function handleScroll() {
        responsiveTables.forEach((rt) => {
            positionStickyHeaderFooter(rt);
            applyScrollClasses(rt);
            recalcScrollbar(rt);
            handleOverlappingElements(rt);
        });
    }


    // Kick off setup of the sticky header functionality.
    function initializeTable(element) {
        let $table = $(element).find('table');
        let $stickyHeader = null;

        if ($table.find("thead").length > 0 && $table.find("th").length > 0) {
            let $thead = $table.find("thead").clone();
            $table.after('<table class="ma__table sticky-thead" />');

            // Add class, remove margins, reset width and wrap table
            $table
                .addClass("sticky-enabled")
                .css({
                    margin: 0,
                    width: "100%"
                });

            $stickyHeader = $(element).find(".sticky-thead");
            $stickyHeader.append($thead);

        }

        responsiveTables.push({
            $root: $(element),
            $table: $table,
            $stickyHeader: $stickyHeader
        });

    }


    $('.js-ma-responsive-table').each((i, el) => initializeTable(el));

    $window.on("resize", handleWindowResize);
    $window.on("scroll", handleScroll);
    // fire on horizontal scroll of container as well
    $(".ma__table--responsive__wrapper").on("scroll", throttle(handleScroll, 100));

    // Handle scrollbar arrows
    $(".ma__table__horizontal-nav__left").click(function () {
        let $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
        $scrollContainer.animate({
            scrollLeft: ($scrollContainer.scrollLeft() - 200) < 0 ? 0 : ($scrollContainer.scrollLeft() - 200)
        }, 250);
    });

    $(".ma__table__horizontal-nav__right").click(function () {
        let $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");
        $scrollContainer.animate({
            scrollLeft: $scrollContainer.scrollLeft() + 200
        }, 250);
    });


    // handles the dragging of the scrollbar to adjust the viewable area
    function handleScrollerInteraction(e) {
        let $scrollContainer = $(this).parents(".js-ma-responsive-table").find(".ma__table--responsive__wrapper");

        let containerWidth = $scrollContainer.width();
        let tableWidth = $scrollContainer.find('.ma__table').width();
        let visiblePercentage = (containerWidth / tableWidth);

        let initialPosition = {
            x: e.pageX,
            y: e.pageY
        };

        function handleMouseUp() {
            // remove listeners
            $('body').off('mousemove', handleMouseMove).off('mouseup', handleMouseUp);
        }
        function handleMouseMove(e) {
            let newPosition = { x: e.pageX, y: e.pageY };
            let diff = newPosition.x - initialPosition.x;

            // The drag distance and the scrolling distance isn't a 1-to-1 due to the size of the
            // scrollbar being smaller than the full table width, so the diff calculation below
            // limits the difference in motion to make things feel more normal.
            // This could likely benefit from some more thought!
            $scrollContainer.scrollLeft($scrollContainer.scrollLeft() + diff - (diff * visiblePercentage));
        }

        // Attach to body so you don't get a disconnected handler if you drag off the bar
        $('body').on("mouseup", handleMouseUp);
        $('body').on('mousemove', handleMouseMove);

    }


    // handles clicking somewhere on the 'background' or 'track' of the scrollbar which jumps the scroll forward/backwards
    function handleScrollerClick(e) {
        let $scrollContainer = $(this)
            .parents(".js-ma-responsive-table")
            .find(".ma__table--responsive__wrapper");
        let posX = $(this).position().left;
        let midpoint = $(e.target).offset().left + $(e.target).width() / 2;
        let clickpoint = e.pageX - posX;

        if (clickpoint < midpoint) {
            // scroll left
            $scrollContainer.animate({
                scrollLeft: $scrollContainer.scrollLeft() - Math.abs(midpoint - clickpoint)
            }, 250);
        } else {
            // scroll right
            $scrollContainer.animate({
                scrollLeft: $scrollContainer.scrollLeft() + Math.abs(midpoint - clickpoint)
            }, 250);
        }
    }


    $(".ma__scroll-indicator__button").on("mousedown", handleScrollerInteraction);
    // deaden clicking on the scroll button, handle clicking in the trough
    $(".ma__scroll-indicator__button").on("click", e => e.stopPropagation());
    $(".ma__scroll-indicator").on('click', handleScrollerClick);

    handleWindowResize();


} (window, document, jQuery);


