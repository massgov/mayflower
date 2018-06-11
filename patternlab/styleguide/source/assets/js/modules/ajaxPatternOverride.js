/**
 * @file
 * This demonstrates how to pass a transform function to MassAjaxPattern.
 */

export default function (window,document,$,undefined) {

  // Note that this selector is passed into the template so that this is run instead of the
  // default 'js-ajax-pattern'.  See the ajaxPattern.customSelector in guide.json page object.
  // In an implementation of this you would want to create your own selector and avoid
  // js-ajax-pattern and js-ajax-pattern-override since Mayflower will attach to these.
  $('.js-ajax-pattern-override').each(function(){
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
      $(this).MassAjaxPattern({
        "endpoint": endpoint,
        "renderPattern": renderPattern,
        "transform": function(ajaxData) {
          // Example of some custom data transformation being done to the data according to implementation needs.  This will often include restructuring of data.
          // If business logic indicates that the pattern should not render (for example, if the endpoint returns no emergency alert data) then this function should return an empty js object {}.
          data = ajaxData;
          data.emergencyAlerts.alerts = data.emergencyAlerts.these.are.alerts;
          return data;
        }
      });
    }
    catch (e) {
      console.error(e);
    }
  });

}(window,document,jQuery);
