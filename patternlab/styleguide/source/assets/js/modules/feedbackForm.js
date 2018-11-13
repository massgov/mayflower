export default (function (window, document, $) {

  const $feedbackForm = $('.ma__mass-feedback-form__form');
  const $fields = $('.ma__mass-feedback-form__fields');
  const $loadRadios = $feedbackForm.find('.feedback-load input[type="radio"]');
  const $contactRadios = $feedbackForm.find('.user-response__contact input[type="radio"]');
  const $Response = $('.ma__mass-feedback-form__form--user-response');
  const $noResponseLink = $Response.find('.form--no-response');
  const $alertToggle = $('.ma__header-alert__hide');

  $noResponseLink.on('click', function () {
    $Response.toggleClass('is-open');
  });

  $loadRadios.on('change', function () {

    let foundIndicator = $("input[name='foundIndicator']:checked").val();

    if (foundIndicator === 'yes') {
      $fields.addClass('open positive');
      $fields.removeClass('negative');
    }
    else if (foundIndicator === 'no') {
      $fields.addClass('open negative');
      $fields.removeClass('positive');
    }
  });

  $contactRadios.on('change', function () {

    let contactGroup = $("input[name='contactGroups']:checked").val();

    if (contactGroup === 'yes') {
      $('.ma__mass-feedback-form__contact-form').addClass('open');
    }
    else if (contactGroup === 'no') {
      $('.ma__mass-feedback-form__contact-form').removeClass('open');
    }
  });




  $alertToggle.on('click', function (e) {
    e.preventDefault();
    $('.ma__header-alerts').hide();
  });

})(window, document, jQuery);
