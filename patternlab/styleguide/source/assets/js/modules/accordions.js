import checkActive from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {

  $('.js-accordion').each(function(index){
    init.apply(this, [index]);
  });

  $(document).on('ma:AjaxPattern:Render', function(e,data){
    let $context = data.el;
    if ($context.find('.js-accordion').length) {
      $context.find('.js-accordion').each(function(index){
        // Try to ensure we don't collide with the index values from DOM load.
        let offset = 100;
        let offsetIndex = offset + index;
        init.apply(this, [offsetIndex]);
      })
    }
  });

  function init(index) {
    let $el = $(this),
        $link = $el.find('.js-accordion-link'),
        $content = $el.find('.js-accordion-content'),
        $status = $el.find('.js-accordion-status'),
        id = $content.attr('id') || 'accordion' + (index + 1),
        active = checkActive($el),
        open = $el.hasClass('is-open');

    $content.attr('id', id);
    $link.attr('aria-expanded',open).attr('aria-controls', id);

    if(open) {
      // setup the inline display block
      $content.stop(true,true).slideDown();
    }

    $link.on('click',function(e){
      if(active) {
        e.preventDefault();
        open = $el.hasClass('is-open');
        if(open){
          $content.stop(true,true).slideUp();
          $status.attr('aria-label', 'click to show info');
        } else {
          $content.stop(true,true).slideDown();
          $status.attr('aria-label', 'click to hide info');
        }
        $link.attr('aria-expanded',!open);
        $el.toggleClass('is-open');
      }
    });

    $(window).resize(function () {
      let temp = checkActive($el);

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
        $link.attr('aria-expanded','false');
      }

      active = temp;
    }).resize();
  }

}(window,document,jQuery);
