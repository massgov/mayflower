const menuButton = document.querySelector(".js-header-menu-button");

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}




const contextualNavLinks = document.querySelectorAll(".ma__contextual-navigation--anchor");
const currentLocation = window.location.href;

contextualNavLinks.forEach(function (navLink, index) {

  let navLinkHref = navLink.getAttribute("href");

  if (navLinkHref == currentLocation) {
    navLink.parentNode.remove();
  }
});

const contextualMenuButton = document.querySelectorAll('.ma__contextual-navigation__nav-wrapper .js-main-nav-toggle');

if (null !== contextualMenuButton) {
  contextualMenuButton.forEach(function () {

    this.addEventListener('click', function () {

      document.querySelector("body").classList.toggle("show-submenu");


      let submenu = document.querySelector('.js-main-nav-content');
      if (submenu.classList.contains('is-closed')) {
        submenu.className += ' is-open';
        submenu.classList.remove('is-closed');
      } else {
        submenu.className += ' is-closed';
        submenu.classList.remove('is-open');
      }

    });
  });

}
