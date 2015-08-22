# confusables.js [![Build Status](https://travis-ci.org/cweb/confusables.js.svg?branch=master)](https://travis-ci.org/cweb/confusables.js)
A javascript module for accessing the Unicode confusables

## Dependency
If you want to call the provided `getConfusableString()` function from an older browser which doesn't support ECMAScript 6's String.fromCodePoint method, then this will require [String.fromCodePoint](https://github.com/mathiasbynens/String.fromCodePoint) by [Mathias Bynens](https://mathiasbynens.be/).

## Background
This module provides the Unicode confusables data in JavaScript, along with methods to access that data.  The Unicode confusables are characters which are visually similar and easily confused with other characters.  More information is available from the Unicode Consortium at http://www.unicode.org/reports/tr36/#visual_spoofing.  

Also known as homoglyphs, lookalikes, and spoofs - these are characters that visually resemble or are indistinguishable from another character. For example the following two characters are visually similar and confusing:

FF21 ; 0041 ; SA # ( Ａ → A ) FULLWIDTH LATIN CAPITAL LETTER A → LATIN CAPITAL LETTER A

Sometimes during penetration testing, we want to bypass profanity filters, spoof URLs, spoof email addresses, or perform other tasks. Being able to generate lookalike strings can be quite useful in these cases, but of course the bad guys will apply the same tactics to bypass antivirus or other security boundaries as well. 

If you require more capability than this javascript provides, then go check out the [Unicode Consortium's utility for generating confusables](http://unicode.org/cldr/utility/confusables.jsp).

Note that generating a full list of all confusable permutations is expensive and often unnecessary, so confusables.js only generates a single permutation from randomly selected characters.

## Installation
The test page `index.html` is running at [http://lookout.net/test/confusablesjs](http://lookout.net/test/confusablesjs)

In a browser:

```html
<script src="js/confusables.data.js"></script>
<script src="js/confusables.js"></script>
<script src="js/fromcodepoint.js"></script>
```

## API
Public methods are available to return confusable data.

### `confusables.utility.getConfusableString()`
The `confusables.utility.getConfusableString()` method accepts a string of one or more characters as input and returns a string of confusable characters.  Since each character of input can have several confusables, a random one is selected from the data set.  This provides a quick and convenient way to select confusables without enumerating the entire set.

```js
var input = "abcDEF123";
var output = confusables.utility.getConfusableString(input); 
// output is "αƄсᎠᎬϜוƧЗ""
```

### `confusables.utility.getConfusableCharacters()`
The `confusables.utility.getConfusableCharacters()` method accepts a single character or code point value (decimal or hex) as input and returns all of it's confusable characters in an array, which could be multidimensional when several characters combine to create a single confusable:

```js
var codePoint = 0x0041;  // or "A" or 65
var output = confusables.utility.getConfusableCharacters(codePoint); 
// output is ['A', 'Ａ', 'Α', 'А', 'Ꭺ', 'ᗅ']
// and could contain arrays of characters as values, e.g.:
// [["C", "'"], "Ƈ" ];
```

## Author
[Chris Weber](http://lookout.net/)

## License

confusables.js is available under the MIT license.
