export default (function (window,document,$,undefined) {
 
  let watcher;
  let $fixedFeedbackButton = $('.ma__fixed-feedback-button');

  $(document).on('touchmove', function() {
    
    if ($(window).width() < 910) {
      $fixedFeedbackButton.addClass('scrolling');
    
      clearTimeout(watcher);
      watcher = setTimeout(function() {
        $fixedFeedbackButton.removeClass('scrolling');
      }, 500);
    }
  });

})(window,document,jQuery);