/**
 * @file
 * Behaviors for the Feedback Modal.
 *
 */

export default (function (window, document, $) {

  // Main Feedback Modal container.
  const $feedbackModal = $(".ma__feedback-modal");

  // Toggles use a common class.
  $(".js-ma__feedback-modal-toggle", $feedbackModal).on("click", function() {
    toggleModal();
  });

  // Click handler for esc key.
  $(document).keyup(function(e) {
    // Keycode 27 is the `esc` key.
    if (e.keyCode === 27 && $feedbackModal.hasClass("ma__feedback-modal--modal-active")) {
      closeModal();
    }
  });

  // Behaviors that happen when hitting an element that should
  // toggle the modal.
  function toggleModal() {
    if (!$feedbackModal.hasClass("ma__feedback-modal--modal-active")) {
      // Class is not on Feedback Modal container. Add class to activate.
      openModal();
    }
    else {
      // Class does exist on Feedback Modal container. Remove to close.
      closeModal();
    }
  }

  // Behaviors that happen when opening the modal.
  function openModal() {
    $feedbackModal.addClass("ma__feedback-modal--modal-active");
  }

  // Behaviors that happen when closing the modal.
  function closeModal() {
    $feedbackModal.removeClass("ma__feedback-modal--modal-active");
  }

}) (window, document, jQuery);
