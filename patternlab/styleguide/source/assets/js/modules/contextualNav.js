const contextualNavLinks = document.querySelectorAll(".ma__contextual-navigation--anchor");
const currentLocation = window.location.href;

contextualNavLinks.forEach(function (navLink, index) {

  let navLinkHref = navLink.getAttribute("href");

  if (navLinkHref == currentLocation) {
    navLink.parentNode.remove();
  }
});

