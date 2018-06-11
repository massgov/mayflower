### JavaScript starter code

~~~
export default function (window,document,$,undefined) {

  $('.js-file-name').each(function(){
    const $el = $(this),
    const $target = $el.find('.js-file-name-target');

    // an escape clause can help with performance and ensure we're safe to continue
    if(reasonToNotContinue === true) {
      return;
    }

    // events bound to this specific pattern instance
    $target.on('click', function(){
      // do something
    });
  });

  // common functionality for each pattern
  function($el) {

  }

}(window,document,jQuery);
~~~
