/**
 * @file
 * This script is a copy of the Feedback Form script located
 * in the Drupal module. Sections of this script have been removed
 * to ensure this script will operate in MF.
 *
 * Original File Location:
 * /DRUPAL_ROOT/modules/custom/mass_feedback_form/js/mass-feedback-form.js
 */

export default (function (window, document, $) {
  'use strict';

  var FORM_ID = 2521317;
  var RADIO_ID = 47054416;
  var YES_FEEDBACK_ID = 52940022;
  var NO_FEEDBACK_ID = 47054414;
  var REFERER_ID = 47056299;

  $(document).ready(function () {
    $('#fsForm' + FORM_ID).each(function () {
      const $form = $(this);
      const $radio = $('input[name="field' + RADIO_ID + '"]', $form);
      const $textBoxYes = $('#field' + YES_FEEDBACK_ID, $form);
      const $textBoxNo = $('#field' + NO_FEEDBACK_ID, $form);
      const $hiddenFields = $('[name="hidden_fields"]', $form);

      // Set referer value.
      $('#field' + REFERER_ID, this).val(location.href);

      // Add field swapping logic to the textareas.
      $radio.change(handleRadioChange);

      function handleRadioChange() {
        // Remove the existing character countdown box.
        $("div[id^='accessibleCharCount-wrapper-']").remove();
        // Clear the error message from the previous validation.
        $('.error', $form).removeClass('error');
        $('.messages', $form).remove();
        switch ($(this).val()) {
          case 'Yes':
            $('.radio-no', $form).addClass('hide');
            $('.radio-yes', $form).removeClass('hide');
            $textBoxYes.removeAttr('disabled');
            $textBoxNo.val('');
            $textBoxNo.attr('aria-describedby', 'feedback-note');
            $textBoxNo.attr('disabled', 'disabled');
            $textBoxNo.removeAttr('required');
            $hiddenFields.val($textBoxNo.attr('id'));
            clearRadioError($radio);
            break;

          case 'No':
            $('.radio-yes', $form).addClass('hide');
            $('.radio-no', $form).removeClass('hide');
            $textBoxNo.removeAttr('disabled');
            $textBoxNo.attr('required', 'required');
            $textBoxYes.val('');
            $textBoxYes.attr('aria-describedby', 'feedback-note2');
            $textBoxYes.attr('disabled', 'disabled');
            $hiddenFields.val($textBoxYes.attr('id'));
            clearRadioError($radio);
        }
      }

      // Create a global representing the form object.  This is to handle
      // JSONP callbacks appropriately.  See http://static.formstack.com/forms/js/3/scripts.js
      window['form' + FORM_ID] = {
        onSubmitError: function (err) {
          getMessaging($form).html('<p class="error">' + err.error + '</p>');
        },
        onPostSubmit: function (messageObj) {
          $form.html($(messageObj.message));
        }
      };
    });

  });

  // Validation Handler.
  function validateForm(data, $form) {
    var validates = true;
    data.forEach(function (field) {
      // Check for empty required fields. Required status is determined
      // by the "required" attribute being set on an input.
      if (field.required && !field.value.length > 0) {
        // Add Error attribute for easy theming and accessibility.
        $('[name="' + field.name + '"]', $form)
          .addClass('error')
          .closest('fieldset').addClass('error');

        validates = false;
      }
    });
    // Check the first question is answered.
    var $radio = $('[name="field' + RADIO_ID + '"]', $form);
    if (!$radio.filter(':checked').length) {
      validates = false;
      $radio.addClass('error')
        .closest('fieldset').addClass('error c_radio');
    }
    if (!validates) {
      getMessaging($form).html('<p class="error">Please fill in a valid value for all required fields</p>');
    }

    return validates;
  }

  function getMessaging($form) {
    var $messages = $('.messages', $form);
    if (!$messages.length) {
      $form.prepend('<div class="messages"/>');
      $messages = $('.messages', $form);
    }
    return $messages;
  }

  function clearRadioError($radio) {
    $radio.removeClass('error')
      .closest('fieldset').removeClass('error c_radio');
  }

}) (window, document, jQuery);
