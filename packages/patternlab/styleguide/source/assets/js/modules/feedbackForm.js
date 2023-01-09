import { filtersCore, filtersOptional } from './feedbackFormValidation';

export default (function(window, document, $) {
  const $feedbackForm = $(".ma__mass-feedback-form__form");
  if($feedbackForm) {
    const $fields = $(".ma__mass-feedback-form__fields");
    const $textArea = $fields.find("textarea");
    const $loadRadios = $feedbackForm.find('.feedback-load input[type="radio"]');
    const $submitButton = $feedbackForm.find(".submitButton");
    const $submitButtonWrapper = $feedbackForm.find(".submitButtonWrapper");
    const feedbackButton = document.getElementsByClassName('ma__fixed-feedback-button')[0];

    if(feedbackButton) {
      const topOffset = $feedbackForm.offset() && $feedbackForm.offset().top;
      const stickyOnScroll = () => {
        const feedbackButtonBottomOffset = window.scrollY + feedbackButton.getBoundingClientRect().bottom;
        if(feedbackButtonBottomOffset >= topOffset) {
          feedbackButton.classList.add('hide-button-vis');
          feedbackButton.setAttribute("aria-hidden", "true");
        } else {
          feedbackButton.classList.remove('hide-button-vis');
          feedbackButton.setAttribute("aria-hidden", "false");
        }
      }

      $(window).scroll(function () {
        stickyOnScroll();
      });
    }

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
        $el.parent().next('.ma__updated-info').children('.ma__alert-msg').addClass('has-error');
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


      // Prevent aria-describedby content to be announced everytime the charcount is updated.
      // var helpTipId = $textArea.attr('aria-describedby');
      // $el.on("change", function () {

      //   console.log($el.val().length);

      //   if ($el.val().length > 0 && $el.attr('aria-describedby')) {
      //     console.log($(this).val());
      //     $el.removeAttr('aria-describedby');
      //   }
      //   if (remaining == 500 && !$el.attr('aria-describedby')) {
      //     $el.attr('aria-describedby', helpTipId);
      //   }
      // });

      // var focusCounter = 0;
      // console.log("focusCounter: " + focusCounter);
      // $el.on("focus", function (e) {
      //   focusCounter++;
      //   console.log("focusCounter: " + focusCounter);
      // });
    });


    // var focusCounter = 0;
    // console.log("focusCounter: " + focusCounter);
    // $textArea.on("focus", function (e) {
    //   focusCounter++;
    //   console.log("focusCounter: " + focusCounter);
    // });
  }
})(window, document, jQuery);



