export default (function (document) {
    const button = document.getElementsByClassName('ma__brand-banner-container')[0];
    const toggle = button && button.getElementsByClassName('ma__brand-banner-button')[0];
    if(toggle) {
        button.setAttribute('aria-controls', 'ma__brand-banner-content');
        button.setAttribute('aria-expanded', false);
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
            const expanded = button.getAttribute("aria-expanded") == 'true';
            button.setAttribute('aria-expanded', !expanded);
        }
    }
  })(document);