/**
 * @file
 * Truncate body text elements to four lines if they are six lines long or more at page load, and provide skip links for unsighted users.
 */

/**
 * Calculate and store elements and dimensions for later truncation.
 */
var calculateTruncation = (function($, $el) {
  // Force reflow to correctly calculate height
  $el.get(0).getBoundingClientRect();

  // Find a paragraph whose line-height to gauge.
  var $p = $el.find('p');
  // If there are no paragraphs, gauge by the element itself.
  $p = $p.length ? $p : $el;

  // Calculate how tall the element should be when truncated.
  const style = window.getComputedStyle($p.get(0));
  const lineHeight = parseInt(style.lineHeight);
  const paddingTop = parseInt(style.paddingTop);

  // lineLimit represents the line count that *triggers* truncation, NOT
  // the height *after* truncation.
  const lineLimit = window.matchMedia('(max-width: 910px)').matches ? 7 : 9;

  $el.data({
    thresholdHeight: (lineHeight * lineLimit) + paddingTop,
    truncatedHeight: (lineHeight * (lineLimit - 3)) + paddingTop,
    intrinsicHeight: $el.children('div').height()
  });

  // Create new elements and gather focusable ones for later tabindex-ing.
  if(!$el.data('truncationPreviouslyCalculated')) {
    $el.data({
      $button: $('<button class="ma-truncated-body-text__button" aria-label="Show the overview.">Show more</button>'),
      $fadeOverlay: $('<div class="ma-truncated-body-text__fade-overlay"></div>'),
      $focusableEls: $el.find('[href], button, input:not([type="hidden"]), textarea, select, [tabindex]:not([tabindex^="-"])'),
      truncationPreviouslyCalculated: true
    });

    $el.data('$button').data({
      toggleText: 'Show less',
      toggleLabel: 'Hide the overview.'
    });
  }
}).bind(undefined, jQuery);

var removeTruncation = function($el) {
    $el.removeClass('ma-truncated-body-text expanded');
    $el.children('div').removeClass('ma-truncated-body-text__contents').css('height', 'auto');

    if($el.data('truncationPreviouslyCalculated')) {
      $el.data('$button').detach();
      $el.data('$button').data({
        toggleText: 'Show less',
        toggleLabel: 'Hide the overview.'
      });
      $el.data('$button').text('Show more');
      $el.data('$button').attr('aria-label', 'Show the overview.');
      $el.data('$fadeOverlay').detach();
      toggleTabindexes($el.data('$focusableEls'), true);
    }

    $el.data('$button').off('.truncateBodyText');
};

/**
 * Make elements focusable or not focusable based on expansion/collapse
 * of content area.
 */
var toggleTabindexes = function($focusableEls, expanded) {
  if(expanded) {
    $focusableEls.each(function(i, el) {
      var $el = $(el);

      // Restore tabindex to elements that had one;
      // remove it alogether from ones that didn't.
      if($el.data('originalTabIndex')) {
        $el.attr('tabindex', $el.data('originalTabIndex'));
      } else {
        $el.removeAttr('tabindex');
      }
    });
  } else {
    $focusableEls.each(function(i, el) {
      var $el = $(el);

      // Save the old tabindex for later restoration.
      if($el.attr('tabindex')) {
        $el.data('originalTabIndex', $el.attr('tabindex'));
      }
      
      $el.attr('tabindex', '-1');
    });
  }  
};

/**
 * Turn on truncation (if height requires it) based on previous calculations.
 */
var enableTruncation = function($el) {
  calculateTruncation($el);

  // Abort if truncation is unnecessary.
  if($el.data('intrinsicHeight') < $el.data('thresholdHeight')) {
    return;
  }

  // Restore BEM classes.  
  $el.addClass('ma-truncated-body-text');
  $el.children('div').addClass('ma-truncated-body-text__contents');

  const $button = $el.data('$button');

  // This is just the one .ma-truncated-body-text__contents div.
  const $contents = $el.children('div');

  // Add the button at the gradient.
  $el.prepend($button);
  $contents.append($el.data('$fadeOverlay'));


  // Remove tabindex attributes from contents to prevent tabbing
  // to hidden elements.
  toggleTabindexes($el.data('$focusableEls'));
 
  // The actual truncation happens here.
  $contents.css('height', $el.data('truncatedHeight') + 'px');

  $button.on('click.truncateBodyText', function() {
    $el.toggleClass('expanded');

    // Toggle height between truncated and expanded.
    $contents.css('height', $el.data($el.hasClass('expanded') ? 'intrinsicHeight' :'truncatedHeight'));

    // Change button text to the opposite option.
    var oldText = $button.text().trim();
    $button.text($button.data('toggleText'));
    $button.data('toggleText', oldText);

    var oldLabel = $button.attr('aria-label');
    $button.attr('aria-label', $button.data('toggleLabel'));
    $button.data('toggleLabel', oldLabel);

    // Reset or unset focusable state of links/buttons.
    toggleTabindexes($el.data('$focusableEls'), $el.hasClass('expanded'));

    // After expansion, focus the first link or button in the content.
    if($el.hasClass('expanded')) {
      $contents.one('transitionend', function() {
        $el.data('$focusableEls').eq(0).trigger('focus');
        $contents.get(0).scrollTop = 0;
      });
    }
  });
};

/**
 * Initialize truncation at page load.
 */
var initTruncation = function($el) {
  $el.wrapInner('<div></div>');

  enableTruncation($el);
};

export default (function (window,document,$,$el) {
  initTruncation($el);

  var resizeTimeout = false;
  var truncateResize = (function($el) {
    removeTruncation($el);
    enableTruncation($el);
  }).bind(undefined, $el);

  $(window).on('resize', function() {
    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(truncateResize, 500);
  });

}).bind(undefined,window,document,jQuery);
