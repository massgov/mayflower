// Adjust the position of bullets and numbers of lists after a floated element to avoid overwrapping in rich text.
const figureElements = document.querySelectorAll(".ma__rich-text .ma__figure");
// const orderedLists = document.querySelectorAll(".ma__rich-text ol");
// const unorderedLists = document.querySelectorAll(".ma__rich-text ul");

figureElements.forEach(function (figure) {
  let floatValue = window.getComputedStyle(figure, null).float;
  if(floatValue === "left" && figure.nextElementSibling.tagName !== "FIGURE") {
    // figure.style.
    console.log(figure.nextElementSibling.tagName);
  }
  // console.log(figure.nextElementSibling.tagName);
});