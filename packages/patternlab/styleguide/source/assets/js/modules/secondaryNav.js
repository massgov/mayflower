export default (function (window, document, $) {

  const bpIsDesktop = window.matchMedia("(min-width: 941px)");
  const openClass = "is-open";

  function openDropdown($item) {
    $item.addClass(openClass);
    $item.siblings().removeClass(openClass);
    $item.find(".js-secondary-nav-trigger").attr("aria-expanded", "true");
  }

  function closeDropdown($item, focusTrigger = false) {
    $item.removeClass(openClass);
    $item.find(".js-secondary-nav-trigger").attr("aria-expanded", "false");

    if (focusTrigger) {
      $item.find(".js-secondary-nav-trigger").focus();
    }
  }

  function toggleDropdown($item, focusTrigger = false) {
    if ($item.hasClass(openClass)) {
      closeDropdown($item, focusTrigger);
    } else {
      openDropdown($item);
    }
  }

  $(".js-secondary-nav").each(function (i, nav) {
    // Expose buttons to AT users when JS is enabled.
    const $toggleTriggers = $(nav).find(".js-secondary-nav-trigger");
    $toggleTriggers.removeAttr("aria-hidden");

    // Toggle submenu when trigger button is clicked.
    $toggleTriggers.on("click", function (e) {
      toggleDropdown($(this).closest(".js-secondary-nav-top-item"));
    });

    // Toggle submenu on hover when on desktop.
    const $topItems = $(nav).find(".js-secondary-nav-top-item");
    let mouseleaveTimeouts = new Map();

    $topItems.on("mouseenter", function (e) {
      if (bpIsDesktop.matches) {
        clearTimeout(mouseleaveTimeouts.get(this));
        openDropdown($(this));
      }
    });

    $topItems.on("mouseleave", function (e) {
      if (bpIsDesktop.matches) {
        mouseleaveTimeouts.set(this, setTimeout(() => {
          closeDropdown($(this));
        }, 250));
      }
    });

    $topItems.on("keydown", function (e) {
      if (e.code === "Escape") {
        closeDropdown($(this), true);
      }
    });
  });

})(window, document, jQuery);
