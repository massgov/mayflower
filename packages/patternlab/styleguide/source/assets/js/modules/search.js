export default (function (document) {
  // Add aria-describedby for autosuggest infomration to banner search Input.
  const bannerSearchInput = document.querySelector(".ma__search-banner__form input");

  bannerSearchInput.setAttribute("aria-describedby", "autosuggest-info");
})(document);