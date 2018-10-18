# mapfile-ejs

The module mapfile-ejs allows you to use [Embedded JavaScript (EJS)](http://ejs.co/ "Embedded JavaScript") into [MapServer Mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer Mapfiles").

## Installation

1. Install `Node.js` and `npm` from  <https://nodejs.org/>
2. Install `mapfile-ejs` with `npm i mapfile-ejs -g`

## Getting started

Use the file extension \*.emap for [MapServer Mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer mapfiles") with [EJS](http://ejs.co/ "Embedded JavaScript").
If you watch a directory, all \*.emap files will be rendering to \*.map files.

### Terminal

```plain
Usage: emap [options]

  Options:
    -h, --help                   Output usage information
    -V, --version                Output the version number
    -d, --directory [type]       Input directory of mapfiles with EJS (*.emap) (default: current directory)
    -i, --inputEncoding [type]   Encoding of input mapfiles with EJS (default: utf8)
    -o, --outputEncoding [type]  Encoding of output mapfiles without EJS (default: utf8)
    -r, --ignoreInitial          Ignore rendering of mapfiles with EJS on initial (default: false)
    -e, --eFiles                 Render all e files like *.exml, *.ecss (default: false)

  Examples:
    Start watching and rendering with default options:
      $ emap

    Start watching and rendering with custom options:
      $ emap -d ./examples -i iso-8859-1 -o iso-8859-1 -r -e
```

### JavaScript

**Render a file:**

```js
const render = require(`mapfile-ejs`).render;

// render file with default options
const r1 = render(
  `${__dirname}/template__utf8.emap`,
  `${__dirname}/template__utf8.map`
);

// render file with custom options
render(
  `${__dirname}/template__iso_8859_1.emap`,
  `${__dirname}/template__iso_8859_1__02.map`,
  { inputEncoding: `ISO-8859-1`, outputEncoding: `ISO-8859-1` }
);
```

**Watch a directory:**

```js
const watchDir = require(`mapfile-ejs`).watch;

// watch a directory with default options
watch(`dir1`);

// watch a directory with custom options
watch(`dir2`, {
  inputEncoding: `utf8`,
  outputEncoding: `utf8`,
  eFiles: false,
  ignoreInitial: false
});
```

More details are available at the [API Documentation](https://stadt-bielefeld.github.io/mapfile-ejs/docs/api/index.html)
and at the [examples directory](https://github.com/stadt-bielefeld/mapfile-ejs/tree/master/examples/)

### Mapfile

Input (example.emap):

```js
MAP

<%
  //Loop to create 3 layers
  for(let i = 0; i < 3; i++) {
%>

LAYER
  NAME "layer_<%- i %>"
END

<%
  } //End of loop
%>

END
```

Output (example.map):

```js
MAP

LAYER
  NAME "layer_0"
END

LAYER
  NAME "layer_1"
END

LAYER
  NAME "layer_2"
END

END
```

## Documentation

* [API Documentation](https://stadt-bielefeld.github.io/mapfile-ejs/docs/api/index.html)
* [Changelog](https://github.com/stadt-bielefeld/mapfile-ejs/tree/master/docs/changelog/index.md)
  
## Developer

**Build API Documentation:**

```bash
npm run build-api-doc
```

**Run cli during development:**

```bash
npm run cli -- -d ./examples/watchDir/dir1
```

**Run examples:**

```bash
node examples\isTemplate\index.js
node examples\render\index.js
node examples\watch\index.js
```

## License

[MIT](https://github.com/stadt-bielefeld/mapfile-ejs/blob/master/LICENSE)