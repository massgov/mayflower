export default function (window,document,$,undefined) {
  let $footer = $('.js-footer'),
      visibleThreshold = 250,
      staticThreshold = 50;

  $(".js-back2top").each(function() {
    let $el = $(this);

    $el.on('click',function(e) {
      e.preventDefault();
      try {
        $("html, body").stop(true,true).animate({scrollTop:0}, '750');
      } 
      catch(e) {
        $('body').scrollTop(0);
      }
      // Bring keyboard focus back to top as well.
      $("#main-content").focus();
      return false;
    });

    $(window).on('scroll', function() {
      // if we've exceeded the threshold of scrolling
      // from the top, show control
      let scrollTop = $(window).scrollTop();

      if (scrollTop > visibleThreshold) {
          $el.removeClass('is-hidden');
      } else {
          $el.addClass('is-hidden');
      }
    });
  });

}(window,document,jQuery);