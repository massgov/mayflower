export default (function (window, document, $) {

  const $feedbackForm = $('.ma__mass-feedback-form__form');
  const $fields = $('.ma__mass-feedback-form__fields');
  const $radios = $feedbackForm.find('input[type="radio"]');
  const $noResponse = $('.ma__mass-feedback-form__form--no-response');
  const $noResponseLink = $noResponse.find('.form--no-response');
  const $alertToggle = $('.ma__header-alert__hide');

  $noResponseLink.on('click', function () {
    $noResponse.toggleClass('is-open');
  });

  $radios.on('change', function () {

    let selected = $("input[name='foundIndicator']:checked").val();

    if (selected === 'yes') {
      $fields.addClass('open positive');
      $fields.removeClass('negative');
    }
    else if (selected === 'no') {
      $fields.addClass('open negative');
      $fields.removeClass('positive');
    }
  });

  $alertToggle.on('click', function (e) {
    e.preventDefault();
    $('.ma__header-alerts').hide();
  });

})(window, document, jQuery);
