import truncateBodyText from "../helpers/truncateBodyText";

/**
 * @file
 * Initiate truncateBodyText wherever it is needed.
 */

var resizeTruncate = function($textAreas) {
  $textAreas.not('.ma-truncated-body-text').each(function(i, el) {
    truncateBodyText($(el));
  });
}

export default (function (window,document,$) {
  var $textAreas = $('.ma__services-flexible-link-groups .page-content--intro .ma__rich-text');

  if(!$textAreas.length) {
    return;
  }

  var truncateTimeout = false;
  var boundResizeTruncate = resizeTruncate.bind(undefined, $textAreas)

  $textAreas.each(function(i, el) {
    truncateBodyText($(el));
  });


  $(window).on('resize', function() {
    window.clearTimeout(truncateTimeout);
    truncateTimeout = window.setTimeout(boundResizeTruncate, 500);
  });
})(window,document,jQuery);
  