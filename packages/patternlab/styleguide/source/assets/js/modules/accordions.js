import checkActive from "../helpers/cssControlCode.js";

export default (function (window,document,$,undefined) {
  let $jsAccordion = $('.js-accordion');


  $jsAccordion.each(function(index){
    init.apply(this, [index]);
  });

  // In case that all paragraphs are expanded by default, change the "expand all" link to "collapse all".
  if($(".ma__collapsible-content--extended").length) {
    let allExpanded = true;

    $('.ma__collapsible-content--extended .js-accordion').each(function(index){
      if(! $(this).hasClass('is-open')) {
        allExpanded = false;
      }
    });

    if(allExpanded) {
      toggleAll();
    }
  }

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

  $('.ma__collapsible-content__toggle-all').on("click",function(e){
    toggleAll();

    e.preventDefault();
  });

  function toggleAll(toggleStatus = 'open') {
    let $toggleLink = $('.ma__collapsible-content__toggle-all');

    if($toggleLink.hasClass('ma__collapsible-content__toggle-all--expanded')) {
      $toggleLink.addClass('ma__collapsible-content__toggle-all--collapsed');
      $toggleLink.removeClass('ma__collapsible-content__toggle-all--expanded');
      toggleStatus =  'close';

    } else {
      $toggleLink.addClass('ma__collapsible-content__toggle-all--expanded');
      $toggleLink.removeClass('ma__collapsible-content__toggle-all--collapsed');
    }

    $('.js-accordion').each(function(index){
      accordionToggle($(this), toggleStatus);
    });
  }

  function accordionToggle($el, toggleStatus = 'default') {
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

  function init(index) {
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
      let childs = $el.find('.ma__link-list__item, .ma__collapsible-content__body-item').length;
      $el.find('.ma__collapsible-header__title').append( `<div class="header__title__counter">(${childs})</div>`);
    }


    if(open) {
      // setup the inline display block
      $content.stop(true,true).slideDown();
    }

    $link.on('click',function(e){
      if(active) {
        e.preventDefault();
        accordionToggle($el);
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