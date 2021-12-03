export default (function(window, document, $) {
  let $breadcrumbsIndicator = $('.ma__breadcrumbs__item__expand-indicators');
  let $button = $('.js-breadcrumbs-button');
  let $breadcrumbItems = $( ".ma__breadcrumbs__item" );
  let $breadcrumbsContainer = $( ".ma__breadcrumbs__container" );
  let $breadcrumbs = $( ".ma__breadcrumbs" );
  let $breadcrumbItemsSlice = null;
  let windowWidth = $(window).width();

  if($breadcrumbItems.length) {
    // Mobile display.
    if( windowWidth < 910) {


      // Start by adding a right fading if there are more items than the viewport allows.
      if ($breadcrumbsContainer[0].scrollWidth > $('.ma__breadcrumbs').width() + 40) {
        $breadcrumbs.addClass('ma__breadcrumbs--fade-right');
      }

      // On breadcrumb scrolling, add or remove the left / right fading.
      $breadcrumbsContainer.on( 'scroll', function(){
        // Left fading
        if ($breadcrumbsContainer.scrollLeft() > 0) {
          $breadcrumbs.addClass('ma__breadcrumbs--fade-left');
        } else {
          $breadcrumbs.removeClass('ma__breadcrumbs--fade-left');
        }

        // Right fading
        var newScrollLeft = $breadcrumbsContainer.scrollLeft(),
          width=$breadcrumbsContainer.outerWidth(),
          scrollWidth=$breadcrumbsContainer.get(0).scrollWidth;
        if (scrollWidth-newScrollLeft==width) {
          $breadcrumbs.removeClass('ma__breadcrumbs--fade-right');
        } else {
          $breadcrumbs.addClass('ma__breadcrumbs--fade-right');
        }
      });

    } else {
      //Desktop display.
      $breadcrumbItemsSlice = $breadcrumbItems.slice(2, $breadcrumbItems.length - 3);

      if ($breadcrumbItemsSlice.length) {
        $breadcrumbsIndicator.css('display', 'inline-block');
        $breadcrumbsIndicator.insertAfter($breadcrumbItems[1]);
        $breadcrumbItemsSlice.hide();

        let ariaControls = "";
        $breadcrumbItemsSlice.map(function () {
          ariaControls += $(this).attr('id') + " ";
        });

        $breadcrumbItemsSlice.attr("aria-hidden", "true");
        $button.attr('aria-expanded', 'false');
        $button.attr('aria-controls', ariaControls);

        $button.on('click', function () {
          $breadcrumbsIndicator.hide();
          $breadcrumbItemsSlice.show();

          $breadcrumbsIndicator.attr("aria-hidden", "true");
          $button.attr("aria-expanded", "true");
          $breadcrumbItemsSlice.attr("aria-hidden", "false");

        });

      } else {
        $breadcrumbsIndicator.remove();
      }
    }
  }

})(window,document,jQuery);
