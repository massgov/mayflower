export default (function (window, document,$) {
    "use strict";

    $('.ma__header-search__input').each(function(){
        const $searchInput = $(this);
        // Add an event listener to the input element
        $searchInput.on('input', function() {
            var inputValue = $(this).val();
            if (inputValue) {
                $(".ma__header-search-suggestion-option-input").each(function() {
                    $(this).text(inputValue);
                })
                $searchInput.next(".ma__header-search-suggestions").removeClass("hidden");
                console.log(inputValue);
            } else {
                $searchInput.next(".ma__header-search-suggestions").addClass("hidden");
            }
        });
    });

  })(window, document,jQuery);
  