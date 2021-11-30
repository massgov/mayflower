export default (function (document) {
    const button = document.getElementsByClassName('ma__brand-banner-container')[0];
    const toggle = button.getElementsByClassName('ma__brand-banner-button')[0];
    console.log('test')
    console.log(button)
    console.log(toggle)
    if(button && toggle) {
        console.log('true')
        button.onmouseover = function() {
            console.log('hover')
            toggle.classList.add("active");
        }
        button.onmouseout = function() {
            console.log('blur')
            toggle.classList.remove("active");
        }
        button.onclick = function() {
            console.log('clicked')
            toggle.classList.toggle("ma__button-icon--expanded");
            const expansionDiv = document.getElementsByClassName('ma__brand-banner-expansion')[0];
            expansionDiv.classList.toggle("ma__brand-banner-expansion--expanded");
        }
    }
  })(document);