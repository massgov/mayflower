export default function (window,document,$,undefined) {
  $('.js-clickable').each(function(){
    // if the this is clicked
    $(this).click(function(event){
      event.preventDefault();

      var $el = $(this).find('.js-clickable-link').first();
      // find the destination
      var dest = $el.attr("href");
      // if the target attribute exists
      if("_blank" === $el.attr("target")) {
        // launch new tab/window
        window.open(dest);
      } else {
        // otherwise redirect to a new page
        window.location = dest;
      }
    });
  });
}(window,document,jQuery);