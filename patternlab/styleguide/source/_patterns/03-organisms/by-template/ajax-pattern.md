### Description
This pattern is designed to facilitate client side rendering of another Mayflower pattern whose data is requested from an api endpoint.


### Status
* Alpha


### Pattern Contains
This pattern can include whichever pattern is passed in via the `ajaxPattern.renderPattern` variable.

This example implementation (see the data `ajaxPattern.json` file) includes Emergency Alerts.

### Usage Guidelines 
  * The intended pattern will render as is, if:
       - the endpoint is valid
       - data matching the structure for `ajaxPattenr.renderPattern` is received
  * If the endpoint will not provide data matching the structure, a custom selector can be passed into the component which will provide a hook for a custom transform function to create the necessary data structure. In this case, the implementation should include JavaScript that uses the `MassAjaxPattern jQuery plugin`, passing in a function that transforms the data from the endpoint into the structure needed to render `ajaxPattern.renderPattern`.  If there is no data and the pattern should not be rendered, then the transform function should return an empty javascript object `{}`.
  * See usage guidelines for the child pattern (i.e. the value of `ajaxPattern.renderPattern`)

### JavaScript Used
* Requires `ma.themePath` (path to assets directory in your implementation) and `ma.patternsPath` (path to the directory which contains twig templates in your implementation) to be set in your js implementation (see `/source/_meta/_00-foot.twig`)
* Ajax Pattern (`js/modules/ajaxPattern.js`)
* jQuery Extend for Ajax Pattern (`js/helpers/jQueryExtend_ajaxPattern.js`)

Note: If the `ajaxPattern.renderPattern` pattern implements javascript (consult the `.md` documentation file for that pattern to find out), you will likely need to update that javascript to initialize the component once your new instance of that pattern has rendered (see the `MA:AjaxPattern:Render` event triggered by `js/helpers/jQueryExtend_ajaxPattern.js`).

Currently, most of our pattern javascript is written in a way that initializes patterns which exist on the DOM on page load.

See `js/modules/emergencyAlerts.js` for an example of pattern js which has already been updated to listen for and initialize on the `MA:AjaxPattern:Render` event.

### Variables
~~~
ajaxAlerts: {
  endpoint: 
    type: string (url) / required
  renderPattern: 
    type: string (namespaced path to pattern being rendered) / required
  customSelector: 
    type: string / optional
}
~~~

### Sample use of MassAjaxPattern
See live example in `js/modules/ajaxPatternOverride.js` which is used on [@pages/guide](/?pages-guide)
```javascript
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
          data = ajaxData;
          data.emergencyAlerts.emergencyHeader.title = "This alert title was overridden by a custom transform function.";
          return data;
        }
      });
    }
    catch (e) {
      console.error(e);
    }
  });
```
