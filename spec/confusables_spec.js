describe("Test suite for confusables.js getConfusableString() : ", function() {
  it("returns something that does not equal the input", function() {
    var input = "abcDEF";
    var output = confusables.getConfusableString(input);
    expect(input).not.toEqual(output);
  });

  it("returns a string of equal length", function() {
    var input = "abc123";
    var output = confusables.getConfusableString(input);
    expect(output.length).toEqual(6);
  });

  it("returns a confusable letter 'A' from the expected set ", function() {
    var input = "A"; // decimal 65
    var output = confusables.getConfusableString(input);
    //var expected = ["Α","А","Ꭺ","ᗅ","Ａ","A"];
    var expected = [0xFF21, 0x0391, 0x0410, 0x13AA, 0x15C5 ];
    var success = false;
    // get decimal value of output
    if (expected.indexOf(output.charCodeAt(0)) > -1) {
        success = true;
    }
    expect(success).toEqual(true);
  });
});