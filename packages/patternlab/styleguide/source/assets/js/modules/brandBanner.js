export default (function (document) {
    const button = document.getElementsByClassName('ma__brand-banner-container')[0];
    const toggle = button.getElementsByClassName('ma__brand-banner-button')[0];
    if(button && toggle) {
        button.onmouseover = function() {
            toggle.classList.add("active");
        }
        button.onmouseout = function() {
            toggle.classList.remove("active");
        }
        button.onclick = function() {
            toggle.classList.toggle("ma__button-icon--expanded");
            const expansionDiv = document.getElementsByClassName('ma__brand-banner-expansion')[0];
            expansionDiv.classList.toggle("ma__brand-banner-expansion--expanded");
        }
    }
  })(document);