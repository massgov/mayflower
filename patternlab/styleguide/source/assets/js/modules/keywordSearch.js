export default function (window,document,$,undefined) {

  $('.js-keyword-search').each(function(){
    let $el = $(this),
        $form = $el.find('form');

    $form.on('submit',function(e){
      e.preventDefault();
      $el.addClass('is-dirty')
    });

    $form.on('reset',function(){
      $el.removeClass('is-dirty')
    });
  });

}(window,document,jQuery);
