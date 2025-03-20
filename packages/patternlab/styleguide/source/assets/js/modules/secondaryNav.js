export default (function (window, document, $) {

  const bpIsDesktop = window.matchMedia("(min-width: 941px)");
  const openClass = "is-open";

  // Watches for nav items wrapping, then toggles a class on the <nav> element.
  const resizeObserver = new ResizeObserver(([{target}]) => {
    const nav = target.closest("nav");
    if (target.lastElementChild.offsetTop > 0 && !nav.classList.contains("is-wrapped")) {
      nav.classList.add("is-wrapped");
    } else if (target.lastElementChild.offsetTop <= 0 && nav.classList.contains("is-wrapped")) {
      nav.classList.remove("is-wrapped");
    }
  });

  // Watches for the <nav> element class change, then dispatches a custom event.
  const classObserver = new MutationObserver(([{target}]) => {
    const wrapEvent = new CustomEvent("nav-wrap-change", {
      bubbles: true,
      cancelable: false,
      detail: {
        isWrapped: target.classList.contains("is-wrapped")
      }
    });
    target.dispatchEvent(wrapEvent);
  });

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
    const isBurger = $(nav).hasClass("ma__secondary-nav-hamburger__items");

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
      if (bpIsDesktop.matches && !isBurger) {
        clearTimeout(mouseleaveTimeouts.get(this));
        openDropdown($(this));
      }
    });

    $topItems.on("mouseleave", function (e) {
      if (bpIsDesktop.matches && !isBurger) {
        mouseleaveTimeouts.set(this, setTimeout(() => {
          closeDropdown($(this));
        }, 250));
      }
    });

    // Close dropdown on escape key.
    $topItems.on("keydown", function (e) {
      if (e.code === "Escape") {
        closeDropdown($(this), true);
      }
    });

    // Observe desktop nav for item wrapping, only above desktop breakpoint.
    if (bpIsDesktop.matches && !isBurger) {
      resizeObserver.observe(nav);
    }

    bpIsDesktop.addEventListener("change", () => {
      if (bpIsDesktop.matches && !isBurger) {
        resizeObserver.observe(nav);
      } else {
        resizeObserver.unobserve(nav);
      }
    });

    // Observe the <nav> element for class changes.
    classObserver.observe(nav.closest("nav"), {
      childList: false,
      subtree: false,
      attributes: true,
      attributeFilter: ["class"]
    });
  });

})(window, document, jQuery);
