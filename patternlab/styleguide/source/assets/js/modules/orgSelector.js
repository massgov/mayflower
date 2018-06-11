import getTemplate from "../helpers/getHandlebarTemplate.js";

export default function (window,document,$,undefined) {
  
  $('.js-org-selector').each(function(i){
    let $el = $(this);
    let data = orgSelector[i];
    let compiledTemplate = getTemplate('orgInfo');
    let $select = $el.find('select').first();
    let $placeholder = $el.find('.js-org-info');

    //render the template based on the current value
    renderTemplate($select.val());

    // When the select changes
    $select.change(() => {
      //render the template based on the new value
      renderTemplate($select.val());
    });

    // Render the template based on value
    function renderTemplate(value) {
      if (typeof(data.organizations[value]) === "undefined") {
        $placeholder.html("");
        return false;
      }

      $placeholder.html(compiledTemplate(data.organizations[value]));

      return true;
    }
  });

}(window,document,jQuery);
