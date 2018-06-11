export default function (window,document,$,undefined) {

  $('.pre-content .ma__sticky-toc').each(function() {
    const $toc = $('.ma__sticky-toc'),
          $tocContent = $('.ma__sticky-toc__links'),
          $tocSections = $('.ma__information-details .page-content').find('h2'),
          lastHeading = $tocSections.last().text(),
          tocSectionCount = $tocSections.length,
          $tocColumn = $('.ma__sticky-toc__column'),
          $mobileToggle = $('.ma__sticky-toc__toggle-link'),
          $tocToggle = $('.stickyTOC-open'),
          $tocFooter = $('.ma__sticky-toc__footer'),
          $stickyToc = $('.ma__sticky-toc__current-section');

    // // Remove wrapper if not enough links.
    if (tocSectionCount < 3 ) {
      $toc.remove();
    }
    else {
      // To set an overflow rule for jumpy IE wrapping
      $('html').addClass('stickyTOC');
    }
    // Show expander when more than 10 links.
    if (tocSectionCount <= 10) {
      if ($(window).width() > 480 ) {
        $('.ma__sticky-toc__footer').toggle();
      }
    }

    // Use headers to fill TOC.
    $tocSections.each(function() {
      let $section = $(this);
      let sectionId = $section.attr('id');
      let sectionTitle = $section.text();
      if (!sectionId) {
        sectionId = sectionTitle.replace(/\s+/g, '-').toLowerCase();
        $section.attr('id', sectionId);
      }
      let $tocLink = '<div class="ma__sticky-toc__link"><svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" width=\"35\" height=\"35\" viewBox=\"0 0 35 35\"><path class=\"st0\" d=\"M17.5 35C7.8 35 0 27.2 0 17.5 0 7.8 7.8 0 17.5 0 27.2 0 35 7.8 35 17.5 35 27.2 27.2 35 17.5 35zM16 9l-3 2.9 5.1 5.1L13 22.1l3 2.9 8-8L16 9z\"/></svg><a href="#'+sectionId+'" >'+sectionTitle+'</a></div>';
      let dest = '<span class="sticky-toc-jump-target" id="' + sectionId + '"></span>';

      $section.removeAttr('id');
      $section.parent().prepend(dest);
      $('.ma__sticky-toc__column').append($tocLink);
    });

    // Toggle mobile TOC open.
    $mobileToggle.on('click', function() {
      $tocContent.toggleClass('is-open');
    });

    $tocFooter.on('click', function() {
      let $button = $(this).find('button');
      let $buttonText = $button.text();

      // Toggle hidden links open.
      $tocContent.toggleClass('open');
      $button.toggleClass('open');

      // Toggle button text.
      $button.text($buttonText === "show less" ? "show more" : "show less");
    });

    $(window).resize(function () {
      // Reset menu for each form factor on resize.
      $('.ma__sticky-toc__link').removeAttr('style');
      $tocContent.removeClass('open');
      $tocFooter.find('button').removeClass('open').text('Show More');
    });

    // Set title bar to 'Related since the scroll never makes it that far'
    $('body').on('click', '.ma__sticky-toc__link a[text="' + lastHeading + '"]', function() {
      $('.ma__sticky-toc__current-section').text(lastHeading);
    });

    $(window).scroll(function () {
      const windowTop = $(window).scrollTop();
      const windowBottom = window.innerHeight;
      const docHeight = $(document).height();
      const stickyNavActive  = $toc.offset().top + $toc.outerHeight() - 20;

      // Active Sticky TOC when on page TOC scrolls past.
      if (stickyNavActive > windowTop) {
        $toc.removeClass('stuck');
      } else {
        $toc.addClass('stuck');

        if (windowTop + windowBottom === docHeight) {
          $stickyToc.text(lastHeading);
        }
        else {
          // Identify the section to show for the heading.
          const active = $tocSections.filter((index, section) => {
            const $target = $(section).siblings('.sticky-toc-jump-target');
            const top = $target.offset().top;
            // Works with Firefox.
            return top - windowTop < 20;
          });
          $stickyToc.text($(active.last()).text());
        }
      }
    });
    // Back to top button
    $(".stickyTOC-top").on('click',function(e) {
      e.preventDefault();
      try {
        $("html, body").stop(true,true).animate({scrollTop:0}, '750');
      }
      catch(e) {
        $('body').scrollTop(0);
      }
      // Bring keyboard focus back to top as well.
      $("#main-content").focus();
      return false;
    });

    function menuToggle() {
      $('.ma__sticky-toc__stuck-menu').toggleClass('sticky-nav-open');
      $('.ma__sticky-toc__overlay').toggle();
      $('.ma__floating-action').toggle();
    }

    $tocToggle.on('click', function() {
      // Append sticky menu when first called
      if ($('.ma__sticky-toc__stuck-menu').length == 0) {
        $tocColumn.clone(true).addClass('ma__sticky-toc__stuck-menu').appendTo('#main-content');

        // wait a beat so the slide in can work on first click
        setTimeout(function(){
          menuToggle();
        }, 100);
      }
      else {
        menuToggle();
      }

    });

    // Close button
    $('.secondary-label-close').on('click', function() {
      menuToggle();
    });

    // Close sticky menu on click off, include tools buttons
    $('body').on('click', function(event) {
      if(!$(event.target).closest('.ma__sticky-toc__stuck-menu').length && !$(event.target).closest('.ma__sticky-toc__tools').length) {
        console.log("click");
        if($('.ma__sticky-toc__stuck-menu').hasClass('sticky-nav-open')) {
          menuToggle();
        }
      }
    });

    // close menu when link clicked
    $('body').on('click', '.ma__sticky-toc__stuck-menu a', function() {
      menuToggle();
    });
  });
}
(window,document,jQuery);
