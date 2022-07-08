export default (function (window, document, $, undefined) {
  "use strict";
  /**
   * Handles relationship indicators dropdown grouping for desktop and mobile.
   *
   * @param groupAfter optional, if it's not specified it will look at data-group-after on the section group.
   *
   */
  function groupIndicators(groupAfter = null) {
    // There could be more than one relation ship indicators component in the page.
    $(".ma__relationship-indicators--terms").each(function (index) {
      let $tagWrapper = $(this);
      let $button = $tagWrapper.find(".js-relationship-indicator-button");
      let $buttonCounter = $button.find(".tag-count");
      let $hiddenTags = $tagWrapper.find(".js-term[hidden]");
      let hiddenIds = "";
      let groupId = "ma-rig" + index;

      // Start by making visible all the relationship indicators.
      $hiddenTags.show();
      $hiddenTags.removeAttr("hidden");

      // Determines the folding number of items, either as a parameter or and attribute.
      let $group = $(".ma__relationship-indicators--section-group");
      groupAfter = (groupAfter != null) ? groupAfter : parseInt($group.data("group-after")) - 1;
      // Hide tags.
      if ($group.length && !$hiddenTags.length) {
        $hiddenTags = $tagWrapper.find(".js-term:gt(" + groupAfter + ")");
        $hiddenTags.addClass("ma__relationship-indicators--term--fold");
        $hiddenTags.hide();

        // Generate ids for hidden items.
        $hiddenTags.each(function (itemIndex) {
          let $hiddenTagItem = $(this);
          let itemId = groupId + itemIndex;
          $hiddenTagItem.attr("id", itemId);
          hiddenIds += itemId + " ";
        });

        // Aria handling.
        ariaToggle($hiddenTags);
        $button.attr("aria-controls", hiddenIds);
      }

      // Updates button text.
      let tagCount = $hiddenTags.length;
      let $tagState = $button.find(".tag-state");

      // If hidden tags exist, show button.
      if (tagCount) {
        $button.show();
        $tagWrapper.removeClass('ma__relationship-indicators--terms--without-fold');
      } else {
        $button.hide();
        $tagWrapper.addClass('ma__relationship-indicators--terms--without-fold');
      }

      // Use hidden tags to populate button label.
      $buttonCounter.text(tagCount);

      // Class headerTagClickEvent is a flag to avoid attaching this event
      // multiple times when the window is resized.
      $button.not('.headerTagClickEvent').addClass('headerTagClickEvent').on("click", function () {

        const hiddenItems = $('.ma__relationship-indicators--term', $tagWrapper).not(':visible');
        const hiddenItemsCount = hiddenItems.length;
        const hiddenItemsToggle = hiddenItemsCount > 0;
        const $tagStateText = hiddenItemsToggle ? "less" : "more";
        $tagWrapper.parent().toggleClass("tags-open", hiddenItemsToggle);
        $button.toggleClass("is-open", hiddenItemsToggle);
        $hiddenTags.toggle(hiddenItemsToggle);

        // Aria handling.
        ariaToggle($hiddenTags);
        $button.attr("aria-pressed", function (_, attr) {return !(attr == "true");});
        $button.attr("aria-expanded", function (_, attr) {return !(attr == "true");});

        // Change button text.
        $tagState.text($tagStateText);
      });
    });
  }

  function ariaToggle($hiddenTags) {
    if ($hiddenTags.attr("hidden")) {
      $hiddenTags.removeAttr("hidden");
    } else {
      $hiddenTags.attr("hidden", "");
    }
  }

  // To debounce function calls.
  // @see https://www.freecodecamp.org/news/javascript-debounce-example/
  function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

  // What we do when viewport is resized.
  function resizeResponse() {
    let windowWidth = $(window).width();
    groupIndicators(windowWidth < 910 ? 0 : null);
  }

  // Resize events must have a debounced function.
  $(window).resize(debounce(resizeResponse, 50));

  // Initialize state for the relationship indicators.
  resizeResponse();

})(window, document, jQuery);
