/*
    Description: 
      Replace a string of text with Unicode confusables 
      which look visually similar.

    Usage:
      var input = "A string of text";
      var output = confuse(input); 
*/

function confuse(input) {
    var output = "";
    var pointer;
    if (typeof input === "string") {
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
                    pointer = Index[v];
                }
                catch (e) {}
                if (typeof pointer != "undefined") {
                    // Create a new array with the source character removed,
                    // because there's no reason to return the same character
                    // when this should return a confusable.

                    // make a copy of the original array
                    var cons = Confusables[pointer].slice(0);
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
            else {
                output = output + c;
            }
        }
        // For each charac
    }
    return output;
}

// Insert invisible characters.
function insertInvisibles(input) {
   var invisibles = [0x180E, 0x2028, 0x2029, 0x1680 ];

    if (typeof input === "string") {
        // Input is a valid string
    }
}

// Insert whitespace characters.
function insertWhitespace(input) {
    var whitespace = [0x0020, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2008, 0x2009, 0x200A, 0x00A0, 0x2007, 0x202F ];
    if (typeof input === "string") {
        // Input is a valid string
    }
}

// Insert artifacts like modifiers and
// accents.
function insertArtifacts(input) {
    if (typeof input === "string") {
        // Input is a valid string
    }

}
