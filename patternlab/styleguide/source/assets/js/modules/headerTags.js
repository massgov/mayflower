export default function (window,document,$,undefined) {
  "use strict";
  $('.js-header-tag-link').each(function(index) {

    let $el = $(this),
        $showHideButton = $('.js-header-tag-button', $el),
        $dynamicItems = $('a:nth-child(n+4)', $el),
        id = $el.attr('id') || 'headerTags' + (index + 1),
        open = $el.hasClass('is-open');

      // Set the id attribute (respects default if set).
      $el.attr('id', id);

      if ($dynamicItems.length) {
        // Show our see button if we have more than three items.
        $showHideButton.attr('aria-expanded',open).attr('aria-controls', id);
        $showHideButton.show();
      }

      $showHideButton.on('click', function(e) {
        e.preventDefault();
        $el.toggleClass('is-open');

        if ($el.hasClass('is-open')) {
          $showHideButton.attr('aria-expanded', 'true');
          $dynamicItems.show();
        }
        else {
          $showHideButton.attr('aria-expanded', 'false');
          $dynamicItems.hide();
        }
      });
  });

  $('.ma__relationship-indicators--terms').each(function() {
    let $tagWrapper = $(this);
    let $button = $tagWrapper.find('.js-relationship-indicator-button');
    let $buttonCounter = $button.find('.tag-count');
    let $hiddenTag = $tagWrapper.find('.ma__relationship-indicators--term:hidden');
    let tagCount = $hiddenTag.length;
    let $tagState = $button.find('.tag-state');

    // if hidden  tags exist, show button
    if (tagCount) {
      $button.toggle();
    }

    // use hidden tags to populate button label
    $buttonCounter.text(tagCount);

    $button.on('click', function() {
      let $tagStateText = $tagState.text();

      $tagWrapper.parent().toggleClass('tags-open');
      $button.toggleClass('is-open');
      $tagState.text($tagStateText === 'fewer' ? 'more' : 'fewer');
      $hiddenTag.toggle();
    });

    $(window).resize(function () {
      // remove all the screen width specific styles
      $buttonCounter.removeAttr('style');
      $hiddenTag.removeAttr('style');

      // recount the hidden tags and update the button text
      setTimeout(function(){
        $hiddenTag = $tagWrapper.find('.ma__relationship-indicators--term:hidden');
        $buttonCounter.text(tagCount);
        $tagState.text('more');
      }, 500);

    });

  });

}(window,document,jQuery);
