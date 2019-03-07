import slugify from "../helpers/slugify.js";
export default (function (window, document, $) {

  $('.js-ma-rich-text').each(function(index){
    let $el = $(this),
      richTextIndex = index;

    // Insert anchor tags prior to all child headings if js hook is present.
    if ($el.hasClass('js-ma-insert-heading-anchors')) {
      // Get all of the content headings.
      let $headings = $el.find(":header");
      $headings.each(function (index, heading) {
        // For H3+
        if ($(heading).prop("tagName") !== 'H2') {
          // Create an id based on the heading text.
          let id = slugify($(heading).text());
          // Insert an anchor tag before the heading.
          $(heading).before("<a name='" + id + "-" + richTextIndex + "-" + index + "'></a>");
        }
      });
    }
  });
})(window, document, jQuery);
