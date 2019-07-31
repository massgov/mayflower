export default (function (window,document,$,undefined) {
  "use strict";

  $('.ma__image-promo__description').each(function(descriptionIndex, description) {
    const $description = $(description);
    const $richTextContainer = $description.find('.ma__rich-text').last();
    const totalAllowedCharacters = 350;

    // Number of characters to not bother hiding or showing by themselves.
    const characterThreshold = 15;

    var cumulativeCharacters = 0;
    var previousCharacters = 0;
    var allRemainingParagraphsHidden = false;
    var anythingIsHidden = false;

    // The "More" link should go inside the last paragraph with visible text, and
    // the "Less" link should go in the last paragraph altogether; we need to keep 
    // up with the state of all paragraphs to do this correctly.
    var $partiallyHiddenParagraph = false;
    var completelyHiddenParagraphs = [];

    // Get all DOM nodes from the field and convert <br>s to <p>s.
    const paragraphs = convertBreaksToParagraphs($richTextContainer.contents());

    const paragraphsLength = paragraphs.length;
    const $paragraphsContainer = $('<div></div>');

    for(var i = 0; i < paragraphsLength; i++) {
      $paragraphsContainer.append(paragraphs[i]);
    }

    // Replace the existing nodes with the generated <p> elements.
    $richTextContainer.html($paragraphsContainer);

    $paragraphsContainer.children().each(function(paragraphIndex, paragraph) {
      const $paragraph = $(paragraph);

      // Hide this and move on to next iteration if previous iterations already
      // exceeded character limit.
      if (allRemainingParagraphsHidden) {
        $paragraph.addClass('ma__visually-hidden');
        completelyHiddenParagraphs.push($paragraph);
        anythingIsHidden = true;
        return;
      }

      const paragraphText = $(paragraph).text()
      let currentCharacters = paragraphText.length;

      cumulativeCharacters += currentCharacters;

      if (cumulativeCharacters > totalAllowedCharacters) {
        // Even if this paragraph is completely visible when collapsed,
        // nothing after this should be.
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
        
        // Don't show only a tiny amount of a longer paragraph.
        if (allowedText.length < characterThreshold) {
          $paragraph.addClass('ma__visually-hidden');
          completelyHiddenParagraphs.push($paragraph);
          anythingIsHidden = true;
          return;
        }

        // Neither the whole paragraph nor the visible part is tiny.
        // So, wrap the two parts in spans.
        $partiallyHiddenParagraph = $paragraph;
        const hiddenText = paragraphText.slice(allowedText.length + 1);
        $paragraph.html(`<span class="ma__image-promo__truncated">${allowedText}</span><span class="ma__visually-hidden"> ${hiddenText}</span>`);

        anythingIsHidden = true;
      }
    });

    if (anythingIsHidden) {
      $description.addClass('ma__collapsed');
      const moreButton = $(`<button class="ma__image-promo__more-button"><span class="visually-hidden">Show </span>more</button>`).get(0);
      const lessButton = $(`<button class="ma__image-promo__less-button"><span class="visually-hidden">Show </span>less</button>`).get(0);

      // Append the "More" button to the last paragraph with visible text.
      if($partiallyHiddenParagraph) {
        $partiallyHiddenParagraph.append(moreButton);
      } else {
        completelyHiddenParagraphs[0].prev().append(moreButton);
      }

      // Append the "Less" button to the last paragraph, period.
      if(completelyHiddenParagraphs.length) {
        completelyHiddenParagraphs.reverse()[0].append(lessButton);
      } else {
        $partiallyHiddenParagraph.append(lessButton);
      }

      $([moreButton, lessButton]).on('click', function(e) {
        $description.toggleClass('ma__collapsed');

        // Don't activate the click event for the Google Map.
        e.stopPropagation();
      });
    }
    
  });
}).bind(null,window,document,jQuery);

/**
 * Convert a group of DOM nodes with <br>s to <p>s.
 * 
 * Can handle a mixture of text nodes, <br>s, and <p>s, 
 * but not any other tags or node types.
 */
var convertBreaksToParagraphs = (function($, nodes) {
  const length = nodes.length;
  var currentParagraphText = '';
  var paragraphs = [];

  for(var i = 0; i < length; i++) {
    let node = nodes[i];

    if (node.nodeType === Node.ELEMENT_NODE) {
      // Whether this is a <p> or a <br>, all loose text before this should
      // be turned into a new paragraph.
      if (currentParagraphText.trim() !== '') {
        paragraphs.push($(`<p>${currentParagraphText}</p>`));
        currentParagraphText = '';
      }

      // If this is a paragraph, also push this node.
      if (node.tagName.toLowerCase() === 'p') {
        paragraphs.push(node);
      }
    }

    // If this is loose text, put it in a running variable, and wait for the next
    // opportunity to print it all out as a paragraph.
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.data.trim() !== '') {
        currentParagraphText += ` ${node.data}`;
      }
    }
  }

  // Any remaining loose text should be in one final paragraph.
  if (currentParagraphText.trim() !== '') {
    paragraphs.push($(`<p>${currentParagraphText}</p>`));
  }

  return paragraphs;
}).bind(null, jQuery);