
let $panels = $('.js-util-nav-content');
let $utilityButtons = $('.js-util-nav-toggle');

$panels.each(function () {
  const $panel = $(this);
  const height = $panel.height();
  const $closeButton = $panel.find('.js-close-util-nav');
  $panel.css('top', '-' + height + 'px');

  $(window).on('resized', function () {
    if ($(window).width() > 840) {
      $panel.css('top', '-' + height + 'px');
    }
    else {
      $panel.removeAttr('style')
    }
  });


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
  const $tabSet = $thisPanel.find('.ma__utility-panel').first().find('.js-clickable-link').first();

  console.log($tabSet);

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

// debouncer
var resize_timeout;
$(window).on('resize orientationchange', function () {
  clearTimeout(resize_timeout);

  resize_timeout = setTimeout(function () {
    $(window).trigger('resized');
  }, 250);
});
