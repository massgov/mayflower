import truncateImagePromoDescriptions from "../helpers/truncateImagePromoDescriptions.js";

export default (function (window,document,$,undefined) {
    "use strict";

    truncateImagePromoDescriptions($('.ma__location-listing__results .ma__image-promos'));
})(window,document,jQuery);
