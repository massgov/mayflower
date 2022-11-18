export default (function(window, document, $) {
  const $feedbackForm = $(".ma__mass-feedback-form__form");
  if($feedbackForm) {
    const $fields = $(".ma__mass-feedback-form__fields");
    const $textArea = $fields.find("textarea");
    const $loadRadios = $feedbackForm.find('.feedback-load input[type="radio"]');
    const $submitButton = $feedbackForm.find(".submitButton");
  
    const radioOnSelect = () => {
      let foundIndicator = $loadRadios.filter(":checked").val();
  
      if (foundIndicator === "Yes") {
        $fields.addClass("is-open positive");
        $fields.removeClass("negative");
        $submitButton.show();
      } else if (foundIndicator === "No") {
        $fields.addClass("is-open negative");
        $fields.removeClass("positive");
        $submitButton.show();
      }
    }

    // Set default state
    radioOnSelect();
    // Open feedback form on radio button selection.
    $loadRadios.on("change", function() {
      radioOnSelect();
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
  
  //   $feedbackForm.ajaxForm({
  //     // Add jsonp parameter when using ajax submission.
  //     data: {jsonp: 1},
  //     // Interpret received data as a script (JSONP).
  //     dataType: 'script',
  //     // Validate prior to submission.
  //     beforeSubmit: validateForm
  //   });

  //   console.log('test test')
  // // Validation Handler.
  // function validateForm(data, $form) {
  //   let validates = true;
  //   console.log(data)
  //   console.log($form)
  //   data.forEach(function (field) {
  //     // Check for empty required fields. Required status is determined
  //     // by the "required" attribute being set on an input.
  //     if (field.required && !field.value.length > 0) {
  //       // Add Error attribute for easy theming and accessibility.
  //       $('[name="' + field.name + '"]', $form)
  //         .addClass('error')
  //         .closest('fieldset').addClass('error');

  //       validates = false;
  //     }
  //   });



  //   if (!validates) {
  //     getMessaging($formm).html('<p class="error">Please fill in a valid value for all required fields</p>');
  //   }

  //   return validates;
  // }
  // function getMessaging($form) {
  //   var $messages = $('.messages', $form);
  //   if (!$messages.length) {
  //     $form.prepend('<div class="messages"/>');
  //     $messages = $('.messages', $form);
  //   }
  //   return $messages;
  // }

  }
})(window, document, jQuery);
