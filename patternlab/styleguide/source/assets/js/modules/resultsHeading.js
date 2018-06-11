import twiggy from '../helpers/twiggy';

export default function (window,document,$,undefined) {
  // Set up global component config
  let  clearAllButton = '.js-results-heading-clear', // events triggered on parent
    filterButton = '.js-results-heading-tag'; // events triggered on parent

  $(".js-results-heading").each(function() {
    const $el = $(this);

    // Listen for clear all button click + trigger interaction event on parent.
    $el.on('click', clearAllButton, function () {
      $el.trigger('ma:ResultsHeading:ActiveTagClicked', [{clearedFilter: 'all'}]);
    });

    // Listen for single filter button click and trigger interaction event on parent.
    $el.on('click', filterButton, function (e) {
      let clearedFilter = {
        'type': $(e.target).data('ma-filter-type'),
        'value': $(e.target).data('ma-filter-value'),
        'text': $(e.target).text()
      };

      $el.trigger('ma:ResultsHeading:ActiveTagClicked', [{clearedFilter: clearedFilter}]);
    });

    // Listen for new results heading data, render new results heading.
    $el.on('ma:ResultsHeading:DataUpdated', function (e, data) {
      renderResultsHeading({data: data, $el: $el});
    });
  });

  /**
   * Renders the contents of a specific results heading component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderResultsHeading(args) {
    // Don't attempt to render anything if we don't have new data.
    if (!args.data) {
      return;
    }
    // Asynchronously render via TwigJS.
    twiggy('@molecules/results-heading.twig')
        .then(t => t.renderAsync({resultsHeading: args.data}))
        .then(markup => args.$el.html(markup))

  }

}(window,document,jQuery);
