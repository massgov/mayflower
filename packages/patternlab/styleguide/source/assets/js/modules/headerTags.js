export default (function (window, document, $, undefined) {
  "use strict";

  $(".js-header-tag-link").each(function (index) {

    let $el = $(this),
      $showHideButton = $(".js-header-tag-button", $el),
      $dynamicItems = $("a:nth-child(n+4)", $el),
      $focusItem = $("a:nth-child(4)", $el),
      id = $el.attr("id") || "headerTags" + (index + 1),
      open = $el.hasClass("is-open");

    // Set the id attribute (respects default if set).
    $el.attr("id", id);

    if ($dynamicItems.length) {
      // Show our see button if we have more than three items.
      $showHideButton.attr("aria-expanded", open).attr("aria-controls", id);
      $showHideButton.show();
    }

    $showHideButton.on("click", function (e) {
      e.preventDefault();
      $el.toggleClass("is-open");

      if ($el.hasClass("is-open")) {
        $showHideButton.attr("aria-expanded", "true");
        $dynamicItems.show();
        $focusItem.focus();
      } else {
        $showHideButton.attr("aria-expanded", "false");
        $dynamicItems.hide();
      }
    });
  });
})(window, document, jQuery);
