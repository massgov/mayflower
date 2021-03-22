/**
 * @file
 * Adjust the position of bullets and numbers of lists after a floated figure.
 */

// Component or image to avoid overwrapping in rich text.
//
// Note:  Left floated elements overwrap their followed list items, specifically
//        their bullets. The issue only occurs with left float.  The issue is not
//        fixable by adjusting left side spacing of those lists since the floated
//        element's right margin defines their positioning.
//        Solving the issue by adding extra right margin to left float components
//        without affecting the wrapping feature of their following elements.
const leftFloatFigures = document.querySelectorAll(".ma__rich-text .ma__figure--left:not(.ma__figure--x-small)");
const leftFloatFiguresXSmall = document.querySelectorAll(".ma__rich-text .ma__figure--left.ma__figure--x-small");
const leftFloatImages = document.querySelectorAll(".ma__rich-text article.align-left");

if (window.screen.width > 620) {
  addInlineMargin();
}

if (window.screen.width > 480) {
  addInlineMarginXSmall();
}

window.addEventListener('resize', () => {
  if (window.screen.width > 480) {
    addInlineMarginXSmall();
  }
  else {
    // Remove the inline style with no float with screen width under 620px.
    leftFloatFiguresXSmall.forEach((figure) => {
      if (figure.hasAttribute("style")) {
        figure.removeAttribute("style");
      }
    });
  }

  if (window.screen.width > 620) {
    addInlineMargin();
  }
else {
    // Remove the inline style with no float with screen width under 620px.
    leftFloatFigures.forEach((figure) => {
      if (figure.hasAttribute("style")) {
        figure.removeAttribute("style");
      }
    });

    leftFloatImages.forEach((image) => {
      if (image.hasAttribute("style")) {
        image.removeAttribute("style");
      }
    });
  }
});

function addInlineMargin() {
  // Figure components.
  leftFloatFigures.forEach((figure) => {
    // Check if the previous sibling is not figure component.
    if (figure.nextElementSibling !== null && figure.nextElementSibling.classList.contains("ma__rich-text")) {
      figure.nextElementSibling.childNodes.forEach((childNode) => {
        if (childNode !== null && childNode.nodeName === "UL") {
          figure.style.cssText = "margin-right: 50px;";
        }
      });
    }
  });

  // Article image embed.
  leftFloatImages.forEach((image) => {
    image.style.cssText = "margin-right: 50px;";
  });
}

function addInlineMarginXSmall() {
  // Figure components.
  leftFloatFiguresXSmall.forEach((figure) => {
    // Check if the previous sibling is not figure component.
    if (figure.nextElementSibling !== null && figure.nextElementSibling.classList.contains("ma__rich-text")) {
      figure.nextElementSibling.childNodes.forEach((childNode) => {
        if (childNode !== null && childNode.nodeName === "UL") {
          figure.style.cssText = "margin-right: 50px;";
        }
      });
    }
  });
}
