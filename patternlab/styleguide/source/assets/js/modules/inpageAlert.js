export default (function (window, document, $, undefined) {

  const $pageAlert = $('.js-in-page-alert');
  const $alertClose = $pageAlert.find('.js-in-page-alert-link');

  $alertClose.on('click', function () {
    $pageAlert.addClass('is-closed');
  });

})(window, document, jQuery);

