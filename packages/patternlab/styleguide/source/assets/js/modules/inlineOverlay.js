import focusTrapping from "../helpers/focusTrapping.js";

export default (function (document,$) {
  const tocContainerClass = '.js-toc-container';
  const containerClass = '.js-inline-overlay';
  const toggleClass = '.js-inline-overlay-toggle';
  const titleClass  = '.js-inline-overlay-title';
  const feedbackButton = $('body').find('.ma__fixed-feedback-button');
  const mainPageToggleButtton = $(".js-inline-overlay-title .js-inline-overlay-toggle");

  function initialize () {
    // Add random ID if no ID present.
    const containerID = $(containerClass).attr('id');
    if(!containerID) {
      const id = `overlay-${Math.floor(Math.random()*100000)}`;
       $(containerClass).attr('id', id);
       $(toggleClass).attr('aria-controls', id);
    }
  }

  function toggleOverlay() {
    const $containerEl = $(this).closest(tocContainerClass).find(containerClass);
    const isOpen = $containerEl.hasClass('is-open');
    $('body').toggleClass('scroll-disabled', !isOpen);
    $containerEl.toggleClass('is-open', !isOpen);

    $(`${toggleClass}[aria-expanded=${!isOpen}]`).parents(titleClass).focus();

    feedbackButton.toggleClass('hide-button');
  }

  initialize();
  $(document).on('click', toggleClass, toggleOverlay);
  $(document).keydown(function(e) {
    // check if menu open
    if ($(containerClass).hasClass('is-open')) {
      focusTrapping({
        focusableSelectors: 'a, button',
        modalSelector: '.ma__toc--overlay__container.is-open',
        keyEvent: e
      });

      // press ESC key to dismiss overlay
      const key = (e.key || e.code);
      const escapeKeyPressed = (key === 'Escape' || key === 'Esc')
      if (escapeKeyPressed) {
        // Close the overlay.
        $('.ma__toc--overlay__container').removeClass('is-open');
        // Set focus on the toggle GamepadButton.
        mainPageToggleButtton.focus();
      }
    }
  });


})(document,jQuery);
