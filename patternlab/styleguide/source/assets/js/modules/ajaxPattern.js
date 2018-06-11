/**
 * @file
 * Ajax Alert js has to execute prior to its dependent accordion and emergency alert js modules.
 */

export default function (window,document,$,undefined) {

  $('.js-ajax-pattern').each(function(){
    // Get the endpoint which is passed in as ajaxAlerts.endpoint to organism data attribute.
    let endpoint = $(this).data('ma-ajax-endpoint');
    if (!endpoint) {
      console.error("MA::AjaxPattern::This pattern requires an endpoint to be passed in as an argument.");
      return false;
    }

    let renderPattern = $(this).data('ma-ajax-render-pattern');
    if (!renderPattern) {
      console.error("MA::AjaxPattern::This pattern requires a child pattern to be passed as an argument.");
      return false;
    }
    try {
      $(this).MassAjaxPattern({"endpoint": endpoint, "renderPattern": renderPattern});
    }
    catch (e) {
      console.error(e);
    }
  });

}(window,document,jQuery);
