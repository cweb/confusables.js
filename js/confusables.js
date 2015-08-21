/* 
    Description:
      This module provides the Unicode confusables data in JavaScript, 
      along with methods to access that data.  The Unicode confusables 
      are characters which are visually similar and easily confused 
      with other characters.  More information: 

      http://www.unicode.org/reports/tr36/#visual_spoofing 

      Currently implemented public methods are:

      confusables.getConfusableString(input)
      - Call this to get a string of confusable characters which are 
      visually similar to the input string.

      The data here was converted from the Unicode confusables data 
      located at http://unicode.org/Public/security/
 
      - Confusable characters are stored in arrays with their lookalikes.
      - An index was created for faster lookups.
      - Data includes only some of the BMP data from TR39.  
      - Data been manually altered to remove problem characters, that is, 
        those which don't display well or at all in Google Chrome 30.0.1599.101.
      - Data has also been altered to include Latin FullWidth characters.
*/

var confusables = confusables || {};

confusables.utility = (function () {
    /*
        Description: 
          Return a string of text with a random selection of Unicode confusables 
          which look visually similar to the input.

        Usage:
          var input = "A string of text";
          var output = publicGetConfusableString(input); 
    */

    function getConfusableString(input) {
        var output = "";
        var pointer;
        if (typeof input !== "string") {
            throw new TypeError("input was not a string");
        }
        else {
            // Input is a valid string

            // Iterate over string
            for (var i = 0; i < input.length; i++) {
                // Get the current character
                var c = input.charAt(i);
                // Get the value of the character
                var v = c.charCodeAt();

                // Only confuse things if the char is in the BMP
                if (v <= 0xFFFF) {
                    var newChar = "";
                    var sourceIndex;   // the source code point
                    var replacement; // the replacement code point(s)

                    try {
                        pointer = confusables.data.index[v];
                    }
                    catch (e) {}
                    if (typeof pointer != "undefined") {
                        // Create a new array with the source character removed,
                        // because there's no reason to return the same character
                        // when this should return a confusable.

                        // make a copy of the original array
                        var cons = confusables.data.characters[pointer].slice(0);
                        // The source char should only appear once in the array.
                        sourceIndex = cons.indexOf(v);
                        // Need to handle the case where the array only has one
                        // element, so, not remove it.
                        var removed = {};
                        if (cons.length > 1) {
                            removed = cons.splice(sourceIndex, 1);
                        }
                        replacement = cons[(Math.round(Math.random() * (cons.length - 1)))];
                        // check if an array of confusables was returned
                        if (Object.prototype.toString.call(replacement) === '[object Array]' ) {
                            // The replacement confusables are more than one code points
                            // so build the string.
                            for (var j = 0; j < replacement.length; j++) {
                                newChar += String.fromCodePoint(replacement[j]);
                            }
                        }
                        else if (typeof replacement === 'number') {
                            // Else the replacement is a single code point.
                            newChar = String.fromCodePoint(replacement);
                        }
                        output += newChar;
                    }
                    else {
                        output = output + c;
                    }
                }
                // If the character was not in the BMP, then add it to 
                // the string unchanged.
                else {
                    output = output + c;
                }
            }
        }
        return output;
    }

    // Insert invisible characters.
    function publicGetInvisibles(input) {
       var invisibles = [0x180E, 0x2028, 0x2029, 0x1680 ];

        if (typeof input === "string") {
            // Input is a valid string
        }
    }

    // Insert whitespace characters.
    function publicGetWhitespace(input) {
        var whitespace = [0x0020, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2008, 0x2009, 0x200A, 0x00A0, 0x2007, 0x202F ];
        if (typeof input === "string") {
            // Input is a valid string
        }
    }

    // Insert artifacts like modifiers and
    // accents.
    function publicGetArtifacts(input) {
        if (typeof input === "string") {
            // Input is a valid string
        }

    }

    return {
        // Return public methods
        getConfusableString : getConfusableString
    };

})();
