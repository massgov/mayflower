export default function (window, document, $, undefined) {

    let $toggle, $root, $sections;
    let hiddenClass = 'is-initially-hidden';

    function bindVars () {
        $root = $('.js-teaser-listing-group');
        $toggle = $root.find('.js-teaser-listing-group-toggle');
        $sections = $root.find('.ma__teaser-listing');
    }

    function markForAccordion () {
        let totalShown = $root.data('totalVisible');
        let teaserItems = $root.find('.ma__general-teaser');

        // set excess items to be hidden
        teaserItems.slice(totalShown, teaserItems.length).each((i, el) => {
            // Items can be siblings or within an <li>, add class to the <li> if present
            if ($(el).parent().prop('tagName') === "LI") {
                $(el).parent().addClass(hiddenClass);
            } else {
                $(el).addClass(hiddenClass);
            }
        });

        $sections.each( (i, el) => {
            let $section = $(el);
            let totalTeaserItems = $section.find('.ma__general-teaser');
            let hiddenItems = $section.find('.'+hiddenClass);
            // If the total number of teasers and total number of hidden things are the same, hide the whole section.
            if (totalTeaserItems.length === hiddenItems.length) {
                $section.addClass(hiddenClass);
            }
        });


    }

    function handleToggle () {
        $toggle.click(() => {
            $root.toggleClass('is-open');
        });
    }



    $(document).ready( () => {
        bindVars();
        markForAccordion();
        handleToggle();
    });

} (window, document, jQuery);
