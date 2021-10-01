import checkActive from "../helpers/cssControlCode.js";

export default (function (window,document,$,undefined) {
  let $jsAccordion = $('.ma__collapsible-content .js-accordion');
  var $toggleLink = $('.ma__collapsible-content__toggle-all');
  let accordionIds = "";

  $jsAccordion.each(function(index){
    init.apply(this, [index]);
  });

  // Gather the ids for all the accordions.
  $('.ma__collapsible-content--extended .js-accordion').each(function(index){
    accordionIds += 'accordion' + (index + 1) + ' ';
  });
  // Add aria labels to toggle all
  $toggleLink.attr("aria-controls", accordionIds);

  function checkAccordionsSameStatus(){
    let isOpen = $('.ma__collapsible-content--extended .js-accordion.is-open').length;
    if (isOpen === 0) {
      collapseLinkToggle('expand');
      return "open";
    } else if (isOpen == $(".ma__collapsible-content--extended .js-accordion").length) {
      collapseLinkToggle('collapse');
      return "close";
    }
  }

  function collapseLinkToggle(status){
    if(status == "collapse") {
      $toggleLink.addClass('ma__collapsible-content__toggle-all--expanded');
      $toggleLink.removeClass('ma__collapsible-content__toggle-all--collapsed');
    } else {
      $toggleLink.addClass('ma__collapsible-content__toggle-all--collapsed');
      $toggleLink.removeClass('ma__collapsible-content__toggle-all--expanded');
    }
  }

  // In case that all paragraphs are expanded by default, change the "expand all" link to "collapse all".
  checkAccordionsSameStatus();

  $(document).on('ma:AjaxPattern:Render', function(e,data){
    let $context = data.el;
    if ($context.find('.js-accordion').length) {
      $context.find('.js-accordion').each(function(index){
        // Try to ensure we don't collide with the index values from DOM load.
        let offset = 100;
        let offsetIndex = offset + index;
        init.apply(this, [offsetIndex]);
      });
    }
  });

  // Toggle button.
  $toggleLink.on("click",function(e){
    let status = $toggleLink.hasClass('ma__collapsible-content__toggle-all--expanded')?"close":"open";

    $('.ma__collapsible-content--extended .js-accordion').each(function(index){
      accordionToggle($(this), status);
    });

    checkAccordionsSameStatus();
    e.preventDefault();
  });

  // Toggle each individual accordion.
  function accordionToggle($el, toggleStatus = 'default'){
    let ind = '';

    if ($el.hasClass('ma__header-alerts')) {
      ind = '>';
    }

    let $link = $el.find(`${ind} .js-accordion-link`),
      $content = $el.find(`${ind} .js-accordion-content`),
      $status = $el.find(`${ind} .js-accordion-status`),
      open = $el.hasClass('is-open');

    if(toggleStatus != 'default') {
      open = toggleStatus == 'open'?false:true;
    }

    if(open){
      $content.stop(true,true).slideUp();
      $status.attr('aria-label', 'click to show info');
      $el.removeClass('is-open');
    } else {
      $content.stop(true,true).slideDown();
      $status.attr('aria-label', 'click to hide info');
      $el.addClass('is-open');
    }
    $link.attr('aria-expanded',!open);

  }

  function init(index){
    let $el = $(this);
    let ind = '';
    const isExtended = $el.parents('.ma__collapsible-content--extended').length;

    if ($el.hasClass('ma__header-alerts')) {
      ind = '>';
    }

    let $link = $el.find(`${ind} .js-accordion-link`),
        $content = $el.find(`${ind} .js-accordion-content`),
        id = $content.attr('id') || 'accordion' + (index + 1),
        active = checkActive($el),
        open = $el.hasClass('is-open');

    $content.attr('id', id);
    $link.attr('aria-expanded',open).attr('aria-controls', id);

    if(isExtended) {
      let childs = $el.find('.ma__collapsible-content__body-item a').length;
      $el.find('.ma__collapsible-header__button').append( `<div class="header__title__counter">(${childs})</div>`);
    }


    if(open) {
      // setup the inline display block
      $content.stop(true,true).slideDown();
    }

    // + and - clicks.
    $link.on('click',function(e){
      if(active) {
        e.preventDefault();
        accordionToggle($el);
        checkAccordionsSameStatus();
      }
    });

    $(window).resize(function () {
      let temp = checkActive($el);

      if(temp !== active && !temp) {
        $content.removeAttr('style');
        $el.removeClass('is-open');
        $link.attr('aria-expanded','false');
      }

      active = temp;
    }).resize();
  }

})(window,document,jQuery);
