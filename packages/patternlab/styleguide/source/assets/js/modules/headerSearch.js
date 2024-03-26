export default (function (window, document,$) {
    "use strict";

    $('.ma__header-search > form').each(function(){
        let $form = $(this);
        let $searchInput = $form.find('.ma__header-search__input');
        let $suggestions = $searchInput.next(".ma__header-search-suggestions");
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
        let timer;

        const openDropdown = () => {
            $searchInput.attr("aria-expanded", true);
            $suggestions.removeClass("hidden");
        }
        const closeDropdown = () => {
            $searchInput.attr("aria-expanded", false);
            $suggestions.addClass("hidden");
        }
        // On input value change, unhide or hide the suggestions.
        $searchInput.on('input', function() {
            clearTimeout(timer);
            const inputValue = $(this).val();
            const helper = `${optionsCount} search scope suggestions are available for ${inputValue}; to navigate, use up and down arrow keys on desktop; to select, use space or enter keys`;
            // when the input has value, show the suggestions
            if (inputValue) {
                $(".ma__header-search-suggestion-option-input").each(function() {
                    $(this).text(inputValue);
                })
                openDropdown();

                timer = setTimeout(function() {
                    // add a 2 second delay to avoid the status announcement getting cut off. 
                    $suggestions.find('.ma__header-search-suggestions-helper').text(helper);
                },2000);
                
            } // else, hide the suggestions
            else {
                closeDropdown();
            }
        });

        // hide the suggestions when input and suggestions lose focus
        // don't close the dropdown when the next element in focus is in the suggestions
        const handleBlur = () => {
            // Use a timeout to allow time for the suggestions to receive focus
            setTimeout(() => {
                if (!$suggestions[0].contains(document.activeElement)) {
                    closeDropdown();
                }
            }, 200);
        };
        $searchInput.on('blur', function() {
            handleBlur();
        })
        $options.on('blur', function() {
            handleBlur();
        })
        // when the input is in focus and has a value, show the suggestions
        $searchInput.on('focus', function() {
            const inputValue = $(this).val();
            if(inputValue) {
                openDropdown();
            }
        })

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
                    // loop through indices between 0 and optionsCount.
                    focusIndex = (focusIndex + optionsCount) % optionsCount;
                    setFocus(focusIndex);
                }
                // escape key hide the suggestions
                if (key(e).escape) {
                    closeDropdown();
                    $searchInput.focus();
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
  