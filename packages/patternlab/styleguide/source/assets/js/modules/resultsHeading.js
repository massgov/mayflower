export default (function (window,document,$,undefined) {
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
    const heading = args.data;
    const hasTags = Array.isArray(heading.tags) && heading.tags.length > 0;
    const $container = $('<div class="ma__results-heading__container"></div>');
    const $title = $('<div class="ma__results-heading__title" role="status"></div>');

    let titleText = `Showing ${String(heading.numResults || "0 - 0")}`;
    if (heading.totalResults) {
      titleText += ` of ${String(heading.totalResults)}`;
    }
    titleText += " results";
    if (hasTags) {
      titleText += "for:";
    }
    $title.text(titleText);

    if (heading.subject) {
      $title.append($('<span class="ma__visually-hidden"></span>').text(` for ${String(heading.subject)}`));
    }
    $container.append($title);

    if (hasTags) {
      const $tags = $('<fieldset class="ma__results-heading__tags"></fieldset>');
      $tags.append('<legend class="ma__visually-hidden">Clear the active filters with the following buttons.</legend>');

      heading.tags.forEach(function(tag) {
        const $button = $('<button type="button" class="ma__results-heading__tag js-results-heading-tag"></button>')
          .text(String(tag.text || ""));
        if (tag.type) {
          $button.attr('data-ma-filter-type', String(tag.type));
        }
        if (tag.value) {
          $button.attr('data-ma-filter-value', String(tag.value));
        }
        $tags.append($button);
      });

      $tags.append('<button type="button" class="ma__results-heading__clear js-results-heading-clear">Clear all</button>');
      $container.append($tags);
    }

    if (heading.sortResults) {
      // Preserve the existing sort results subtree if this listing includes it.
      const $existingSort = args.$el.find(".ma__results-heading__sort").first();
      if ($existingSort.length) {
        $container.append($('<div class="ma__results-heading__sort"></div>').html($existingSort.html()));
      }
    }

    args.$el.empty().append($container);
  }

})(window,document,jQuery);
