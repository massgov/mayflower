export default (function (window, document, $) {

  const $feedbackForm = $('.ma__mass-feedback-form__form');
  const $fields = $('.ma__mass-feedback-form__fields');
  const $contactForm = $feedbackForm.find('.ma__mass-feedback-form__contact-form');
  const $loadRadios = $feedbackForm.find('.feedback-load input[type="radio"]');
  const $contactRadios = $feedbackForm.find('.user-response__contact input[type="radio"]');
  const $Response = $('.ma__mass-feedback-form__form--user-response');
  const $noResponseLink = $Response.find('.form--no-response');
  const $alertToggle = $('.ma__header-alert__hide');

  // Open no reponse answer accordion.
  $noResponseLink.on('click', function () {
    $Response.toggleClass('is-open');
  });

  // Open feedback form on radio button selection.
  $loadRadios.on('change', function () {

    let foundIndicator = $("input[name='foundIndicator']:checked").val();

    if (foundIndicator === 'yes') {
      $fields.addClass('is-open positive');
      $fields.removeClass('negative');
    }
    else if (foundIndicator === 'no') {
      $fields.addClass('is-open negative');
      $fields.removeClass('positive');
    }
  });

  // Open contact form on radio selection.
  $contactRadios.on('change', function () {

    let contactGroup = $("input[name='contactGroups']:checked").val();

    if (contactGroup === 'yes') {
      $contactForm.addClass('is-open');
    }
    else if (contactGroup === 'no') {
      $contactForm.removeClass('is-open');
    }
  });

  // Close alert.
  $alertToggle.on('click', function (e) {
    e.preventDefault();
    $('.ma__header-alerts').addClass('is-closed');
  });

})(window, document, jQuery);
