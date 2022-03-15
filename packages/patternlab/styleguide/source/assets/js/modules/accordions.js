import checkActive from "../helpers/cssControlCode.js";

export default (function (window,document,$,undefined) {
  let $jsAccordion = $('.js-accordion');
  var $toggleLink = $('.ma__collapsible-content__toggle-all');
  let accordionIds = "";

  // Get or generates an ID for an element.
  function getId($el, $fallbackId) {
    return $el.attr('id') || 'accordion' + $fallbackId;
  }

  $jsAccordion.each(function(index){

    // To ensure applying js-accordion only once.
    // Also to identify when this behavior has been
    // applied from external scripts.
    if ($(this).data("js-accordion")) {
      return;
    }
    $(this).data("js-accordion", 1);

    init.apply(this, [index]);
  });

  // Gather the ids for all the accordions.
  $('.ma__collapsible-content--extended .js-accordion').each(function(index){
    accordionIds += getId($(this), index + 1) + ' ';
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
    // document.dispatchEvents does not pass the data parameter as jQuery does.
    // Thus, data was bundled into the e object previously.
    let $context =
      typeof data === "undefined" ?
        $(e.originalEvent.el) : data.el;

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

    if (status == 'close') {
      $toggleLink.attr('aria-expanded', false);
    } else {
      $toggleLink.attr('aria-expanded', true);
    }

    $('.ma__collapsible-content--extended .js-accordion').each(function(index){
      accordionToggle($(this), status);
    });

    checkAccordionsSameStatus();
    e.preventDefault();
  });

  // Toggle each individual accordion.
  function accordionToggle($el, toggleStatus = 'default'){
    const ind = $el.hasClass('ma__header-alerts') ? '>' : '';

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
    accordionAriaToggle($link, !open);

  }

  // Set and update aria labels depending on the accordion status.
  function accordionAriaToggle($link, open) {
    const statusText = open ? "Collapse " : "Expand ";
    const label = $link.text() || $link.children('h2').text();
    
    $link.attr('aria-expanded',open);
    $link.attr('aria-label', statusText + label);
  }

  // Initialize each accordion item.
  function init(index){
    let $el = $(this);
    let ind = '';
    const isExtended = $el.parents('.ma__collapsible-content--extended').length;

    if ($el.hasClass('ma__header-alerts')) {
      ind = '>';
    }

    let $link = $el.find(`${ind} .js-accordion-link`),
        $content = $el.find(`${ind} .js-accordion-content`),
        id = getId($el, index + 1),
        active = checkActive($el),
        open = $el.hasClass('is-open');

    $content.attr('id', id);
    $link.attr('aria-controls', id);
    accordionAriaToggle($link, open);

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
