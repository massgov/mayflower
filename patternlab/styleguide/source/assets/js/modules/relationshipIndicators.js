let wrappers = document.querySelectorAll('.ma__relationship-indicators--terms');


[].forEach.call(wrappers, function (terms) {

  const button = terms.querySelector('.js-relationship-indicator-button');
  const buttonCounter = button.querySelector('.tag-count');
  const buttonState = button.querySelector('.tag-state');
  let term = terms.querySelectorAll('.ma__relationship-indicators--term');
  let tagCount = term.length;

  // Not included with optimize code.
  // tag count udpates still coming from 'headerTags.js'
  if (tagCount > 1) {
    button.style.display = 'block';
    buttonCounter.innerHTML += tagCount - 1;
  }

  function showHideTags() {
    [].forEach.call(term, function (term) {
      if (term.offsetParent === null) {
        term.classList.add('open');
        term.style.display = 'block';
        terms.querySelector('.wrapped-link a').focus();
        return;
      }

      if (term.classList.contains('open')) {
        term.style.display = 'none';
        return;
      }
    });
  }


  button.addEventListener("click", function () {
    let state = buttonState.innerHTML;

    if (state == "more") {
      state = "fewer"
    }
    else {
      state = "more";
    }
    buttonState.innerHTML = state;

    this.classList.toggle('is-open');
    showHideTags();

  })

});
