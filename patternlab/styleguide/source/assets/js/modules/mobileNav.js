// ****** Menu button ******
let menuButton = document.querySelector(".js-header-menu-button");

if(null !== menuButton){
  menuButton.addEventListener("click", function(event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

// ****** Main Header Search button on mobile should open the mobile menu  ******
let searchForm = document.querySelector(".js-header-search-menu .js-header-search-form");

if(null !== searchForm){
  searchForm.addEventListener("submit", function(event) {
    if(window.innerWidth > 620) {
      return;
    }
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}


