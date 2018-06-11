
export default (function(Twig, ma) {
    'use strict';

    /**
     * Returns the gettable path to a pattern based on its namespaced path.
     *
     * @param pattern
     *   The namespaced path to a pattern (i.e. @atoms/decorative-link.twig)
     *
     * @returns {string}
     *   The path to a pattern which can be used in a get request (i.e. /assets/patterns/atoms/decorative-link.twig )
     */
    function resolveTwigPath(patternName) {
        let pathParts = patternName.split("/");
        let namespace = pathParts.shift();
        let patternPath = pathParts.join("/");
        // Set ma.patternPaths in your implementation's env.js file (see /source/_meta/_00-foot.twig)
        return ma.patternPaths[namespace] + patternPath;
    }

    /**
     * Returns the gettable path to an icon based on its name.
     *
     * @param name
     *   The name of an icon (i.e. arrow)
     *
     * @returns {string}
     *   The path to an icon SVG file which can be used in a get request (i.e. /images/svg-icons/arrow.svg )
     */
    function getIconPath(name) {
        return ma.iconPath + '/' + name + '.svg';
    };

    /**
     * Extend Twig with an icon function that embeds an SVG directly.
     */
    Twig.extendFunction('icon', function(name) {
        // Just use Twig to fetch the SVG and render it like a template.
        var svg = Twig.twig({
            href: getIconPath(name),
            async: false,
        });
        // Don't choke here if we aren't able to load the SVG.
        return svg ? svg.render() : '';
    });

    /**
     * Asynchronously loads a Twig template based on the internal name.
     *
     * @param patternName
     *   The namespaced path to a pattern (i.e. @atoms/decorative-link.twig)
     *
     * @return {Promise<Twig.Template>}
     *   The loaded and compiled Twig template.
     */
    return function twiggy(patternName) {
        return new Promise(function(resolve, reject) {
            Twig.twig({
                href: resolveTwigPath(patternName),
                allowInlineIncludes: true,
                namespaces: {
                    'base': ma.patternPaths['@base'],
                    'atoms': ma.patternPaths['@atoms'],
                    'molecules': ma.patternPaths['@molecules'],
                    'organisms': ma.patternPaths['@organisms'],
                    'templates': ma.patternPaths['@templates'],
                    'pages': ma.patternPaths['@pages'],
                    'meta': ma.patternPaths['@meta']
                },
                async: true, // Included/extended patterns loaded synchronously: https://github.com/twigjs/twig.js/issues/426
                load: resolve
            })
        })
    };

}(Twig, ma))