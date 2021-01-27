// Adjust the position of bullets and numbers of lists after a floated figure
// component to avoid overwrapping in rich text.
//
// Note:  Left floated elements overwrap their followed list items, specifically
//        their bullets. The issue only occurs with left float.  The issue is not
//        fixable by adjusting left side spacing of those lists since the floated
//        element's right margin defines their positioning.
//        Solving the issue by adding extra right margin to left float figure
//        components without affecting the wrapping of following elements.

const leftFloatFigures = document.querySelectorAll(".ma__rich-text .ma__figure--left");

if (window.screen.width > 620) {
  addInlineMargin ();
}

window.addEventListener('resize', () => {
  if (window.screen.width > 620) {
    addInlineMargin ();
  } else {
    // Remove the inline style with no float with screen width under 620px.
    leftFloatFigures.forEach( (figure) => {
      if (figure.hasAttribute("style")) {
        figure.removeAttribute("style");
      }
    });
  }
});

function addInlineMargin () {
  leftFloatFigures.forEach( (figure) => {
    //  Check if no another figure component is a previous sibling.
    
    // In Drupal, rich text elements are spreaded into multiple .ma__rich-text
    // containers. Figure components are in their own .ma__rich-text containers.
    // They are never be with other components like lists and paragraphs in a
    // same container.
    if (!figure.parentElement.previousElementSibling.classList.contains("ma__figure")) {
      figure.style.cssText = "margin-right: 50px;";
    }

    // This is for Mayflower samples.
    // In Mayflower samples, one .ma__rich-text container contains all rich
    // text components in a section.
    if (!figure.previousElementSibling.classList.contains("ma__figure")) {
      if(!figure.nextElementSibling.classList.contains("ma__figure")) {
        figure.style.cssText = "margin-right: 50px;";
      }
    }
  });
}
