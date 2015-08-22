describe("Test suite for confusables.js getConfusableString() : ", function() {
  it("returns something that does not equal the input", function() {
    var input = "abcDEF";
    var output = confusables.utility.getConfusableString(input);
    expect(input).not.toEqual(output);
  });

  it("returns a string of equal length", function() {
    var input = "abc123";
    var output = confusables.utility.getConfusableString(input);
    expect(output.length).toEqual(6);
  });

  it("returns a confusable letter 'A' from the expected set ", function() {
    var input = "A"; // decimal 65
    var output = confusables.utility.getConfusableString(input);
    //var expected = ["Α","А","Ꭺ","ᗅ","Ａ","A"];
    var expected = [0xFF21, 0x0391, 0x0410, 0x13AA, 0x15C5 ];
    var success = false;
    // get decimal value of output
    if (expected.indexOf(output.charCodeAt(0)) > -1) {
        success = true;
    }
    expect(success).toEqual(true);
  });

  it("throws when input is not a string", function() {
    // Thanks to https://ajsblackbelt.wordpress.com/2014/05/18/jasmine-tests-expect-tothrow/comment-page-1/
    // for letting me know to use expect with an anonymous function for this case
    expect(function() {
      confusables.utility.getConfusableString(1);
    }).toThrowError();
    expect(function() {
      confusables.utility.getConfusableString(new Object);
    }).toThrowError();
    expect(function() {
      confusables.utility.getConfusableString("A");
    }).not.toThrowError();
  });

  it("returns a character > 0xFFFF with itself", function() {
    //var c = 0x10300;  // U+10300 OLD ITALIC LETTER A
    // Get a randon code point outside of the BMP
    var c = Math.floor(Math.random() * 0x10FFFF) + 0xFFFF
    var input = String.fromCodePoint(c); 
    var output = confusables.utility.getConfusableString(input);
    expect(input).toEqual(output);
  });

});

describe("Test suite for confusables.js getConfusableCharacters() : ", function() {
  it("returns an array", function() {
    var input = "A";
    var output = confusables.utility.getConfusableCharacters(input);
    var success = false;
    if (typeof output === "object") {
      success = true;
    }
    expect(success).toBe(true);
  });

  // I don't know how to set the text encoding in jasmine and/or phantomjs without a page to load,
  // so I'm passing in the number value and converting it to a character.
  it("returns a multidimensional array", function() {
      // U+29F6 SOLIDUS WITH OVERBAR
      var input = 0x29F6;  
      // U+29F6 returns an array with length 2, the first 
      // element being an another array of length 2
      // characters[266] = [[0x002F, 0x0304],0x29F6 ];
      var output = confusables.utility.getConfusableCharacters(String.fromCharCode(input));
      var success = false;
      if (typeof output === "object" && output.length === 2 && output[0].length === 2) {
          success = true;
      }
      expect(success).toBe(true);
  });

  // it("returns a set of expected confusables", function() {
  //     var input = "A";  
  //     // output should be ['A', 'Ａ', 'Α', 'А', 'Ꭺ', 'ᗅ']
  //     var output = confusables.utility.getConfusableCharacters(input);
  //     expect(output.toEqual(['A', 'Ａ', 'Α', 'А', 'Ꭺ', 'ᗅ']));
  // });

});