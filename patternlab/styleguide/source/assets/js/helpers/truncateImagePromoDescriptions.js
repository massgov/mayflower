export default (function (window,document,$,undefined) {
  "use strict";

  $('.ma__image-promo__description').each(function(i, description) {
    const $description = $(description);
    const totalAllowedCharacters = 350;
    const characterThreshold = 15;

    // `listing.js` nests an `.ma__rich-text` inside another one, so
    // we can't trust that the paragraphs will be the first-level child
    const $paragraphs = $description.children('.ma__rich-text').find('p');
    var cumulativeCharacters = 0;
    var previousCharacters = 0;
    var allRemainingParagraphsHidden = false;
    var anythingIsHidden = false;
    var atLeastPartiallyHiddenParagraphs = [];

    $paragraphs.each(function(j, paragraph) {
      const $paragraph = $(paragraph);

      if (allRemainingParagraphsHidden) {
        $paragraph.addClass('ma__visually-hidden');
        atLeastPartiallyHiddenParagraphs.push($paragraph);
        anythingIsHidden = true;
        return;
      }

      const paragraphText = $(paragraph).text()
      let currentCharacters = paragraphText.length;

      cumulativeCharacters += currentCharacters;

      if (cumulativeCharacters > totalAllowedCharacters) {
        // Even if this paragraph is completely visible when collapsed, nothing after this should be.
        allRemainingParagraphsHidden = true;
        let currentAllowedCharacters = totalAllowedCharacters - previousCharacters;
        let allowedText = paragraphText.slice(0, currentAllowedCharacters).split(' ').slice(0, -1).join(' ');

        // previousCharacters should not be used beyond this point.
        previousCharacters += currentCharacters;

        // Don't hide a tiny paragraph or a tiny part of one.
        if (
          paragraphText.length < characterThreshold ||
          paragraphText.length - allowedText.length < characterThreshold
        ) {
          return;
        }

        // Anything that makes it past here will be at least partially hidden.
        atLeastPartiallyHiddenParagraphs.push($paragraph);
        
        // Don't show only a tiny amount of a longer paragraph.
        if (allowedText.length < characterThreshold) {
          $paragraph.addClass('ma__visually-hidden');
          anythingIsHidden = true;
          return;
        }

        // Neither the whole paragraph nor the visible part is tiny.
        // So, wrap the two parts in spans.
        const hiddenText = paragraphText.slice(allowedText.length + 1);
        $paragraph.html(`<span class="ma__image-promo__truncated">${allowedText}</span> <span class="ma__visually-hidden">${hiddenText}</span>`);

        anythingIsHidden = true;
      }
    });

    if (anythingIsHidden) {
      $description.addClass('ma__collapsed');
      const moreButton = $(`<button class="ma__image-promo__more-button"><span class="visually-hidden">Show </span>more</button>`).get(0);
      const lessButton = $(`<button class="ma__image-promo__less-button"><span class="visually-hidden">Show </span>less</button>`).get(0);
      atLeastPartiallyHiddenParagraphs[0].append(moreButton);
      atLeastPartiallyHiddenParagraphs.reverse()[0].append(lessButton);

      $([moreButton, lessButton]).on('click', function(e) {
        $description.toggleClass('ma__collapsed');
        e.stopPropagation();
      });
    }
    
  });
}).bind(null,window,document,jQuery);
