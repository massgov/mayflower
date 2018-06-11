import slugify from "../helpers/slugify.js";
export default function (window,document,$,undefined) {

  $('.js-ma-rich-text').each(function(index){
    let $el = $(this),
      richTextIndex = index;

    $el.find('table').wrap( "<div class='ma__rich-text__table-wrapper'></div>" );

    // Provide css hooks to indent each child heading and its nested contents if js hook is present.
    if ($el.hasClass('js-ma-outline-indent')) {
      $el.find(':header').each(function(index,heading){
        if ($(heading).prop("tagName") !== 'H2') {
          $(heading).addClass("ma__rich-text__indent");
        }
        $(heading).nextUntil(':header')
          .addClass("ma__rich-text__indent")
          .attr('data-ma-heading-parent', $(heading).prop('tagName'));
      });
    }

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
}
(window,document,jQuery);
