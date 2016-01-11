# Truncator
Simple text truncator that truncate by line count, content height or character count.

## Install
Install from npm.

```sh
$ npm install truncator
```

Just put a script element in your html file.

```html
<script src="path/to/truncator.js"></script>
```

You can use module loader such as [Webpack](https://webpack.github.io/) or [Browserify](http://browserify.org/).

```js
var truncate = require('truncator').truncate;
```

## Usage

```js
truncate(el, text, options);
```

- `el`: `HTMLElement` that will be input `text`.
- `text`: Truncate target `string`.
- `options`: Truncate options `object`.
  - `line`, `height` or `count`
  - `ellipsis`: Ellipsis symbol. `null` indicates no symbol will be added. default: `'...'`

### Example

```js
var el = document.getElementById('wrapper');
truncate(el, 'Target text', { line: 3, ellipsis: null });
```

## License
MIT
