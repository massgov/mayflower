export default (function (document) {
    const button = document.getElementsByClassName('ma__brand-banner-button')[0];
    button.onclick = function() {
        this.classList.toggle("ma__button-icon--expanded");
        const expansionDiv = document.getElementsByClassName('ma__brand-banner-expansion')[0];
        expansionDiv.classList.toggle("ma__brand-banner-expansion--expanded");
    }
  })(document);