export default (function (window, document, $, undefined) {
  if ($('.js-pagination').length === 0) {
    return;
  }

  // Set up global component config
  let prevButton = '.js-pagination-prev',
    nextButton = '.js-pagination-next',
    pageButton = '.js-pagination-page';

  $('.js-pagination').each(function () {
    let $el = $(this);
    let targetPageNumber = 1;
    let params = new URLSearchParams(window.location.search);
    if (history.state && history.state.page) {
      targetPageNumber = history.state.page;
    } else if (params.has('_page')) {
      targetPageNumber = params.get('_page');
    }
    targetPageNumber = normalizePageNumber(targetPageNumber);

    // Listen for previous page button click and trigger pagination event.
    $el.on('click', prevButton, function () {
      targetPageNumber = normalizePageNumber(targetPageNumber) - 1;
      pushPaginationState(targetPageNumber);
      $el.trigger('ma:Pagination:Pagination', [history.state.page]);
    });
    // Listen for next button click and trigger pagination event.
    $el.on('click', nextButton, function () {
      targetPageNumber = normalizePageNumber(targetPageNumber) + 1;
      pushPaginationState(targetPageNumber);
      $el.trigger('ma:Pagination:Pagination', [history.state.page]);
    });
    // Listen for page number button click and trigger pagination event;
    $el.on('click', pageButton, function (e) {
      targetPageNumber = normalizePageNumber($(e.target).data('page'));
      pushPaginationState(targetPageNumber);
      $el.trigger('ma:Pagination:Pagination', [history.state.page]);
    });

    window.onpopstate = function (e) {
      if (e.state) {
        if (e.state.page) {
          $el.trigger("ma:Pagination:Pagination", [normalizePageNumber(e.state.page)]);
        }
      }
    };

    // Listen for new data, render new pagination.
    $el.on('ma:Pagination:DataUpdated', function (e, data) {
      renderPagination({ data: data, $el: $el });
    });

    // if we already have a state or a query parameter, initialize things
    pushPaginationState(targetPageNumber, true);
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

    // Truncate the pagination with ellipsis to prevent it from showing
    // all page numbers if there are a lot.
    let pagination = truncatePaginationDisplay(args.data);
    const $container = $('<nav class="ma__pagination__container" aria-label="Pagination Navigation"></nav>');
    $container.append(buildPaginationLink({
      className: 'ma__pagination__prev js-pagination-prev',
      text: pagination.prev.text,
      disabled: pagination.prev.disabled,
      ariaLabel: `Go to ${String(pagination.prev.text)} page`
    }));

    pagination.pages.forEach(function(page) {
      if (page.text === "spacer") {
        $container.append('<span class="ma__pagination__spacer">&hellip;</span>');
        return;
      }

      const pageText = String(page.text);
      $container.append(buildPaginationLink({
        className: 'ma__pagination__page js-pagination-page',
        text: pageText,
        isActive: page.active,
        dataPage: pageText,
        ariaLabel: page.active ? `Currently on Page ${pageText}` : `Go to Page ${pageText}`
      }));
    });

    $container.append(buildPaginationLink({
      className: 'ma__pagination__next js-pagination-next',
      text: pagination.next.text,
      disabled: pagination.next.disabled,
      ariaLabel: `Go to ${String(pagination.next.text)} page`
    }));

    args.$el.empty().append($container);
  }

  function buildPaginationLink(args) {
    const $link = $('<a role="button" href="#"></a>')
      .addClass(args.className)
      .text(String(args.text));

    if (args.dataPage) {
      $link.attr('data-page', args.dataPage);
    }
    if (args.isActive) {
      $link.addClass('is-active');
    }
    if (args.disabled) {
      $link.attr('aria-disabled', 'true').addClass('disabled');
    }
    else {
      $link.attr('aria-label', args.ariaLabel);
    }
    return $link;
  }

  /**
   * Returns a truncated version of the pagination structure.
   *
   * @param data
   *   The the pagination data to transform.
   */
  function truncatePaginationDisplay(data) {
    if (!data) {
      return;
    }

    let truncatedPagination = data,
      current = data.currentPage,
      last = data.totalPages,
      delta = 1;

    // For the first and last pages, set the delta to 2 so 2 page numbers
    // within the current page can be shown.
    if (current === 1 || current === last) {
      delta = 2;
    }

    let left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithEllipsis = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i < right) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithEllipsis.push({ text: l + 1, active: false });
        }
        else if (i - l !== 1) {
          rangeWithEllipsis.push({ text: 'spacer', active: false });
        }
      }

      let active = false;
      if (i === current) {
        active = true;
      }
      rangeWithEllipsis.push({ text: i, active: active });
      l = i;
    }

    truncatedPagination.pages = rangeWithEllipsis;

    return truncatedPagination;
  }

  function pushPaginationState(pageNum, replace = false) {
    pageNum = normalizePageNumber(pageNum);
    let params = new URLSearchParams(window.location.search);
    params.set('_page', pageNum);

    if (replace) {
      history.replaceState(
        { page: pageNum },
        `${document.title} | page ${pageNum}`, `${window.location.origin}${window.location.pathname}?${params.toString()}`
      );
    }
    else {
      history.pushState(
        { page: pageNum },
        `${document.title} | page ${pageNum}`, `${window.location.origin}${window.location.pathname}?${params.toString()}`
      );
    }
  }

  function normalizePageNumber(pageNum) {
    let parsed = parseInt(pageNum, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
  }

})(window, document, jQuery);
