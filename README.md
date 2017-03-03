# Truncator
[![npm version](https://badge.fury.io/js/truncator.svg)](https://badge.fury.io/js/truncator)
[![Build Status](https://travis-ci.org/ktsn/truncator.svg?branch=master)](https://travis-ci.org/ktsn/truncator)

Layout specific text truncator considering line length, content height or character length.

## Installation
You can install truncator from npm.

```sh
$ npm install truncator --save
```

If you are using module loader such as [Rollup](http://rollupjs.org/) or [Webpack](https://webpack.github.io/):

```js
import { truncate } from 'truncator';
```

Also, you can use it from [unpkg](https://unpkg.com):

```html
<!-- Normal build -->
<script src="https://unpkg.com/truncator"></script>
<!-- Minified build -->
<script src="https://unpkg.com/truncator/dist/truncator.min.js"></script>
```

```js
var truncate = Truncator.truncate;
```

## Usage

Just call `truncate` function then the specified text will be truncated.

```js
var truncator = truncate(el, text, options);
```

- `el`: `HTMLElement` that will be input `text`.
- `text`: Truncate target `string`.
- `options`: Truncate options `object`.
  - `line`, `height` or `count`
  - `ellipsis`: Ellipsis symbol. `null` indicates no symbol will be added. default: `'...'`

The returned object has `recalc()` method that retry to truncate the initially given `el` and `text` on the current state. It is useful if you want to adapt resizing the container element.

```js
truncator.recalc();
```

### Example

```js
var el = document.getElementById('wrapper');
var truncator = truncate(el, 'Target text', { line: 3, ellipsis: null });

window.addEventListener('resize', function () {
  truncator.recalc();
});
```

## License

MIT
