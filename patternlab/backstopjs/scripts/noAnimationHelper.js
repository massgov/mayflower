module.exports = function(chromy) {
    /**
     * Writes a CSS property to set transition and animation
     * delays and duration to 0ms.
     */
    chromy.evaluate(function() {
        var style = document.createElement('style');
        style.type = 'text/css';
        var styleNode = document.createTextNode(
            '*, *::before, *::after {\n' +
            '  animation-delay: 0ms !important;\n' +
            '  animation-duration: 0ms !important;\n' +
            '  transition-duration: 0ms !important;\n' +
            '  transition-delay: 0ms !important;\n' +
            '}'
        );
        style.appendChild(styleNode);
        document.head.appendChild(style);
    });
}