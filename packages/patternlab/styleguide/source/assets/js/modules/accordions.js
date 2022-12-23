import checkActive from "../helpers/cssControlCode.js";

export default (function (window,document,$,undefined) {
  let $jsAccordion = $('.js-accordion');
  var $toggleLink = $('.ma__collapsible-content__toggle-all');
  let accordionIds = "";

  // Get or generates an ID for an element.
  function getId($el, $fallbackId) {
    let random = Math.random().toString(36).substring(2,7);
    return $el.attr('id') || 'accordion' + random + '-' + $fallbackId;
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
  $('.ma__collapsible-content--extended .js-accordion .ma__collapsible-content__body').each(function(index, el){
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
      $statusIcon = $el.find(`${ind} .js-accordion-status-icon`),
      open = $el.hasClass('is-open');

    if(toggleStatus != 'default') {
      open = toggleStatus == 'open'?false:true;
    }

    if(open){
      $content.stop(true,true).slideUp();
      $status.attr('aria-label', 'click to show info');
      $el.removeClass('is-open');
      $link.attr('aria-expanded', false);
      $statusIcon.text('+');
    } else {
      $content.stop(true,true).slideDown();
      $status.attr('aria-label', 'click to hide info');
      $el.addClass('is-open');
      $link.attr('aria-expanded', true);
      $statusIcon.text('|');
    }
  }

  // Initialize each accordion item.
  function init(index){
    let $el = $(this);
    let ind = '';
    let buttonWrapper = '';
    const isExtended = $el.parents('.ma__collapsible-content--extended').length;

    if ($el.hasClass('ma__header-alerts')) {
      ind = '>';
      buttonWrapper = '.ma__header-alerts__header';
    }

    if ($el.hasClass('ma__action-step')) {
      ind = '>';
      buttonWrapper = '.ma__action-step__title';
    }

    let $link = $el.find(`${ind} ${buttonWrapper} .js-accordion-link`),
        $content = $el.find('.js-accordion-content'),
        id = getId($el, index + 1),
        active = checkActive($el),
        open = $el.hasClass('is-open');

    $content.attr('id', id);
    $link.attr('aria-controls', id);

    if(isExtended) {
      let childs = $el.find('.ma__collapsible-content__body-item a').length;
      $el.find('.ma__collapsible-header__button').append( `<div class="header__title__counter">(<span class="ma__visually-hidden">contains
      </span>${childs}<span class="ma__visually-hidden"> items</span>)</div>`);
    }


    if(open) {
      $link.find(`.js-accordion-status-icon`).text('|');
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

    // Store the window width
    let windowWidth = $(window).width();
    // Add initialRun variable to only trigger the code once so the accordions will be collapsed.
    let initialRun = true;

    // Resize Event
    $(window).resize(function(){

      // Check window width has actually changed and it's not just iOS triggering a resize event on scroll
      if ($(window).width() != windowWidth || initialRun) {
        // Update the window width for next time
        windowWidth = $(window).width();
        let temp = checkActive($el);

        if(temp !== active && !temp || !open) {
          $content.removeAttr('style');
          $el.removeClass('is-open');
          $link.attr('aria-expanded','false');
        }
        initialRun = false;
        active = temp;
      }
    }).resize();
  }

})(window,document,jQuery);
