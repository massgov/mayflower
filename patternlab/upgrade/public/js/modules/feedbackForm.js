import jQuery from 'jquery';

export default (function(window, document, $) {
  const $feedbackForm = $(".ma__mass-feedback-form__form");
  const $fields = $(".ma__mass-feedback-form__fields");
  const $textArea = $fields.find("textarea");
  const $contactForm = $feedbackForm.find(
    ".ma__mass-feedback-form__contact-form"
  );
  const $loadRadios = $feedbackForm.find('.feedback-load input[type="radio"]');
  const $contactRadios = $feedbackForm.find(
    '.user-response__contact input[type="radio"]'
  );
  const $Response = $(".ma__mass-feedback-form__form--user-response");
  const $noResponseLink = $Response.find(".form--no-response");
  const $alertToggle = $(".ma__in-page-alert__hide");

  // Open no reponse answer accordion.
  $noResponseLink.on("click", function() {
    $Response.toggleClass("is-open");
  });

  // Auto size the text boxes
  $textArea.each(function() {
    let $el = $(this);

    $el.on("keyup", function() {
      if ($el.prop("scrollHeight") > $el.prop("clientHeight")) {
        $el.css("height", $el.prop("scrollHeight") + "px");
      } else {
        $el.css("height", "100%");
      }
    });
  });

  // Open feedback form on radio button selection.
  $loadRadios.on("change", function() {
    let foundIndicator = $loadRadios.filter(":checked").val();

    if (foundIndicator === "Yes") {
      $fields.addClass("is-open positive");
      $fields.removeClass("negative");
    } else if (foundIndicator === "No") {
      $fields.addClass("is-open negative");
      $fields.removeClass("positive");
    }
  });

  // Open contact form on radio selection.
  $contactRadios.on("change", function() {
    let contactGroup = $contactRadios.filter(":checked").val();
    let $submitButton = $(this)
      .closest("form")
      .find(".submitButton");

    if (contactGroup === "Yes") {
      $contactForm.addClass("is-open");
      $submitButton.val("Send");
    } else if (contactGroup === "No") {
      $contactForm.removeClass("is-open");
      $submitButton.val("Send Feedback");
    }
  });

  // Close alert.
  $alertToggle.on("click", function(e) {
    e.preventDefault();
  });
})(window, document, jQuery);
