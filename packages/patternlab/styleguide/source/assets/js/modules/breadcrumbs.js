export default (function(window, document, $) {
  let $breadcrumbsIndicator = $('.ma__breadcrumbs__item__expand-indicators');
  let $button = $('.js-breadcrumbs-button');
  let $breadcrumbItems = $( ".ma__breadcrumbs__item" );
  let $breadcrumbItemsWrapper = $( ".ma__breadcrumbs__items" );
  let $breadcrumbItemsSlice = null;
  if($breadcrumbItems.length) {
    $breadcrumbItemsSlice = $breadcrumbItems.slice( 2, $breadcrumbItems.length -3 );

    if($breadcrumbItemsSlice.length) {
      $breadcrumbsIndicator.css('display', 'inline-block');
      $breadcrumbsIndicator.insertAfter($breadcrumbItems[1]);
      $breadcrumbItemsSlice.hide();

      let ariaControls = "";
      $breadcrumbItemsSlice.map( function() {
        ariaControls += $(this).attr('id') + " ";
      });

      $breadcrumbItemsSlice.attr("aria-hidden", "true");
      $button.attr('aria-expanded', 'false');
      $button.attr('aria-controls', ariaControls);

      $button.on('click', function() {
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
})(window,document,jQuery);
