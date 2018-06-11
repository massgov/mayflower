import checkMobile from "../helpers/cssControlCode.js";

export default function (window,document,$,undefined) {

  $('.js-footnote').each(function(){
    let $el = $(this),
        $link = $el.find(".js-footnote-link"),
        $messageLink = $link.clone(),
        $rtelink = null,
        isMobile = checkMobile($el);

    if ($link.attr('href') === "#") {
      return;
    } else {
      $rtelink = $($link.attr('href'));
    }

    $messageLink.text('');

    $el.find(".js-footnote-message p:last-child").append($messageLink);

    $(window).resize(function() {
      isMobile = checkMobile($el);
    });

    $el.on('click','.js-footnote-link', function(e) {
      e.preventDefault();

      let target = $(this).attr('href');
      let position = getPosition($(target).parent());
      
      scrollTo(position.top, target);
    });

    $rtelink.click(function(e) {
      e.preventDefault();

      let target = $(this).attr('href');
      let position = getPosition($(target));
      
      scrollTo(position.top, target);
    });

    function getPosition($target) {
      let pos = $target.offset() || 0;

      if(isMobile) {
        let headerHeight = $('.js-sticky-header').height() || 0;
        let navHeight = $(".js-scroll-anchors").height() || 0;

        pos.top = pos.top - headerHeight - navHeight;
      }

      return pos;
    }

    function scrollTo(position, focus) {
      $("html,body").stop(true,true).animate({scrollTop:position}, '750', function(){
        if(focus) {
          $(focus).focus();
        }
      });
    }
  });
}(window,document,jQuery);
