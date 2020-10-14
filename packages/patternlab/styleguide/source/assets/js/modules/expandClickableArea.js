export default (function (window, document, $) {
// ****** Make the whole TOC link's parent container a hotspot ******
// Currently used with:
// - patternlab/styleguide/source/_patterns/03-organisms/by-template/table-of-contents-hierarchy.twig
// - patternlab/styleguide/source/_patterns/03-organisms/by-template/sticky-toc.twig
  $(document).ready(function() {
    $("[data-link]").click(function() {
      event.preventDefault();
      window.location = $(this).data("link");
    });
  });
// eslint-disable-next-line no-undef
})(window,document,jQuery);
