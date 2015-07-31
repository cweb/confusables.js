// String.fromCharCode() alone cannot get a character at such a high code point.
//
// The following, on the other hand, can return a 4-byte character as well as the 
//   usual 2-byte ones (i.e., it can return a single character which actually has 
//   a string length of 2 instead of 1).
//
// alert(String.fromCodePoint(0x2F804)); // or 194564 in decimal

/*!
* From: (c) 2012 Steven Levithan <http://slevithan.com/>
* MIT License
*/

/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
if (!String.fromCodePoint) {
    (function() {
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch(error) {}
            return result;
        }());
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var fromCodePoint = function(_) {
            var MAX_SIZE = 0x4000;
            var codeUnits = [];
            var highSurrogate;
            var lowSurrogate;
            var index = -1;
            var length = arguments.length;
            if (!length) {
                return '';
            }
            var result = '';
            while (++index < length) {
                var codePoint = Number(arguments[index]);
                if (
                    !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                    codePoint < 0 || // not a valid Unicode code point
                    codePoint > 0x10FFFF || // not a valid Unicode code point
                    floor(codePoint) != codePoint // not an integer
                ) {
                    throw RangeError('Invalid code point: ' + codePoint);
                }
                if (codePoint <= 0xFFFF) { // BMP code point
                    codeUnits.push(codePoint);
                } else { // Astral code point; split in surrogate halves
                    // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                    codePoint -= 0x10000;
                    highSurrogate = (codePoint >> 10) + 0xD800;
                    lowSurrogate = (codePoint % 0x400) + 0xDC00;
                    codeUnits.push(highSurrogate, lowSurrogate);
                }
                if (index + 1 == length || codeUnits.length > MAX_SIZE) {
                    result += stringFromCharCode.apply(null, codeUnits);
                    codeUnits.length = 0;
                }
            }
            return result;
        };
        if (defineProperty) {
            defineProperty(String, 'fromCodePoint', {
                'value': fromCodePoint,
                'configurable': true,
                'writable': true
            });
        } else {
            String.fromCodePoint = fromCodePoint;
        }
    }());
}