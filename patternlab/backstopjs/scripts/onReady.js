/**
 * Ready script, fires after pages have loaded, but before screenshots are captured.
 *
 * This script is used to hide or modify highly dynamic elements that may cause trouble
 * during visual regression testing.  If you are constantly seeing trivial failures for
 * an element, you can probably deal with it here.
 */
module.exports = async function(page, scenario, vp) {
    await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.5.1.min.js'})

    // Wait for all visible fonts to complete loading.
    await page.evaluate(async function() {
        await document.fonts.ready;
    })

    // Wait for all <img> elements to complete loading.
    await page.waitForFunction(() => {
        const images = Array.from(document.images);
        const unloaded = images.filter(i => i.hasAttribute('src') && !i.complete)
        return unloaded.length === 0;
    });

    // Wait for background images to finish loading.
    await page.evaluate(async function() {
        const bgHavingElements = document.querySelectorAll('[role="img"]');
        const loadPromises = Array.from(bgHavingElements).map((element) => {
            const style = getComputedStyle(element);
            if (style.backgroundImage.match(/^url\(/)) {
                // If a background image is found, create an <img> as a way for us to
                // detect its loading status. The promise resolves when it has loaded.
                return new Promise((resolve, reject) =>{
                    const url = style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '')
                    const img = document.createElement('img');
                    img.setAttribute('src', url);
                    img.onload = () => {
                        img.remove();
                        resolve();
                    }
                })
            }
            return Promise.resolve();
        });
        return Promise.all(loadPromises);
    });

    await page.addStyleTag({
        content: '' +
        // Force all animation to complete immediately.
        '*, *::before, *::after {\n' +
        '  animation-delay: 0ms !important;\n' +
        '  animation-duration: 0ms !important;\n' +
        '  transition-duration: 0ms !important;\n' +
        '  transition-delay: 0ms !important;\n' +
        '}' +
        // Kill Video embeds (show black box instead)
        '.fluid-width-video-wrapper:after {' +
        '  background: black;' +
        '  content: \'\';' +
        '  position: absolute;' +
        '  top: 0;' +
        '  left: 0;' +
        '  right: 0;' +
        '  bottom: 0;' +
        '  z-index: 100;' +
        '}' +
        // Kill google Maps and iframes (show a green box instead)
        '.js-google-map, .js-ma-responsive-iframe {' +
        '  position: relative;' +
        '}' +
        '.js-google-map:before, .js-ma-responsive-iframe:before {' +
        '  background: #B2DEA2;\n' +
        '  content: \' \';\n' +
        '  display: block;\n' +
        '  position: absolute;\n' +
        '  top: 0;\n' +
        '  left: 0;\n' +
        '  right: 0;\n' +
        '  bottom: 0;\n' +
        '  z-index: 100;\n' +
        '}'
    });

    // Wait for ajax to complete - this is to give alerts
    // time to finish rendering. This can take a while, especially
    // in local environments.
    await page.waitForFunction('jQuery.active == 0');

    await page.evaluate(async function () {
        // Disable jQuery animation for any future calls.
        jQuery.fx.off = true;
        // Immediately complete any in-progress animations.
        jQuery(':animated').finish();

        // Undo the Google Optimize page-hiding snippet so we can access the page
        // before the 2s timeout. See https://developers.google.com/optimize.
        if(window.dataLayer && window.dataLayer.hide && window.dataLayer.hide.end) {
            window.dataLayer.hide.end();
        }

    });



    if(scenario.label.match(/^page /)) {
        // Add a slight delay.  This covers up some of the jitter caused
        // by weird network conditions, slow javascript, etc. We should
        // work to reduce this number, since it represents instability
        // in our styling.
        await page.waitFor(350);
    }
}
