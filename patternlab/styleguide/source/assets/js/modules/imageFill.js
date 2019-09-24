export default (function (window, document, $, undefined) {

  // Set height of sidebar plus 100 pixels so full width images
  // don't sit too tight under under the sidebar content.
  const sidebarHeight = $('.sidebar').length > 0 ? $('.sidebar').outerHeight(true) + 100 : 0;

  let debounceTimer;

  function mediaWidth() {
    // Define wrapper width for use.
    var wrapperWidth = $('.main-content').width();

    $('.ma__figure--full, .ma__iframe--full').each(function () {
      var $thisMedia = $(this);

      // Get position of image relative to container.
      var thisPosition = $thisMedia.position().top;

      // If this image is below the sidebar.
      if (thisPosition > sidebarHeight) {

        // Make the image the full width of the wrapper.
        $thisMedia.css('width', wrapperWidth);
      }
    });
  }

  $(window).on('load', function () {
    mediaWidth();
  });

  $(window).resize(function () {
    if (typeof debounceTimer === "number") {
      window.clearTimeout(debounceTimer);
    }
    debounceTimer = window.setTimeout(function () {
      mediaWidth();
    }, 250);
  });

})(window, document, jQuery);