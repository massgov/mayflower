import checkActive from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {
  let $el,
    $elParent,
    elHeight,
    elWidth,
    lowerLimit,
    upperLimit,
    debounceTimer,
    runCode = false;

  function init(element) {
    $el = element;
    $elParent = $el.parent().css('position') === 'relative' ? $el.parent() : $el.parent().offsetParent();

    // default assumption as to where the screen will load
    $el.attr('data-sticky','top');

    updateData();

    // update variables one more time to catch any post page load changes
    window.setTimeout(function(){
      updateData();
    },1000);
    
    $(window).resize(function() {
      updateData();
      setPosition();
    });

    // toggle the sticky positioning
    $(window).scroll(function () {
      setPosition();
    });
  }

  function updateData(){
    let newRunCode = checkActive($el);

    if(runCode && !newRunCode) {
      $el.removeAttr('style');
    }

    runCode = newRunCode;

    if(!runCode){
      return;
    }
    
    runCode = newRunCode;
    elHeight = $el.height();
    elWidth = $elParent.width();
    upperLimit = $elParent.offset().top;
    lowerLimit = upperLimit + $elParent.outerHeight(true) - $el.height();

    $el.width(elWidth);      
  }

  function setPosition() {
    if(!runCode){
      $el.attr('data-sticky','top');
      return false;
    }

    let windowTop = $(window).scrollTop(),
        attr = $el.attr('data-sticky'),
        top = attr !== 'top' && windowTop <= upperLimit, 
        middle = attr !== 'middle' && windowTop < lowerLimit && windowTop > upperLimit,
        bottom = attr !== 'bottom' && windowTop >= lowerLimit;
    
    if(top) {
      $el.attr('data-sticky','top');
    } 
    else if (middle) {
      $el.attr('data-sticky','middle');
    } 
    else if (bottom) {
      $el.attr('data-sticky','bottom');
    }
  }

  return {init};

}(window,document,jQuery);