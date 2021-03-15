// Adjust the position of bullets and numbers of lists after a floated figure
// component or image to avoid overwrapping in rich text.
//
// Note:  Left floated elements overwrap their followed list items, specifically
//        their bullets. The issue only occurs with left float.  The issue is not
//        fixable by adjusting left side spacing of those lists since the floated
//        element's right margin defines their positioning.
//        Solving the issue by adding extra right margin to left float components
//        without affecting the wrapping feature of their following elements.

const leftFloatFigures = document.querySelectorAll(".ma__rich-text .ma__figure--left");
// const leftFloatImageFigures = document.querySelectorAll(".ma__rich-text .ma__figure--left.ma__image.ma__figure--x-small");
// const rightFloatFigures = document.querySelectorAll(".ma__rich-text .ma__figure--right");
const leftFloatImages = document.querySelectorAll(".ma__rich-text article.align-left");

if (window.screen.width > 620) {
  addInlineMargin ();
  // addInlineImageMargin (leftFloatFigures, "right");
  // addInlineImageMargin (leftFloatImages, "right");
}

// if (window.screen.width > 480) {
//   addInlineImageMargin (leftFloatImageFigures, "right");
//   addInlineImageMargin (rightFloatFigures, "left");
// }

window.addEventListener('resize', () => {
  if (window.screen.width > 620) {
    addInlineMargin ();
    // addInlineImageMargin (leftFloatFigures, "right");
    // addInlineImageMargin (leftFloatImages, "right");
  } else {
    // Remove the inline style with no float with screen width under 620px.
    leftFloatFigures.forEach( (figure) => {
      if (figure.hasAttribute("style")) {
        figure.removeAttribute("style");
      }
    });

    leftFloatImages.forEach( (image) => {
      if (image.hasAttribute("style")) {
        image.removeAttribute("style");
      }
    });
    // removeInlineImageMargin(leftFloatFigures);
    // removeInlineImageMargin(leftFloatImages);
  }

  // if (window.screen.width > 480) {
  //   addInlineMargin ();
  //   addInlineImageMargin(leftFloatImageFigures, "right");
  //   addInlineImageMargin(rightFloatFigures, "left");
  // } else {
  //   // Remove the inline style with no float with screen width under 481px.
  //   removeInlineImageMargin(leftFloatImageFigures);
  //   removeInlineImageMargin(rightFloatFigures);

  // }
});

function addInlineImageMargin () {
// function addInlineImageMargin (el, direction) {
  // Figure components
  if (!figure.parentElement.previousElementSibling.classList.contains("ma__figure")) {
    figure.style.cssText = "margin-right: 50px;";
  }
  // el.forEach( (figure) => {
  //   //  Check if the previous sibling is not figure component.
  //   if (figure.parentElement.previousElementSibling !== null && !figure.parentElement.previousElementSibling.classList.contains("ma__figure")) {
  //     figure.style.cssText = "margin-" + direction + ": 50px;";
  //   }
  // });

  // article image embed
  leftFloatImages.forEach( (image) => {
    image.style.cssText = "margin-right: 50px;";
  });
  // el.forEach( (image) => {
  //   image.style.cssText = "margin-" + direction + ": 50px;";
  // });
}

// function removeInlineImageMargin (el) {
//   el.forEach( (figure) => {
//     if (figure.hasAttribute("style")) {
//       figure.removeAttribute("style");
//     }
//   });

//   el.forEach( (image) => {
//     if (image.hasAttribute("style")) {
//       image.removeAttribute("style");
//     }
//   });
// }
