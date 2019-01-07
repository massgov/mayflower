// Open menu.
const menuButton = document.querySelector(".js-header-menu-button");

if (null !== menuButton) {
  menuButton.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("body").classList.toggle("show-menu");
  });
}

// Remove current page from contextual nav menu.
const contextualNavLinks = document.querySelectorAll(".ma__contextual-navigation--anchor");
const currentLocation = window.location.href;

contextualNavLinks.forEach(function (navLink) {

  let navLinkHref = navLink.getAttribute("href");

  if (navLinkHref == currentLocation) {
    navLink.parentNode.remove();
  }
});

// Open submenus.

document.querySelectorAll('.ma__contextual-navigation__nav-wrapper .ma__main-nav__top-link').forEach(button => {
  button.addEventListener('click', () => {
    let subMenu = button.parentNode.querySelector('.js-main-nav-content');
    let isClosed = subMenu.classList.contains('is-closed');

    if (isClosed) {
      subMenu.classList.add('is-open');
      subMenu.classList.remove('is-closed');
    }
    else {
      subMenu.classList.remove('is-open');
      subMenu.classList.add('is-closed');
    }
  });
});
