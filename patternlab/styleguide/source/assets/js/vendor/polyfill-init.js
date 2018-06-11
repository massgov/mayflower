// https://github.com/jonathantneal/svg4everybody
svg4everybody({
    validate: function(src) {
        // Don't touch internal SVG references. Those work fine in
        // the browsers we support.
        return src.indexOf('#') !== 0;
    }
});