export default (function (window, document, $, undefined) {
  // Remaining character count.
  // Need to set up separate presentations for sighted and screen reader users
  // since aria-live is announced only container which contains a change.
  // It doesn't announce nested containers to provide context.

  $("textarea[maxlength]").each(function () {
    var $el = $(this);
    var maxlength = $el.attr("maxlength");

    var remaining = maxlength - $el.val().length;
    var message =
      '<div class="remainCharWrapper" aria-hidden="true"><span class="remainChar">' +
        remaining +
        "</span>/" +
        maxlength +
      "</div>";

    $el.wrap('<div class="ma__textarea__wrapper"></div>');

    // Generate ID for aria-live region.
    var randomId = Math.floor(Math.random() * 90000) + 10000;

    // Add a container for remaining char info.
    $el
      .parent()
      .append(
        message +
          '<span role="region" aria-live="polite" class="remainCharSR ma__visually-hidden" aria-hidden="true">' +
          remaining +
          " characters remaining</span>"
      );

    // Associate text area and remaining char info container for aria-live region.
    $el.attr("aria-controls", `${$el.attr("aria-controls")} ${randomId}`);
    $el.siblings(".remainCharSR").attr("id", randomId);

    $el.next(".remainCharSR").find(".remainChar").text(remaining);

    $el.on("keyup mouseup blur", function () {
      remaining = maxlength - $el.val().length;

      $el.next(".remainCharWrapper").find(".remainChar").text(remaining);
      $el.siblings(".remainCharSR").text(remaining + " characters remaining");
    });

    // only announce remaining characters in SR if the text area is in focus.
    $el.focus(function () {
      $el.siblings(".remainCharSR").attr('aria-hidden', false);
    })
    $el.blur(function () {
      $el.siblings(".remainCharSR").attr('aria-hidden', true);
    })
  });

  // number restricted input based on it's pattern (this must run prior to type="number")
  $('input[type="text"][pattern="[0-9]*"]').on("keydown", function (e) {
    // Allow: delte(46), backspace(8), tab(9), escape(27), enter(13) and space(32))
    if (
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 32]) !== -1 ||
      // Allow: Ctrl/cmd+A
      (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+C
      (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: Ctrl/cmd+X
      (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right
      (e.keyCode >= 35 && e.keyCode <= 39)
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105)
    ) {
      e.preventDefault();
    }
  });

  // number input type
  $('input[type="number"], .js-input-number').each(function () {
    const $el = $(this);
    const $plus = $(
      '<button type="button" aria-label="increase value" class="ma__input-number__plus"></button>'
    );
    const $minus = $(
      '<button type="button" aria-label="decrease value" class="ma__input-number__minus"></button>'
    );

    let value = $el.val();

    // if the input is not an html input and key restrictions
    if ($el.attr("type") !== "number") {
      $el.on("keydown", function (e) {
        // Allow: delte(46), backspace(8), tab(9), escape(27), enter(13) and .(110 & 190))
        if (
          $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
          // Allow: Ctrl/cmd+A
          (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
          // Allow: Ctrl/cmd+C
          (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
          // Allow: Ctrl/cmd+X
          (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
          // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)
        ) {
          // let it happen, don't do anything
          return;
        }
        // Ensure that it is a number and stop the keypress
        if (
          (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
          (e.keyCode < 96 || e.keyCode > 105)
        ) {
          e.preventDefault();
        }
      });
    }

    $plus.on("click", function () {
      let value = parseInt($el.val().trim(), 10);

      if (value !== value) {
        value = 0;
      }

      $el.val(value + 1);
    });

    $minus.on("click", function () {
      let value = parseInt($el.val(), 10);

      if (value !== value) {
        value = 0;
      }

      $el.val(value - 1);
    });

    $el.wrap('<div class="ma__input-number"></div>');

    $el.parent().append($plus, $minus);
  });
})(window, document, jQuery);
