let wrappers = document.querySelectorAll('.ma__relationship-indicators--terms');


[].forEach.call(wrappers, function (terms) {

  let button = terms.querySelector('.js-relationship-indicator-button');
  let buttonCounter = button.querySelector('.tag-count');
  let tagState = button.querySelector('.tag-state');
  let term = terms.querySelectorAll('.ma__relationship-indicators--term');
  let tagCount = term.length;

  if (tagCount > 1) {
    button.style.display = 'block';
    buttonCounter.innerHTML += tagCount - 1;
  }

  [].forEach.call(term, function (term) {
    if (term.offsetParent === null) {
      term.classList.add('closed')
    }
  });

});
