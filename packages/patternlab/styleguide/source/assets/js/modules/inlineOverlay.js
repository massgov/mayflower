import focusTrapping from "../helpers/focusTrapping.js";

export default (function (document,$) {
  let tocContainerClass = '.js-toc-container';
  let containerClass = '.js-inline-overlay';
  let contentClass = '.js-inline-overlay-content';
  let toggleClass = '.js-inline-overlay-toggle';
  let titleClass  = '.js-inline-overlay-title';
  let feedbackButton = $('body').find('.ma__fixed-feedback-button');
  const mainPageToggleButtton = $(".js-inline-overlay-title .js-inline-overlay-toggle");

  function initialize () {
    // Add random ID if no ID present.
    let contentID = $(contentClass).attr('id');
    if(!contentID) {
      let id = `overlay-${Math.floor(Math.random()*100000)}`;
       $(containerClass).attr('id', id);
       $(toggleClass).attr('aria-controls, id');
    }
  }

  function toggleOverlay() {
    let $containerEl = $(this).closest(tocContainerClass).find(containerClass);
    let isOpen = $containerEl.hasClass('is-open');
    $('body').toggleClass('scroll-disabled', !isOpen);
    $containerEl.toggleClass('is-open', !isOpen);

    $(`${toggleClass}[aria-expanded=${!isOpen}]`).parents(titleClass).focus();

    feedbackButton.toggleClass('hide-button');
  }

  initialize();
  $(document).on('click', toggleClass, toggleOverlay);
  $(document).keydown(function(e) {
    // check if menu open
    // const body = document.querySelector('body');
    // if(body.classList.value.indexOf('show-menu') > 0) {
      // trap focus only when menu is open
      focusTrapping({
        focusableSelectors: 'a, button',
        modalSelector: '.ma__toc--overlay__container.is-open',
        keyEvent: e
      });
    //}

    // press ESC key to dismiss overlay
    const key = (e.key || e.code);
    const escapeKeyPressed = (key === 'Escape' || key === 'Esc')
    if (escapeKeyPressed && $(containerClass).hasClass('is-open')) {
      // Close the overlay.
      $('.ma__toc--overlay__container').removeClass('is-open');
      // Set focus on the toggle GamepadButton.
      mainPageToggleButtton.focus();
    }
  });


})(document,jQuery);
