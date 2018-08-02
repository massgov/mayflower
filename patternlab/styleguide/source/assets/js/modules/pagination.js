import twiggy from '../helpers/twiggy';

export default function (window,document,$,undefined) {

  if($('.js-pagination').length === 0) {
    return;
  }

  // Set up global component config
  let  prevButton = '.js-pagination-prev',
    nextButton = '.js-pagination-next',
    pageButton = '.js-pagination-page';

  $('.js-pagination').each(function(){
    let $el = $(this);

    // Listen for previous page button click and trigger pagination event.
    $el.on('click', prevButton, function () {
      $el.trigger('ma:Pagination:Pagination', ['previous']);
    });
    // Listen for next button click and trigger pagination event.
    $el.on('click', nextButton, function () {
      $el.trigger('ma:Pagination:Pagination', ['next']);
    });
    // Listen for page number button click and trigger pagination event;
    $el.on('click', pageButton, function (e) {
      let targetPageNumber = $(e.target).data('page');
      $el.trigger('ma:Pagination:Pagination', [targetPageNumber]);
    });

    // Listen for new data, render new pagination.
    $el.on('ma:Pagination:DataUpdated', function (e, data) {
      renderPagination({data: data, $el: $el});
    });
  });

  /**
   * Renders the contents of a specific results pagination component.
   *
   * @param args
   *   The arguments object, can contain the following properties:
   *      data: data object from which to populate handlebars template variables (required),
   *      context: the parent component selector
   */
  function renderPagination(args) {
    // Don't attempt to render anything if we don't have new data.
    if (!args.data) {
      return;
    }

    // Render async with Twig.
    return twiggy('@molecules/pagination.twig')
        .then(template => template.renderAsync({pagination: args.data}))
        .then(markup => args.$el.html(markup))

    // Create new markup using handlebars template, helper.
    let markup = compiledTemplate(args.data);
    args.$el.html(markup);
  }

}(window,document,jQuery);
