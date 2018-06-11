export default function (window,document,$,undefined) {

  $('.ma__link-list--image-blocks, .ma__link-list--image-links').each(function() {

    const $thisList = $(this).find('.ma__link-list__items'),
    $thisToggle = $(this).find('.ma__link-list__toggle'),
    $thisToggleLabel = $thisToggle.find('span'),
    $listItem = $thisList.children(),
    listItems = $listItem.length;

    let debounceTimer;

    function showToggle() {
      let width = $(window).width();

      if ((listItems > 3) && (width < 780) || (listItems > 6) && (width < 1201)) {
        // Show More button only when there are enough to toggle.
        $thisToggle.addClass('show-toggle');
      }
      else {
        $thisToggle.removeClass('show-toggle');
      }
    }
    showToggle();

    $thisToggle.on('click', function() {

      let thisToggleText = $thisToggleLabel.text();
      $thisToggle.toggleClass('toggle-open');
      $thisToggleLabel.text(thisToggleText === "less" ? "more" : "less");

      $listItem.each(function() {
        let $item = $(this);

        if ($item.is(':hidden')) {
          $item.slideDown().addClass('toggle-open');
        }
        else if ($item.is(':visible') && $item.hasClass('toggle-open')) {
          $item.slideUp().removeClass('toggle-open');
        }
      });
    });

    $(window).resize(function () {

      if(typeof debounceTimer === "number") {
        window.clearTimeout(debounceTimer);
      }
      debounceTimer = window.setTimeout(function(){
        showToggle();

        // Remove added attributes at desktop width.
        if ($(window).width() < 1201) {
          $thisToggle.removeAttr('style');
          $listItem.removeAttr('style');
        }
      },150);
    });
  });

}(window,document,jQuery);