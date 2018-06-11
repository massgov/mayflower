export default function (window,document,$,undefined) {
  $.extend($.expr[':'], {
    // jQuery find all focusable elements
    // see: https://coderwall.com/p/jqsanw/jquery-find-every-focusable-elements
    focusable: function(el, index, selector){
      return $(el).is('a, button, :input, [tabindex]');
    }
  });
}(window,document,jQuery);
