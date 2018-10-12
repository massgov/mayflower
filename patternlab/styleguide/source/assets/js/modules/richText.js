import slugify from "../helpers/slugify.js";
export default (function (window, document, $) {

  $('.js-ma-rich-text').each(function(index){
    let $el = $(this),
      richTextIndex = index;

    const $table = $el.find("table").not("table table");
    $table.each(function() {
      const $this = $(this);
      let $wrapped;
      // If this table does not have the `ma__table--responsive` class.
      if (!$this.closest('.ma__table--responsive').length) {
        $this
          .wrap('<div class="ma__table--responsive js-ma-responsive-table"><div class="ma__table--responsive__wrapper"></div></div>');
      }
      // At this point there is a `.ma__table--responsive` class,
      // but does this table already posses a responsive table structure.
      else if(!$this.closest('.ma__table--responsive').length) {
        $this
          .wrap('<div class="ma__table--responsive js-ma-responsive-table"><div class="ma__table--responsive__wrapper"></div></div>');
      }

      $wrapped = $this.closest(".ma__table--responsive");
      if (!$wrapped.find("nav.ma__table__horizontal-nav").length) {
        const $tableNav = $('<nav class="ma__table__horizontal-nav"><button class="ma__table__horizontal-nav__left" aria-controls="{{tableID}}"><span class="visually-hidden">Scroll left</span></button><div class="clip-scrollbar"><div class="ma__scroll-indicator"><div class="ma__scroll-indicator--bar" aria-controls="{{tableID}}" role="scrollbar" aria-orientation="horizontal"><div class="ma__scroll-indicator__button"></div></div></div></div><button class="ma__table__horizontal-nav__right" aria-controls="{{tableID}}"><span class="visually-hidden">Scroll right</span></button></nav>');
        $wrapped.prepend($tableNav);
      }
    });

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
})(window, document, jQuery);
