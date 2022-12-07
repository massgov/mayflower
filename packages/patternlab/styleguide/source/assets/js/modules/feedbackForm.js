import { filtersCore, filtersOptional } from './feedbackFormValidation';

export default (function(window, document, $) {
  const $feedbackForm = $(".ma__mass-feedback-form__form");
  if($feedbackForm) {
    const $fields = $(".ma__mass-feedback-form__fields");
    const $textArea = $fields.find("textarea");
    const $loadRadios = $feedbackForm.find('.feedback-load input[type="radio"]');
    const $submitButton = $feedbackForm.find(".submitButton");
    const $submitButtonWrapper = $feedbackForm.find(".submitButtonWrapper");
  
    const radioOnSelect = () => {
      let foundIndicator = $loadRadios.filter(":checked").val();
  
      if (foundIndicator === "Yes") {
        $fields.addClass("is-open positive");
        $fields.removeClass("negative");
        $submitButtonWrapper.show();
      } else if (foundIndicator === "No") {
        $fields.addClass("is-open negative");
        $fields.removeClass("positive");
        $submitButtonWrapper.show();
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

      const alertFilters = combineFilter(filtersCore);
      const warnFilters = combineFilter(filtersOptional);

      const invalidate = () => {
        $el.addClass('has-error');
        $el.parent().nextAll('.ma__alert-msg').addClass('has-error');
        $submitButton.addClass('ma__button--disabled');
        $submitButton.prop('disabled', true);
      }
      const validate = () => {
        $el.removeClass('has-error');
        $el.parent().nextAll('.ma__alert-msg').removeClass('has-error');
        $submitButton.removeClass('ma__button--disabled');
        $submitButton.prop('disabled', false);
      }

      const warn = () => {
        $el.parent().nextAll('.ma__warn-msg').addClass('has-error');
      }

      const formValidation = (e) => {
        const input = e.val();
        const matchAlert = input.match(alertFilters);
        const matchWarn = input.match(warnFilters);
  
        if (input) {
          e.parent().nextAll('.ma__error-msg').removeClass('has-error');
        }

        if (matchAlert) {
          invalidate();
          warn();
        } else {
          validate();
        }

        if (matchWarn) {
          warn();
        }
      }
  
      $el.on("keyup", function() {
        // Auto size the text boxes
        if ($el.prop("scrollHeight") > $el.prop("clientHeight")) {
          $el.css("height", $el.prop("scrollHeight") + "px");
        } else {
          $el.css("height", "100%");
        }

        formValidation($el);

      });
    });

    $submitButton.onclick = () => {
      console.log('submitted')
    }
  }
})(window, document, jQuery);



