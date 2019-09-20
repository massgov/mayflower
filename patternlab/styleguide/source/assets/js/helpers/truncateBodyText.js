/**
 * @file
 * Truncate body text elements to four lines if they are six lines long or more at page load, and provide skip links for unsighted users.
 */

var calculateTruncation = function($el) {
  // Find a paragraph whose line-height to gauge.
  var $p = $el.find('p');
  // If there are no paragraphs, gauge by the element itself.
  $p = $p.length ? $p : $el;
  const style = window.getComputedStyle($p.get(0));
  const lineHeight = parseInt(style.lineHeight);
  const paddingTop = parseInt(style.paddingTop);
  const lineLimit = window.matchMedia('(max-width: 910px)').matches ? 6 : 8;

  $el.wrapInner('<div></div>');

  $el.data('thresholdHeight', (lineHeight * lineLimit) + paddingTop);
  $el.data('truncatedHeight', (lineHeight * (lineLimit - 2)) + paddingTop);
  $el.data('intrinsicHeight', $el.children().height());

  if(!$el.data('truncationPreviouslyCalculated')) {
    const focusableSelector = '[href], button, input:not([type="hidden"]), textarea, select, [tabindex]:not([tabindex^="-"])';
    $el.data('$button', $('<button class="ma-truncated-body-text__button">Show more</button>'));
    $el.data('$fadeOverlay', $('<div class="ma-truncated-body-text__fade-overlay"></div>'));
    $el.data('$focusableEls', $el.find(focusableSelector));
    $el.data('truncationPreviouslyCalculated', true);
  }
}

var toggleTabindexes = function($focusableEls, expanded) {
  if(expanded) {
    $focusableEls.each(function(i, el) {
      var $el = $(el);

      if($el.data('originalTabIndex')) {
        $el.attr('tabindex', $el.data('originalTabIndex'));
      } else {
        $el.removeAttr('tabindex');
      }
    });
  } else {
    $focusableEls.each(function(i, el) {
      var $el = $(el);

      if($el.attr('tabindex')) {
        $el.data('originalTabIndex', $el.attr('tabindex'))
      }
      
      $el.attr('tabindex', '-1');
    });
  }  
}

export default (function (window,document,$,$el) {
  // Disable previous truncation.
  $el.removeClass('ma-truncated-body-text expanded');
  $el.find('.ma-truncated-body-text__contents').children().unwrap();
  $el.children().removeClass('ma-truncated-body-text__contents');

  if($el.data('truncationPreviouslyCalculated')) {
    $el.data('$button').detach();
    $el.data('$fadeOverlay').detach();
    toggleTabindexes($el.data('$focusableEls'), true)
  }

  // Force reflow to correctly calculate height
  $el.get(0).getBoundingClientRect()
  
  // Calculate new dimensions.
  calculateTruncation($el);

  if($el.data('intrinsicHeight') < $el.data('thresholdHeight')) {
    return;
  }

  $el.children().addClass('ma-truncated-body-text__contents');

  const $button = $el.data('$button');

  $el.wrapInner('<div class="ma-truncated-body-text__contents"></div>');
  const $contents = $el.children();

  $el.addClass('ma-truncated-body-text');
  $el.prepend($el.data('$button'));

  toggleTabindexes($el.data('$focusableEls'));

  $contents.append($el.data('$fadeOverlay'));
  $contents.css('height', $el.data('truncatedHeight') + 'px');

  $button.data('toggleText', 'Show less');

  $button.on('click', function() {
    $el.toggleClass('expanded');
    $contents.css('height', $el.data($el.hasClass('expanded') ? 'intrinsicHeight' :'truncatedHeight'));

    var oldText = $button.text().trim();
    $button.text($button.data('toggleText'));
    $button.data('toggleText', oldText);

    toggleTabindexes($el.data('$focusableEls'), $el.hasClass('expanded'));

    if($el.hasClass('expanded')) {
      $contents.one('transitionend', function() {
        $el.data('$focusableEls').eq(0).trigger('focus');
      });
    }
  });
}).bind(undefined,window,document,jQuery);