module.exports = function(chromy) {
    /**
     * Hides elements that are problematic during visual testing.
     *  * Google Maps, which may not load all the way
     *  * YouTube Videos, which display differently sometimes (A/B testing maybe?)
     */
    chromy.evaluate(function() {
        var style = document.createElement('style');
        style.type = 'text/css';
        var styleNode = document.createTextNode(
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
            '.js-google-map:before {' +
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
        );
        style.appendChild(styleNode);
        document.head.appendChild(style);
    });
}