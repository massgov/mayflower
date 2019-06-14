export default (function (window, document, $, undefined) {
  let $panels = $('.js-util-nav-content');
  let $utilityButtons = $('.js-util-nav-toggle');

  $panels.each(function () {
    const $panel = $(this);
    const height = $panel.height();
    const $closeButton = $panel.find('.js-close-util-nav');


    $panel.css('top', '-' + height + 'px');

    $closeButton.on('click', function () {
      $panel.css('top', '-' + height + 'px');
      $panel.toggleClass('is-closed');
      $panel.attr("aria-hidden", "true");
    });

  });

  $utilityButtons.each(function () {
    const $thisButton = $(this);
    const $thisButtonId = $(this).data("panel");
    const $thisPanel = $('.js-util-nav-content[data-panel=' + $thisButtonId + ']');

    $thisButton.on('click', function () {
      $thisPanel.removeClass('is-closed');
      $thisPanel.removeAttr('style');
      $thisPanel.attr("aria-hidden", "false");

      $('body').addClass('show-submenu');
    });
  });

  $('.js-close-sub-nav').on('click', function () {
    $('.js-util-nav-content').addClass('is-closed');
    $('.js-util-nav-content').removeAttr('style');
    $('body').removeClass('show-submenu');
  });

})(window, document, jQuery);
