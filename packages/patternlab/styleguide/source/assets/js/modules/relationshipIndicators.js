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
      const $lastItem = $tagWrapper.find("li.ma__relationship-indicators--term--last");
      let totalCount = $items.length;
      let hiddenCount = totalCount - (groupAfter + 1);

      // Initialize by making all items visible
      // $button.hide();
      // $items.show();
      // reset hidden ids at breakpoint
      $items.removeAttr('id');
      $items.removeClass('item-fold');

      if (hiddenCount > 0) {
        // Render toggle button
        let $buttonCounter = $button.find(".tag-count");
        let $buttonState = $button.find(".tag-state");
        let $hiddenItems = $tagWrapper.find(".js-term:gt(" + groupAfter + ")");
        const $foldedItems = $tagWrapper.find(".item-fold");
        let expanded = false;


        function toggleButton(buttonState) {
          if (buttonState) {
            $tagWrapper.removeClass('folded');
            $buttonState.text("less");
            $button.attr("aria-pressed", true);
            $button.attr("aria-expanded", true);
            $button.addClass("is-open")
          } else {
            console.log($hiddenItems)
            console.log($foldedItems)
            // $foldedItems.hide();
            $tagWrapper.addClass('folded');
            $buttonState.text("more");
            $button.attr("aria-pressed", false);
            $button.attr("aria-expanded", false);
            $button.removeClass("is-open")
          }
        }

        /** Button toggle logic
         * when groupIndicators is triggered on responsive (screensize crosses the threshhold) and meets the folding conditions
         * Show toggle button, update hidden count in button label 
         * Reset toggle button state and items display
        */
        $button.show();
        $buttonCounter.text(hiddenCount);
        toggleButton(expanded);

        // Set aria-controls
        let hiddenIds = "";
        $hiddenItems.each(function (itemIndex) {
          let $hiddenTagItem = $(this);
          let groupId = "ma-ri_" + index;
          let itemId = groupId + itemIndex;
          $hiddenTagItem.attr("id", itemId);
          $hiddenTagItem.addClass("item-fold");
          hiddenIds += itemId + " ";
        });

        $button.attr("aria-controls", hiddenIds);

        // toggle button onclick callback
        $button.on("click", function () {
          expanded = !expanded;
          toggleButton(expanded);
        });

        // add back | separator for the last item
        $lastItem.removeClass('no-fold');
      } else {
        // Don't render toggle button
        $button.hide();
        $items.show();
        // remove | separator for the last item
        $lastItem.addClass('no-fold');
       }
    });
  }

  /** Window resize logic
   * Above breakpoint (desktop): fold after the 3 items by default, if a groupAfter number, fold items after that number.
   * Below breakpoint (mobile): fold after the first item
   * Update the groupIndicators logic whenever the screensize crosses the breakpoint
   */

  // Determines the folding number of items, either by the parameter or by the data attribute.
  let $group = $(".ma__relationship-indicators--section-group");
  var $groupAfter = parseInt($group.data("group-after")) - 1;
  var breakpoint = 910;
  var initialDiff = ($(window).width() - breakpoint) > 0 ? 1 : -1;

  // What we do when viewport is resized.
  function resizeResponse() {
    let w = $(window).width();
    let currentDiff = w - breakpoint;

    // only trigger groupIndicators when window size crosses the breakpoint.
    if(currentDiff*initialDiff < 0) {
      groupIndicators(w < breakpoint ? 0 : $groupAfter);
      initialDiff = currentDiff;
    }
  }


  // Initialize state for the relationship indicators.
  groupIndicators(initialDiff < 0 ? 0 : $groupAfter);

  // Update the relationship indicators state when window resizes.
  $(window).resize(resizeResponse);

})(window, document, jQuery);
