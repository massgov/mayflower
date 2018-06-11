export default function (window,document,$,undefined) {

  $('.ma__featured-item .ma__featured-item__title span').each(function() {
    const $this = $(this);
    const $thisParent = $this.parent();
    const $thisWrapper = $thisParent.closest('.ma__featured-item');
    let thisTitle = $this.text();

    // Links are truncated to 60 characters
    // The wrappers only accommodate 50 with ellipses and the icon
    if (thisTitle.length > 50) {
      // Add a class for styling.
      $thisParent.addClass('truncated');
      // Add the full title to the aria label to keep value
      $thisWrapper.attr('aria-label', thisTitle);

      // Truncate title at last full word before 50th character
      var truncatedTitle = thisTitle.substring(0, 50);
      truncatedTitle = truncatedTitle.substr(0, Math.min(truncatedTitle.length, truncatedTitle.lastIndexOf(" ")));
      thisTitle = truncatedTitle;
    }
    $this.text(thisTitle);
  });

}(window,document,jQuery);
