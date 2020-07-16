// ****** basic custom select that uses mobile select keyboard ******
let dropdownMenu = document.querySelectorAll(".js-dropdown");

if(null !== dropdownMenu){

  let length = dropdownMenu.length;

  for (let i = 0; i < length; i++ ) {
    let parentEl = dropdownMenu[i],
        selectEl = parentEl.querySelector(".js-dropdown-select"),
        link = parentEl.querySelector(".js-dropdown-link")

    if(null === selectEl || null === link) {
      break;
    }

    selectEl.onchange = function() {
      let elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
      link.innerText = elem.text || elem.options[elem.selectedIndex].text;
    }
  }
}
