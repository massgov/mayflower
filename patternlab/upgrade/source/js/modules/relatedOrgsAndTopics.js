import jQuery from 'jquery';

export default (function (window, document, $, undefined) {

  $('.ma__related-orgs-and-topics__column .ma__link-list').each(function (index) {
    init.apply(this, [index]);
  });

  function init(index) {
    const $thisList = $(this);
    const $thisWrapper = $thisList.closest('.ma__related-orgs-and-topics__column');
    const $toggleButton = $thisList.next('.js-ma__related-orgs-and-topics--toggle');

    $toggleButton.on('click', function () {
      $toggleButton.toggleClass('open');
      $thisWrapper.toggleClass('open');
    });

    if ($thisList.find('.ma__link-list__item').length < 10) {
      $toggleButton.addClass('short-list');
    }
  }

})(window, document, jQuery);
