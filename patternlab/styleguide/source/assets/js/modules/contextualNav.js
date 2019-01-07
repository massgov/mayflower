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

    document.querySelector("body").classList.toggle("show-submenu");

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

// Close Submenus 
document.querySelector('.ma__contextual-navigation__nav-wrapper .js-close-sub-nav').addEventListener('click', () => {
  const openMenu = document.querySelectorAll(".js-main-nav-content.is-open");
  document.querySelector("body").classList.toggle("show-submenu");

  [].forEach.call(openMenu, function (el) {
    el.classList.remove('is-open');
    el.classList.add('is-closed');
  });
});
