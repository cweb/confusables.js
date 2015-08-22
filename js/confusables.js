/* 
    Description:
    This module provides the Unicode confusables data in JavaScript, 
    along with methods to access that data.  The Unicode confusables 
    are characters which are visually similar to each other.  The 
    following set of characters are each different, but all visually 
    similar :  'A', 'Ａ', 'Α', 'А', 'Ꭺ', 'ᗅ'

    The data here was converted from the Unicode 6.0 confusables data 
    located at http://unicode.org/Public/security/

    To get an array of confusable characters for a single given character, 
    call getConfusableCharacters() from confusables.js.  

    var output = confusables.utility.getConfusableCharacters("A"); 
          |
          -- output is ['A', 'Ａ', 'Α', 'А', 'Ꭺ', 'ᗅ']

    To get a string that's visually confusable with a given string of 
    characters, call getConfusableString().

    var output = confusables.utility.getConfusableString("Unicode is fun"); 
          |
          -- output is "Ｕᴨıᴄｏｄｅ ɪƽ ſｕᴨ"

    To work with the data directly, look at confusables.data.js.

*/

var confusables = confusables || {};

confusables.utility = (function () {


    // PUBLIC METHODS

    // Description: 
    //   Return a string of text with a random selection of Unicode confusables 
    //   which look visually similar to the input.

    // Usage:
    //   var input = "A string of text";
    //   var output = confusables.utility.getConfusableString(input); 


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
                        if (replacement instanceof Array) {
                            // The replacement confusables are more than one code points
                            // so build the string.
                            for (var j = 0; j < replacement.length; j++) {
                                try {
                                    newChar += String.fromCodePoint(replacement[j]);
                                }
                                catch(e) {
                                    console.error("getConfusableString", e.message);
                                }
                            }
                        }
                        else if (typeof replacement === 'number') {
                            // Else the replacement is a single code point.
                            try {
                                newChar = String.fromCodePoint(replacement);
                            }
                            catch(e) {
                                console.error("getConfusableString", e.message);
                            }
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


    // Description: 
    //   Accepts only a single character <= U+FFFF and returns an array
    //   of its confusable characters as strings.  

    // Usage:
    //   var input = "A";
    //   var output = confusables.utility.getConfusableCharacters(char); 
    //   output is ['A', 'Ａ', 'Α', 'А', 'Ꭺ', 'ᗅ']
    //   output could contain arrays of characters, e.g.
    //   [["C", "'"], "Ƈ" ];

    function getConfusableCharacters(input) {
        // If the input was a number, convert it to a string
        if (typeof input === "number") {
            input = String.fromCodePoint(input);
        }
        // Catch other types, null, object
        if (typeof input !== "string") {
            throw new TypeError("input was not a string");
        }
        if (input.length !== 1) {
            throw new Error("only a single character is allowed as input")
        }
        if (input.charCodeAt() > 0xFFFF) {
            throw new Error("only characters in the BMP are allowed")
        }
        var set = [];
        var pointer = confusables.data.index[input.charCodeAt()];
        if (typeof pointer === "undefined") {
            throw new Error("the input doesn't have any confusables");
        }
        set = _clone(confusables.data.characters[pointer]);

        // now iterate over the set and turn the values into characters
        for (var i = 0; i < set.length; i++) {
            // Check if this is a sequence of confusables, more than one
            // character making up the confusable
            if (set[i] instanceof Array) {
                // The replacement confusables are an array of code points
                // so keep the array, returning each character.
                for (var j = 0; j < set[i].length; j++) {
                    //newChar += String.fromCodePoint(set[i][j]);
                    try {
                        set[i][j] = String.fromCodePoint(set[i][j]);
                    }
                    catch(e) {
                        console.error("getConfusableCharacters", e.message);
                    }
                }
            }
            else if (typeof set[i] === 'number') {
                // Else the replacement is a single code point.
                try {
                    set[i] = String.fromCodePoint(set[i]);
                }
                catch(e) {
                    console.error("getConfusableCharacters", e.message);
                }
            }
        }
        return set;
    }

    // Insert invisible characters.
    function getInvisibles(input) {
       var invisibles = [0x180E, 0x2028, 0x2029, 0x1680 ];

        if (typeof input === "string") {
            // Input is a valid string
        }
    }

    // Insert whitespace characters.
    function getWhitespace(input) {
        var whitespace = [0x0020, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2008, 0x2009, 0x200A, 0x00A0, 0x2007, 0x202F ];
        if (typeof input === "string") {
            // Input is a valid string
        }
    }

    // Insert artifacts like modifiers and
    // accents.
    function getArtifacts(input) {
        if (typeof input === "string") {
            // Input is a valid string
        }

    }

    // PRIVATE METHODS

    function _clone(arr) {
        var copy;

        // Handle null, undefined, and number types
        if (null == arr || "object" != typeof arr) return arr;
        // Handle Array
        if (arr instanceof Array) {
            copy = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                copy[i] = _clone(arr[i]);
            }
            return copy;
        }
        throw new Error("Unable to copy array!");
    }


    return {
        // Return public functions
        getConfusableString : getConfusableString,
        getConfusableCharacters : getConfusableCharacters
    };

})();
