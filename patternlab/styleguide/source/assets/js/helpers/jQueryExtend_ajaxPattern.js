import twiggy from './twiggy';

export default function (window,document,$,undefined) {
  'use strict';

  // Plain old javascript object to hold cached alert data.
  // This prevents duplicate calls to endpoints on pages that
  // display alerts in both the header and the body.
  let ajaxCache = {};

  // Object-orientated approach to jQuery plugin building, so as to not
  // pollute global namespace or a complicated switch based on passed params.
  let ajaxPattern = function(element, options) {
    let endpoint = options.endpoint;
    const pattern = options.renderPattern;
    let patternTransform = options.transform;
    let self = this;
    let $element = $(element);

    /**
     * Wrapper function to get and render data for a given pattern.
     */
    self.updatePattern = function() {
      self.getPatternData()
        .then(function (patternData) {
          // If a custom transform function was passed in, invoke it.
          if (patternTransform && typeof patternTransform === "function") {
            patternData = patternTransform(patternData);
          }

          //@todo validate the data against a schema: https://github.com/tdegrunt/jsonschema

          // Only attempt to render a pattern if there is data.
          if ($.isEmptyObject(patternData)) {
            return;
          }
          // Render the pattern with the data.
          try {
            self.renderPattern(pattern,patternData);
          }
          catch (e) {
            console.error(e);
          }
        })
        .fail(function () {
          console.error('MA::AjaxPattern::Could not get data at endpoint:', endpoint);
        });
    };

    /**
     * Use TwigJS to render the pattern with its data from the twig template.
     *
     * @param pattern
     *  A namespaced path to a twig template for the pattern we want to render (i.e. @atoms/decorative-link.twig)
     * @param data
     *  The data structure which the pattern expects in order to render.
     */
    self.renderPattern = function(pattern,data) {
      return twiggy(pattern)
          .then(template => template.renderAsync(data))
          .then(markup => {
            $element.html(markup)
              $(document).trigger('ma:AjaxPattern:Render', [{'el': $element}]);
          });
    };

    /**
     * Returns the gettable path to a pattern based on its namespaced path.
     *
     * @param pattern
     *   The namespaced path to a pattern (i.e. @atoms/decorative-link.twig)
     *
     * @returns {string}
     *   The path to a pattern which can be used in a get request (i.e. /assets/patterns/atoms/decorative-link.twig )
     */
    self.getPatternPath = function(pattern) {
      let pathParts = pattern.split("/");
      let namespace = pathParts.shift();
      let patternPath = pathParts.join("/");
      // Set ma.patternPaths in your implementation's env.js file (see /source/_meta/_00-foot.twig)
      return ma.patternPaths[namespace] + patternPath;
    };

    /**
     * Asynchronous function which makes ajax request to passed in endpoint to get emergency alerts data.
     *
     * @returns {*}
     *   A promise.
     */
    self.getPatternData = function() {
      if (!endpoint) {
        // throw an error
        throw new Error('MA::AjaxPattern::An endpoint argument is required.');
      }

      // Check if we have a request already made or in-flight for this endpoint.
      if (ajaxCache[endpoint]) {
        return ajaxCache[endpoint];
      }

      // Make ajax request to endpoint (returns promise)
      return ajaxCache[endpoint] = $.ajax({
          type: 'GET',
          url: endpoint,
          cache: true,
          dataType: 'json'
      }).fail(function(jqXHR, textStatus, errorThrown) {
          console.error('MA::AjaxPattern::Ajax Error: ', errorThrown);
      });
    };

    self.updatePattern();
    return true;
  };


  /**
   * Create a custom Transform plugin.
   */
  $.fn.MassAjaxPattern = function(options) {

    return this.each(function(i, el) {
      let $element = $(el);
      // Returns early if plugin is already there.
      if ($element.data('mass-ajax-data')) {
        return;
      }
      let data = new ajaxPattern(this, options);
      $element.data('mass-ajax-data', data);
    });

  };

  // Plugin defaults.
  $.fn.MassAjaxPattern.defaults = {
    endpoint: '',
    pattern: '',
    transform: undefined
  };
}(window,document,jQuery);
