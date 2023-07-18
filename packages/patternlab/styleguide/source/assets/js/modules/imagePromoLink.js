export default (function (document) {
    let promos = document.querySelector(".ma__image-promo");
    Array.prototype.forEachCall(promos, promo => {
        // Check the unit has a link or not.
        let titleLink = promo.querySelector(".ma__image-promo__title .js-clickable-link");
        if (titleLink) {
            let down, up, link = titleLink;
            promo.onmousedown = () => (down = +new Date());
            promo.onmouseup = () => {
                up = +new Date();
                if (up - down < 200) {
                    link.click();
                }
            };
        }
    });
})(document);
