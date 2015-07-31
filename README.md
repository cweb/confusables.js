# jsConfusables
A javascript library for Unicode Confusables

## Dependency
If you want to call the provided `confuse()` function with your input, it requires [String.fromCodePoint](https://github.com/mathiasbynens/String.fromCodePoint) by [Mathias Bynens](https://mathiasbynens.be/).

## Installation
The test page `index.html` is running at [http://lookout.net/test/jsconfusables](http://lookout.net/test/jsconfusables)

In a browser:

```html
<script src="data/confusables.js"></script>
<script src="js/confuse.js"></script>
<script src="js/fromcodepoint.js"></script>
```

Then, call the `confuse()` function and pass in your input:

```js
var output = confuse(input);
```

## Author
[Chris Weber](http://lookout.net/)

## License

jsConfusables is available under the MIT license.