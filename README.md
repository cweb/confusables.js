# confusables.js
A javascript utility for Unicode Confusables

## Dependency
If you want to call the provided `confuse()` function with your input, it requires [String.fromCodePoint](https://github.com/mathiasbynens/String.fromCodePoint) by [Mathias Bynens](https://mathiasbynens.be/).

## Installation
The test page `index.html` is running at [http://lookout.net/test/confusablesjs](http://lookout.net/test/confusablesjs)

In a browser:

```html
<script src="js/confusables.js"></script>
<script src="js/fromcodepoint.js"></script>
```

Then, call the `confuse()` function and pass in your input:

```js
var output = confuse(input);
```

## Author
[Chris Weber](http://lookout.net/)

## License

confusables.js is available under the MIT license.
