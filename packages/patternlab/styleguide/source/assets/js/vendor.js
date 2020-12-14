/**
 * This is our vendor javascript file.
 *
 * We use this file to import third party code. There are two types of third party libraries
 * we deal with here - the first is polyfills, which generally attach themselves to the window
 * just by importing. The second type of library we deal with does not attach itself to the
 * window automatically - these types of libraries need to be re-exported the the `global`
 * object, which is the window.
 */
// Polyfills.
window.__forceSmoothScrollPolyfill__ = true;

import 'whatwg-fetch';
import 'picturefill';
import 'core-js/fn/promise';
import 'core-js/fn/object/assign';
import 'core-js/fn/array/find';
import 'core-js/fn/array/find-index';
import 'core-js/fn/array/fill';
import 'core-js/fn/array/from';
import 'core-js/fn/array/includes';
import 'mdn-polyfills/String.prototype.includes'
import 'mdn-polyfills/Element.prototype.closest'
import 'mdn-polyfills/Element.prototype.matches'
import 'url-search-params-polyfill';
import svg4everybody from 'svg4everybody'
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

svg4everybody({
    validate: function(src) {
        // Don't touch internal SVG references. Those work fine in
        // the browsers we support.
        return src.indexOf('#') !== 0;
    }
});

// Libraries.
import jQuery from 'jquery';
import Twig from 'twig';
import moment from 'moment';
import Handlebars from 'handlebars/dist/handlebars';
import Pikaday from 'pikaday';
import fitvids from 'fitvids';

global.fitvids = fitvids;
global.jQuery = jQuery;
global.$ = jQuery;
global.Twig = Twig;
global.moment = moment;
global.Handlebars = Handlebars;
global.Pikaday = Pikaday;
