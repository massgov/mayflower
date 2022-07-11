export default (function (window, document, $, undefined) {
  "use strict";
  /**
   * Handles relationship indicators dropdown grouping for desktop and mobile.
   *
   * @param groupAfter optional, if it's not specified it will look at data-group-after on the section group.
   *
   */

  function groupIndicators(groupAfter) {

    // There could be more than one relationship indicators component in the page.
    $(".ma__relationship-indicators--terms").each(function (index) {
      let $tagWrapper = $(this);
      let $button = $tagWrapper.find(".js-relationship-indicator-button");
      let $items = $tagWrapper.find("li.js-term")
      let totalCount = $items.length;
      let hiddenCount = totalCount - (groupAfter + 1);

      // Initialize by making all items visible
      $button.hide();
      $items.show();

      // render toggle button
      if (hiddenCount > 0) {
        let hiddenIds = "";
        let groupId = "ma-ri_" + index;
        let $buttonCounter = $button.find(".tag-count");
        let $buttonState = $button.find(".tag-state");
        var $hiddenItems = $tagWrapper.find(".js-term:gt(" + groupAfter + ")");
        let expanded = false;

        function toggleButton(buttonState) {
          if (buttonState) {
            $items.show();
            $buttonState.text("less");
            $button.attr("aria-pressed", true);
            $button.attr("aria-expanded", true);
            $button.addClass("is-open")
          } else {
            $hiddenItems.hide();
            $buttonState.text("more");
            $button.attr("aria-pressed", false);
            $button.attr("aria-expanded", false);
            $button.removeClass("is-open")
          }
        }

        // Use hidden tags to populate button label.
        $button.show();
        $buttonCounter.text(hiddenCount);
        // hide items
        $hiddenItems.hide();

        // Screen reader 
        $hiddenItems.each(function (itemIndex) {
          let $hiddenTagItem = $(this);
          let itemId = groupId + itemIndex;
          $hiddenTagItem
          $hiddenTagItem.attr("id", itemId);
          hiddenIds += itemId + " ";
        });

        $button.attr("aria-controls", hiddenIds);

        $button.on("click", function () {
          expanded = !expanded;

          toggleButton(expanded);

          // Aria handling.
          // ariaToggle($hiddenItems);
        });

        toggleButton(expanded);
      
      // don't render toggle button
      } else {
        $button.hide();
        $items.show();
      }
    });
  }

  // function ariaToggle($hiddenItems) {
  //   if ($hiddenItems.attr("hidden")) {
  //     $hiddenItems.removeAttr("hidden");
  //   } else {
  //     $hiddenItems.attr("hidden", "");
  //   }
  // }

  // To debounce function calls.
  // @see https://www.freecodecamp.org/news/javascript-debounce-example/
  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  var breakpoint = 910;
  var initialDiff = ($(window).width() - breakpoint) ? 1 : -1;

  // Determines the folding number of items, either by the parameter or by the data attribute.
  let $group = $(".ma__relationship-indicators--section-group");
  var $groupAfter = parseInt($group.data("group-after")) - 1 || 3;

  // What we do when viewport is resized.
  function resizeResponse() {
    let w = $(window).width();
    let currentDiff = w - breakpoint;

    // only trigger groupIndicators when window size crosses the breakpoint.
    if(currentDiff*initialDiff < 0) {
      initialDiff = currentDiff;
      groupIndicators(w < breakpoint ? 0 : $groupAfter);
    }
  }


  // Initialize state for the relationship indicators.
  groupIndicators(initialDiff < 0 ? 0 : $groupAfter);

  // Resize events must have a debounced function.
  $(window).resize(debounce(resizeResponse, 50));

})(window, document, jQuery);
