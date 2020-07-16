/**
  * Get outerHTML of elements, taking care
  * of SVG elements in IE as well.
  *
  * @param {Element} DOM object
  * @return {String}
  */

export default function (el) {
  if (el.outerHTML) {
    return el.outerHTML
  }
  else {
    let container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}
