// Adjust the position of bullets and numbers of lists after a floated figure
// component to avoid overwrapping in rich text.
//
// Note:  Left floated elements overwrap their followed list items, specifically
//        their bullets. The issue only occurs with left float.  The issue is not
//        fixable by adjusting left side spacing of those lists since the floated
//        element's right margin defines their positioning.
//        Solving the issue by adding extra right margin to left float figure
//        components without affecting the wrapping of following elements.

const figureElements = document.querySelectorAll(".ma__rich-text .ma__figure");

if (window.screen.width > 620) {
  addInlineMargin ();
}

window.addEventListener('resize', () => {
  if (window.screen.width > 620) {
    addInlineMargin ();
  } else {
    // Remove the inline style with no float with screen width under 620px.
    figureElements.forEach( (figure) => {
      if (figure.hasAttribute("style")) {
        figure.removeAttribute("style");
      }
    });
  }
});

function addInlineMargin () {
  figureElements.forEach( (figure) => {
    if (!figure.previousElementSibling.classList.contains("ma__figure")) {
      let floatDirection = window.getComputedStyle(figure, null).float;

      if(floatDirection === "left" && !figure.nextElementSibling.classList.contains("ma__figure")) {
        figure.style.cssText = "margin-right: 50px;";
      }
    }
  });
}
