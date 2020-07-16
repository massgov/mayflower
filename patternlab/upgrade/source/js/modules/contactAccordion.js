import jQuery from 'jquery';
export default (function (window, document, $, undefined) {

  $('.ma__contact-row__columns').each(function () {

    let $columns = $(this);
    let $sets = $columns.find('.ma__contact-set');
    let $button = $columns.siblings('.ma__contact-row__expand');

    if ($sets.length > 2) {
      $columns.addClass('has-many');
      $button.addClass('toggle-sets');
    }

    $button.on('click', function () {
      $columns.toggleClass('is-open');
      $button.toggleClass('is-open');
    });

  });

})(window, document, jQuery);
