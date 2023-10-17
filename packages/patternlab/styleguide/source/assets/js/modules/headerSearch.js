export default (function (window, document,$) {
    "use strict";

    $('.ma__header-search').each(function(){
        let $searchInput = $(this).find('.ma__header-search__input');
        let $options = $(this).find('.ma__header-search-suggestion-option');
        console.log()
        console.log($options)
        let optionsCount = $options.length;
        var focusIndex = 0;
        // Add an event listener to the input element
        $searchInput.on('input', function() {
            let inputValue = $(this).val();
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
        $searchInput.keydown(function(e) {
            if (e.key === "ArrowDown" || e.code === "ArrowDown") {
                focusIndex = 0;
                $options[focusIndex].focus();
                $options[focusIndex].addClass('hover');
            }
            if (e.key === "ArrowUp" || e.code === "ArrowUp") { 
                focusIndex = [optionsCount -1];
                $options[focusIndex].focus();
                $options[focusIndex].addClass('hover');
            }
        });

        Array.from($options).forEach(function(option) {
            console.log(option)
            option.onkeydown = function (e) {
                if (e.key === "ArrowDown" || e.code === "ArrowDown") {
                    focusIndex += 1;
                    $options[focusIndex].focus();
                }
        
                if (e.key === "ArrowUp" || e.code === "ArrowUp") {
                    focusIndex -= 1;
                    $options[focusIndex].focus();
                }
            }
        });
    });

  })(window, document,jQuery);
  