export default (function (window, document,$) {
    "use strict";

    $('.ma__header-search__input').each(function(){
        let $searchInput = $(this);
        let options = document.querySelectorAll(".ma__header-search-suggestion-option");
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
        $searchInput.on('keyDown', function(e) {
            console.log(options)
            if (e.key === "ArrowDown" || e.code === "ArrowDown") {
                options[0].focus();
            }
            if (e.key === "ArrowUp" || e.code === "ArrowUp") { 
                options[options.length() -1].focus()
            }
        });

    //   options.forEach((option) => {
    //     option.addEventListener("keydown", function (e) {
    //       let targetParent = e.target.closest(".js-main-nav-hamburger__subitem");
  
    //       if (e.key === "ArrowDown" || e.code === "ArrowDown") {
    //         if (targetParent.nextElementSibling) {
    //           targetParent.nextElementSibling.querySelector("a").focus();
    //         } else {
    //           // Set focus on the first sibling submenu item option.
    //           document
    //             .querySelector(
    //               ".js-main-nav-hamburger-content:not(.is-closed) .js-main-nav-hamburger__subitem:first-of-type a"
    //             )
    //             .focus();
    //         }
    //       }
  
    //       if (e.key === "ArrowUp" || e.code === "ArrowUp") {
    //         if (targetParent.previousElementSibling) {
    //           targetParent.previousElementSibling.querySelector("a").focus();
    //         } else {
    //           // Set focus on the last sibling submenu item option.
    //           document
    //             .querySelector(
    //               ".js-main-nav-hamburger-content:not(.is-closed) .js-main-nav-hamburger__subitem:last-of-type a"
    //             )
    //             .focus();
    //         }
    //       }
    //     });
    //   });
    });

  })(window, document,jQuery);
  