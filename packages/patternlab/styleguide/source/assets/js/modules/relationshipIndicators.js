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
      console.log(totalCount)
      console.log(groupAfter)

      $button.hide();
      $items.show();

      // render toggle button
      if (hiddenCount > 0) {
        let hiddenIds = "";
        let groupId = "ma-ri_" + index;
        let $buttonCounter = $button.find(".tag-count");
        let $tagState = $button.find(".tag-state");
        let $hiddenItems = $tagWrapper.find(".js-term:gt(" + groupAfter + ")");
        // Use hidden tags to populate button label.
        $button.show();
        $buttonCounter.text(hiddenCount);
        // hide items
        $hiddenItems.hide();

        // Screen reader 
        $hiddenItems.each(function (itemIndex) {
          let $hiddenTagItem = $(this);
          let itemId = groupId + itemIndex;
          $hiddenTagItem.attr("id", itemId);
          hiddenIds += itemId + " ";
        });

        $button.attr("aria-controls", hiddenIds);

        console.log($hiddenItems)

    
        // Class headerTagClickEvent is a flag to avoid attaching this event
        // multiple times when the window is resized.
        // $button.on("click", function () {

        //   const hiddenItems = $('.ma__relationship-indicators--term', $tagWrapper).not(':visible');
        //   const hiddenItemsCount = hiddenItems.length;
        //   const hiddenItemsToggle = hiddenItemsCount > 0;
        //   const $tagStateText = hiddenItemsToggle ? "less" : "more";
        //   $tagWrapper.parent().toggleClass("tags-open", hiddenItemsToggle);
        //   $button.toggleClass("is-open", hiddenItemsToggle);
        //   $hiddenItems.toggle(hiddenItemsToggle);

        //   // Aria handling.
        //   ariaToggle($hiddenItems);
        //   $button.attr("aria-pressed", function (_, attr) {return !(attr == "true");});
        //   $button.attr("aria-expanded", function (_, attr) {return !(attr == "true");});

        //   // Change button text.
        //   $tagState.text($tagStateText);
        // });
      // don't render toggle button
      } else {
        $button.hide();
        $items.show();
      // Start by making visible all the relationship indicators.
      // $hiddenItems.show();
      // $hiddenItems.removeAttr("hidden");
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

  // Determines the folding number of items, either by the parameter or by the data attribute.
  let $group = $(".ma__relationship-indicators--section-group");
  var $groupAfter = parseInt($group.data("group-after")) - 1 || 3;

  // What we do when viewport is resized.
  function resizeResponse() {
    let windowWidth = $(window).width();
    groupIndicators(windowWidth < 910 ? 0 : $groupAfter);
  }


  // Initialize state for the relationship indicators.
  resizeResponse();

  // Resize events must have a debounced function.
  $(window).resize(debounce(resizeResponse, 50));

})(window, document, jQuery);
