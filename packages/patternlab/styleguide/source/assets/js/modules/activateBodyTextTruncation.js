import truncateBodyText from "../helpers/truncateBodyText";

/**
 * @file
 * Initiate truncateBodyText wherever it is needed.
 */

export default (function (window,document,$) {
  $('.ma__services .page-content--intro .ma__rich-text').each(function(i, el) {
    truncateBodyText($(el));
  });
})(window,document,jQuery);
  