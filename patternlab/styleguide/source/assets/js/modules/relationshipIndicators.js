let wrappers = document.querySelectorAll('.ma__relationship-indicators--terms');


[].forEach.call(wrappers, function (terms) {

  let button = terms.querySelector('.js-relationship-indicator-button');
  let buttonCounter = button.querySelector('.tag-count');
  let tagState = button.querySelector('.tag-state');
  let tagText = tagState.textContent;
  let term = terms.querySelectorAll('.ma__relationship-indicators--term');
  let tagCount = term.length;

  if (tagCount > 1) {
    button.style.display = 'block';
    buttonCounter.innerHTML += tagCount - 1;
  }

  function showHideTags() {
    [].forEach.call(term, function (term) {
      if (term.offsetParent === null) {
        term.classList.add('open');
        term.style.display = 'block';
        return;
      }

      if (term.classList.contains('open')) {
        term.style.display = 'none';
        return;
      }
    });

    if (tagText == "more") {
      tagText = "fewer";
    } else {
      tagText = "more";
    }
  }


  button.addEventListener("click", function () {
    this.classList.toggle('is-open');
    showHideTags();
  })

});
