// Object.assign
(function() {

    if (Object.assign) { return; }

    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for (var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if (nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });

}());

// Array.find
(function() {
    if (Array.prototype.find) { return; }

    Object.defineProperty(Array.prototype, "find", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(predicate) {
            if (this === null) {
                throw new TypeError("Array.prototype.find called on null or undefined");
            }
            if (typeof predicate !== "function") {
                throw new TypeError("predicate must be a function");
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        }
    });

}());

// Array.findIndex
(function() {
    if (Array.prototype.findIndex) { return; }

    Object.defineProperty(Array.prototype, "findIndex", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(predicate) {
            if (this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }
            return -1;
        }
    });

}());

// Array.fill

(function() {

    if (Array.prototype.fill) { return; }

    Object.defineProperty(Array.prototype, "fill", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(value) {

            // Steps 1-2.
            if (this == null) {
              throw new TypeError('this is null or not defined');
            }

            var O = Object(this);

            // Steps 3-5.
            var len = O.length >>> 0;

            // Steps 6-7.
            var start = arguments[1];
            var relativeStart = start >> 0;

            // Step 8.
            var k = relativeStart < 0 ?
              Math.max(len + relativeStart, 0) :
              Math.min(relativeStart, len);

            // Steps 9-10.
            var end = arguments[2];
            var relativeEnd = end === undefined ?
              len : end >> 0;

            // Step 11.
            var final = relativeEnd < 0 ?
              Math.max(len + relativeEnd, 0) :
              Math.min(relativeEnd, len);

            // Step 12.
            while (k < final) {
              O[k] = value;
              k++;
            }

            // Step 13.
            return O;
        }
    });
}());
// Array.includes
(function() {

    if (Array.prototype.includes) { return; }

    Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(searchElement /*, fromIndex*/ ) {
            'use strict';
            var O = Object(this);
            var len = parseInt(O.length) || 0;
            if (len === 0) {
              return false;
            }
            var n = parseInt(arguments[1]) || 0;
            var k;
            if (n >= 0) {
              k = n;
            } else {
              k = len + n;
              if (k < 0) {k = 0;}
            }
            var currentElement;
            while (k < len) {
              currentElement = O[k];
              if (searchElement === currentElement ||
                 (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                return true;
              }
              k++;
            }
            return false;
         }
      });
}());
