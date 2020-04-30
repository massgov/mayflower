/**
 * Adjust width of horizontal lists to prevent single items on lines by themselves.
 */
function preventWidows($list) {
  // Get array of list items, but not whitespace nodes.
  const $items = Array.from($list.childNodes).filter(function(node) {
    return node.nodeType == Node.ELEMENT_NODE;
  });

  const itemCount = $items.length;

  for(var i = 0; i < itemCount; i++) {
    $items[i].classList.remove('expand-left');
    $items[i].classList.remove('expand-right');
  }

  // Assuming that all items have the same width and margins.
  // If they can ever be different, this will need rewriting
  // to calculate the widths of all items individually.
  const itemStyle = window.getComputedStyle($items[0]);
  const itemWidth = 
    parseFloat(itemStyle.marginLeft) +
    parseFloat(itemStyle.paddingLeft) +
    parseFloat(itemStyle.width) +
    parseFloat(itemStyle.paddingRight) +
    parseFloat(itemStyle.marginRight)
  ;

  const listStyle = window.getComputedStyle($list);
  const listWidth =
    parseFloat(listStyle.width) -
    parseFloat(listStyle.borderLeft) - 
    parseFloat(listStyle.paddingLeft) -
    parseFloat(listStyle.paddingRight) -
    parseFloat(listStyle.borderRight)
  ;

  const itemsPerRow = Math.floor(listWidth / itemWidth);

  // Widows are okay if there are only two items across.
  if(itemsPerRow < 3) {
    return;
  }

  const itemsInLastRow = itemCount % itemsPerRow;

  if(itemsInLastRow !== 1) {
    return;
  }
  
  // The item third from the end gets expanded right margin.
  $items[itemCount - 1 - 2].classList.add('expand-right');
  // The first item in the last (formerly) full row gets expanded left margin.
  $items[itemCount - 1 - itemsPerRow].classList.add('expand-left');
}

/**
 * Prevent widows now and on all future window resizes.
 */
function preventWidowsForever($list) {

  var timeout = false;

  preventWidows($list);

  window.addEventListener('resize', function() {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(
      function() {
        preventWidows($list);
      },
      250
    );
  });
}

export default (function (window, document, undefined) {
  const $horizontalLists = document.querySelectorAll('.ma__horizontal-list');
  const length = $horizontalLists.length;

  for(var i = 0; i < length; i++) {
    preventWidowsForever($horizontalLists[i]);
  }
})(window, document);
  