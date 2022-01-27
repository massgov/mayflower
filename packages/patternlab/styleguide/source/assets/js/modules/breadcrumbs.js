export default (function (window, document, $) {
  let $breadcrumbsIndicator = $(".ma__breadcrumbs__item__expand-indicators");
  let $button = $(".js-breadcrumbs-button");
  let $breadcrumbItems = $(".ma__breadcrumbs__item");
  let $breadcrumbsContainer = $(".ma__breadcrumbs__container");
  let $breadcrumbs = $(".ma__breadcrumbs");
  let $breadcrumbItemsSlice = null;

  function drawBreadcrumbs() {
    let windowWidth = $(window).width();

    // Mobile display.
    if (windowWidth < 910 && !$breadcrumbs.hasClass('ma__breadcrumbs--mobile')) {
      $breadcrumbs.addClass('ma__breadcrumbs--mobile');
      $breadcrumbs.removeClass('ma__breadcrumbs--desktop');

      // Start by scrolling right if there are more items than the viewport allows.
      if ($breadcrumbsContainer[0].scrollWidth > $breadcrumbs.width() + 40) {
        setTimeout(() => {
          $breadcrumbsContainer.scrollLeft($breadcrumbsContainer[0].scrollWidth);
          $breadcrumbs.addClass('ma__breadcrumbs--mobile-scroll');
        }, 10);
      }

      // On breadcrumb scrolling, add or remove the left / right fading.
      $breadcrumbsContainer.on("scroll", function () {
        // Left fading
        if ($breadcrumbsContainer.scrollLeft() > 0) {
          $breadcrumbs.addClass("ma__breadcrumbs--fade-left");
        } else {
          $breadcrumbs.removeClass("ma__breadcrumbs--fade-left");
        }

        // Right fading
        var newScrollLeft = $breadcrumbsContainer.scrollLeft(),
          width = $breadcrumbsContainer.outerWidth(),
          scrollWidth = $breadcrumbsContainer.get(0).scrollWidth;
        if (scrollWidth - newScrollLeft - width < 1) { 
          $breadcrumbs.removeClass("ma__breadcrumbs--fade-right");
        } else {
          $breadcrumbs.addClass("ma__breadcrumbs--fade-right");
        }
      });

    //Desktop display.
    } else if (windowWidth >= 910 && !$breadcrumbs.hasClass('ma__breadcrumbs--desktop')){
      $breadcrumbsIndicator.removeAttr('hidden');
      $breadcrumbs.removeClass('ma__breadcrumbs--mobile');
      $breadcrumbs.addClass('ma__breadcrumbs--desktop');

      $breadcrumbItemsSlice = $breadcrumbItems.slice(2, $breadcrumbItems.length - 3);

      if ($breadcrumbItemsSlice.length) {
        $breadcrumbsIndicator.css("display", "inline-block");
        $breadcrumbItemsSlice.hide();

        let ariaControls = "";
        $breadcrumbItemsSlice.map(function () {
          ariaControls += $(this).attr("id") + " ";
        });

        $breadcrumbItemsSlice.attr("hidden", "");
        $button.attr("aria-expanded", "false");
        $button.attr("aria-pressed", "false");
        $button.attr("aria-controls", ariaControls);

        $button.on("click", function () {
          $breadcrumbsIndicator.hide();
          $breadcrumbsIndicator.attr("hidden", "");

          $breadcrumbItemsSlice.show();
          $breadcrumbItemsSlice.removeAttr("hidden");

          $button.attr("aria-expanded", "true");
          $button.attr("aria-pressed", "true");
          $button.attr("hidden", "");


        });

      } else {
        $breadcrumbsIndicator.remove();
      }
    }
  }

  if ($breadcrumbItems.length) {
    // In either case (mobile or desktop), move the indicator button to the right position to prevent CSS issues.
    $breadcrumbsIndicator.insertAfter($breadcrumbItems[1]);

    drawBreadcrumbs();

    $(window).resize(function () {
      setTimeout(function(){
        drawBreadcrumbs();
      }, 50);
    });
  }

})(window, document, jQuery);
