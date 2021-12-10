export default (function (window,document,$,undefined) {
  "use strict";

  let $relationshipIndicators = $('.ma__relationship-indicators');

  $('.js-header-tag-link').each(function(index) {

    let $el = $(this),
        $showHideButton = $('.js-header-tag-button', $el),
        $dynamicItems = $('a:nth-child(n+4)', $el),
        $focusItem = $('a:nth-child(4)', $el),
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
          $focusItem.focus();
        }
        else {
          $showHideButton.attr('aria-expanded', 'false');
          $dynamicItems.hide();
        }
      });
  });

  /**
   * Handles relationship indicators dropdown grouping for desktop and mobile.
   *
   * @param groupAfter optional, if it's not specified it will look at data-group-after on the section group.
   *
   */
  function groupIndicators(groupAfter = null) {

    $('.ma__relationship-indicators--terms').each(function() {

      let $tagWrapper = $(this);
      let $button = $tagWrapper.find('.js-relationship-indicator-button');
      let $buttonCounter = $button.find('.tag-count');
      let $hiddenTag = $tagWrapper.find('.js-term:hidden');

      // Start by making visible all the relationship indicators.
      $hiddenTag.show();

      // Determines the grouping number.
      let $group = $('.ma__relationship-indicators--section-group');
       groupAfter = (groupAfter != null)?groupAfter:parseInt($group.data('group-after')) -1;

      if ($group.length && !$hiddenTag.length) {
        $hiddenTag = $tagWrapper.find('.js-term:gt('+ groupAfter +')');
        $hiddenTag.addClass('ma__relationship-indicators--term--fold');
        $hiddenTag.hide();
      }

      let tagCount = $hiddenTag.length;
      let $tagState = $button.find('.tag-state');

      // If hidden tags exist, show button.
      if (tagCount) {
        $button.show();
      } else {
        $button.hide();
      }

      // Use hidden tags to populate button label.
      $buttonCounter.text(tagCount);

      $button.on('click', function() {
        let $tagStateText = $tagState.text();

        // Open hidden tags.
        $tagWrapper.parent().toggleClass('tags-open');
        $button.toggleClass('is-open');
        $hiddenTag.toggle();

        // Change button text.
        $tagState.text($tagStateText === 'fewer' ? 'more' : 'fewer');

        $button.attr('aria-pressed', function(_, attr) { return !(attr == 'true') });

      });
    });
  }

  //groupIndicators();

  $(window).resize(function () {
    let windowWidth = $(window).width();

    setTimeout(function(){
      // Reset the button visibility.
      if(windowWidth < 910 && !$relationshipIndicators.hasClass('.ma__relationship-indicators--mobile')){
        $relationshipIndicators.addClass('.ma__relationship-indicators--mobile');
        $relationshipIndicators.removeClass('.ma__relationship-indicators--desktop');
        groupIndicators(0);
      }
      else if(windowWidth >= 910 && !$relationshipIndicators.hasClass('.ma__relationship-indicators--desktop')) {
        $relationshipIndicators.removeClass('.ma__relationship-indicators--mobile');
        $relationshipIndicators.addClass('.ma__relationship-indicators--desktop');
        groupIndicators();
      }



    }, 50);

  });


})(window,document,jQuery);
