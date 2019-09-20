import truncateBodyText from "../helpers/truncateBodyText";

/**
 * @file
 * Initiate truncateBodyText wherever it is needed.
 */

var truncate = function($textAreas) {
  $textAreas.each(function(i, el) {
    truncateBodyText($(el));
  });
}

export default (function (window,document,$) {
  var $textAreas = $('.ma__services-flexible-link-groups .page-content--intro .ma__rich-text');

  if(!$textAreas.length) {
    return;
  }

  var truncateTimeout = false;
  var boundTruncate = truncate.bind(undefined, $textAreas)

  boundTruncate();

  $(window).on('resize', function() {
    window.clearTimeout(truncateTimeout);
    truncateTimeout = window.setTimeout(boundTruncate, 500);
  });
})(window,document,jQuery);
  