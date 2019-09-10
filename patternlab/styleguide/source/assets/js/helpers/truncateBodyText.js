/**
 * @file
 * Truncate body text elements to four lines if they are six lines long or more at page load, and provide skip links for unsighted users.
 */

export default (function (window,document,$,$el) {
  // Find a paragraph whose line-height to gauge.
  var $p = $el.find('p');
  // If there are no paragraphs, gauge by the element itself.
  $p = $p.length ? $p : $el;
  const style = window.getComputedStyle($p.get(0));
  const lineHeight = parseInt(style.lineHeight);
  const paddingTop = parseInt(style.paddingTop);
  var lineLimit = window.matchMedia('(max-width: 910px)').matches ? 5 : 7;

  if($el.height() < ((lineHeight * lineLimit) + paddingTop)) {
    return;
  }

  const targetHeight = (lineHeight * (lineLimit - 1)) + paddingTop;
  const $button = $('<button class="ma-truncated-body-text__button">Show more</button>');
  const $fadeOverlay = $('<div class="ma-truncated-body-text__fade-overlay"></div>')

  $el.wrapInner('<div class="ma-truncated-body-text__contents"></div>');
  const $contents = $el.children();

  $el.addClass('ma-truncated-body-text');
  $el.prepend($button);

  $contents.append($fadeOverlay);
  $contents.css('max-height', targetHeight);

  $button.data('toggleText', 'Show less');

  $button.on('click', function() {
    $el.toggleClass('expanded');
    var oldText = $button.text().trim();
    $button.text($button.data('toggleText'));
    $button.data('toggleText', oldText);
  });
}).bind(undefined,window,document,jQuery);
