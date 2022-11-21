import { filtersCore, filtersOptional } from './feedbackFormValidation';

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


    const combineFilter = (filters) => {
      const regexRe = filters.map(({ re }) => (re.toString().substring(1, re.toString().length - 2)));
      const regexStr = regexRe.join('|');
      const regex = new RegExp(regexStr, "i");
      return regex;
    }


    $textArea.each(function() {
      let $el = $(this);
      let valid = true;
      const invalidate = () => {
        $el.addClass('has-error');
        $submitButton.addClass('ma__button--disabled');
      }
      const validate = () => {
        $el.removeClass('has-error');
        $submitButton.removeClass('ma__button--disabled');
      }
  
      $el.on("keyup", function() {
        // Auto size the text boxes
        if ($el.prop("scrollHeight") > $el.prop("clientHeight")) {
          $el.css("height", $el.prop("scrollHeight") + "px");
        } else {
          $el.css("height", "100%");
        }

        const input = $el.val();
        const re = combineFilter(filtersCore);
        const match = input.match(re);
        //const valid = !re.test(input);
        console.log(match)
        if (match) {
          invalidate();
        } else {
          validate();
        }
      });
    });


  
    // $feedbackForm.ajaxForm({
    //   // Add jsonp parameter when using ajax submission.
    //   data: {jsonp: 1},
    //   // Interpret received data as a script (JSONP).
    //   dataType: 'script',
    //   // Validate prior to submission.
    //   beforeSubmit: validateForm
    // });

  //   console.log('test test')
  // Validation Handler.
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

  //   return validates;
  // }

  }
})(window, document, jQuery);



