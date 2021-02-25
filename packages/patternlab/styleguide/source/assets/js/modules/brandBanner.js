export default (function (window,document) {
    var button = document.getElementsByClassName('ma__brand-banner-button')[0];
    button.onclick = function() {
        const expansionDiv = document.getElementsByClassName('ma__brand-banner-expansion')[0];
        expansionDiv.classList.toggle("ma__brand-banner-expansion--expanded");
    }
  })(window,document);