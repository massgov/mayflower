
import jQuery from 'jquery';

export default (function (window,document,$,undefined) {
  let tocContainerClass = '.js-toc-container';
  let containerClass = '.js-inline-overlay';
  let contentClass = '.js-inline-overlay-content';
  let toggleClass = '.js-inline-overlay-toggle';
  let titleClass  = '.js-inline-overlay-title';
  let feedbackButton = $('body').find('.ma__fixed-feedback-button');

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
  // allow esc key to dismiss overlay
  $(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode === 27 && $(containerClass).hasClass('is-open')) {
      toggleOverlay();
    }
  });


})(window,document,jQuery);
