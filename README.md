# mapfile-ejs

The module mapfile-ejs allows you to use [Embedded JavaScript (EJS)](http://ejs.co/ "Embedded JavaScript") into [MapServer Mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer Mapfiles").

## Installation

1. Install `Node.js` and `npm` from [https://nodejs.org/](https://nodejs.org/)
2. Install `mapfile-ejs` with `npm install mapfile-ejs --global`

## Getting started

Use the file extension \*.emap for [MapServer Mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer mapfiles") with [EJS](http://ejs.co/ "Embedded JavaScript").
If you watch a directory, all \*.emap files will be rendering to \*.map files.

### Terminal

```plain
Usage: emap [options]

  Options:
    -h, --help                     Output usage information
    -V, --version                  Output the version number
    -d, --directory <string>       Input directory of mapfiles with EJS (*.emap) (default: current directory)
    -i, --inputEncoding <string>   Encoding of input mapfiles with EJS (default: utf8)
    -o, --outputEncoding <string>  Encoding of output mapfiles without EJS (default: utf8)
    -r, --ignoreInitial            Ignore rendering of mapfiles with EJS on initial (default: false)
    -e, --eFiles                   Render all e files like *.exml, *.ecss (default: false)

  Examples:
    Start watching and rendering with default options:
      $ emap

    Start watching and rendering with custom options:
      $ emap -d ./examples -i iso-8859-1 -o iso-8859-1 -r -e
```

### JavaScript

**Render a file:**

```js
import { render } from 'mapfile-ejs';

(async () => {
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
})();
```

**Watch a directory:**

```js
import { watch } from 'mapfile-ejs';

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

**Input (example.emap):**

```js
MAP
<%
  //Loop to create 3 layers
  for(let i = 0; i < 3; i++) {
-%>
  LAYER
    NAME "layer_<%- i %>"
  END
<%
  } //End of loop
-%>
END
```

**Output (example.map):**

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

**How to use require and include:**

```js
<%
// import is available like
const path = await import(`node:path`);
-%>

<%
// include is available (include_file.ejs) like
-%>
<%- await include('include_file', { }); %>
```

## Developer

**Run cli during development:**

```bash
npm run emap -- -d ./examples/watch/dir1
```

**Run examples:**

```bash
node examples/isTemplate/index.js
node examples/render/index.js
node examples/watch/index.js
```

## Changelog

### v3.0.0

* Update dependencies (2023-04-27)
* Switch from `require()`to `import()` (2023-04-27)
* Switch `render()` to `async render()` (2023-04-07)
* Remove api documentation (2023-04-27)
* Remove ESLint configuration file `.eslintrc.js` (2023-04-27)

### v2.0.7

* Update dependencies

### v2.0.6

* Fix npm bug

### v2.0.5

* Change npm publisher

### v2.0.4

* Update dependencies

### v2.0.3

* Update dependencies

### v2.0.2

* Update mistaks in `README.md`

### v2.0.1

* Fix log bugs in the cli tool `emap`
* Addexamples in `README.md`

### v2.0.0

* Add API Documentation `docs/api`
* Add changelog `docs/changelog`
* Add ESLint configuration file `.eslintrc.js`
* Add Visual Studio Code configuration `.vscode/settings.json`
* Restructure code in `src` directory
* Add npm script `npm run cli -d ./examples/watchDir/dir1`
* Update dependencies
* Switch from class `MapfileRenderer` to module with `render()` and `watch()` function
* Add `isTemplate()` function
* Add new examples

## License

[MIT](https://github.com/stadt-bielefeld/mapfile-ejs/blob/master/LICENSE)
