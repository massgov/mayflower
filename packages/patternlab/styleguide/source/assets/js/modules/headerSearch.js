export default (function (window, document,$) {
    "use strict";

    $('.ma__header-search > form').each(function(){
        let $form = $(this);
        let $searchInput = $form.find('.ma__header-search__input');
        let $options = $form.find('.ma__header-search-suggestion-option');
        let optionsCount = $options.length;
        let focusIndex = 0;
        let key = (e) => ({
            arrowDown: e.key === "ArrowDown" || e.code === "ArrowDown",
            arrowUp: e.key === "ArrowUp" || e.code === "ArrowUp",
            escape: e.key === "Escape" || e.code === "Escape",
        });
        let setFocus = function(index) {
            $options[index].focus();
            $options.removeClass('hover');
            $options[index].classList.add('hover');
        }
        // On input value change, unhide or hide the suggestions.
        $searchInput.on('input', function() {
            let inputValue = $(this).val();
            // when the input has value, show the suggestions
            if (inputValue) {
                $(".ma__header-search-suggestion-option-input").each(function() {
                    $(this).text(inputValue);
                })
                $searchInput.attr("aria-expanded", true);
                $searchInput.next(".ma__header-search-suggestions").removeClass("hidden");
            } // else, hide the suggestions
            else {
                $searchInput.attr("aria-expanded", false);
                $searchInput.next(".ma__header-search-suggestions").addClass("hidden");
            }
        });
        // keydown from input move focus into the suggestion options
        $searchInput.keydown(function(e) {
            if (key(e).arrowDown) {
                focusIndex = 0;
                setFocus(focusIndex);
            }
            if (key(e).arrowUp) { 
                focusIndex = [optionsCount -1];
                setFocus(focusIndex);
            }
        });

        // transform org name to value
        const slugify = (string = '') => (
            string.trim().replace(/[\s_]+/g, '-').toLowerCase().replace(/[^a-z\d-]/g, '')
        );
        Array.from($options).forEach(function(option) {
            option.onkeydown = function (e) {
                // keyup and keydown loop through the options
                if (key(e).arrowDown || key(e).arrowUp) {
                    // prevent scrolling the page
                    e.preventDefault();
                    key(e).arrowDown ? focusIndex += 1 : focusIndex -= 1;
                    // loop through indices between 0 and optionsCount -1
                    focusIndex = (focusIndex + optionsCount) % optionsCount;
                    setFocus(focusIndex);
                }
                // escape key hide the suggestions
                if (key(e).escape) {
                    $searchInput.attr("aria-expanded", false);
                    $searchInput.next(".ma__header-search-suggestions").addClass("hidden");
                }
            }
            // on option button click, append the search parameter to the form and submits it
            option.onclick = function(){
                const optionText = $(option).find(".ma__header-search-suggestion-option-scope-value").text();
                const optionValue = slugify(optionText);
                if (optionText && optionText.length > 0) {
                    $form.append(`<input type="hidden" name="org" value=${optionValue} />`);
                }
                $form.submit();
            }
        });
    });

  })(window, document,jQuery);
  