export default (function (window,document,$) {

  const $linksContainer = $('.ma__inline-links ul.ma__inline-links__container');
  const $langToggle = $linksContainer.find('.lang-toggle');

  $langToggle.on('click', function (e) {
    e.preventDefault();
    const $links = $linksContainer.find('.ma__inline-links__item').not('.lang-toggle-container');
    if ($links.length > 0) {
      $.each($links, function (index, el) {
        let $targetEl = $(el).find('a');
        if ($targetEl.length > 0 && $targetEl.data('label')) {
          let val = $targetEl.text();
          let label = $targetEl.data('label');
          console.log(val);
          console.log(label);
          $targetEl.text(label);
          $targetEl.data('label', val);
        }
      });
    }
  });

})(window,document,jQuery);
