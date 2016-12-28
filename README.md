# mapfile-ejs

The module mapfile-ejs allows you to use embedded JavaScript in [MapServer mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer mapfiles") .

It watches and renders [MapServer mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer mapfiles") with including
[EJS templates](http://www.embeddedjs.com/ "<% Embedded JavaScript %>").

## Installation

### 01 NodeJS and NPM

Windows:
Use the installer from <https://nodejs.org/>

Ubuntu / Debian:
```sh
apt-get install nodejs npm
```

### 02 mapfile-ejs

Windows / Ubuntu / Debian
```sh
npm install mapfile-ejs -g
```
## Getting started

Use the file extension \*.emap for [MapServer mapfiles](http://mapserver.org/documentation.html#mapfile "MapServer mapfiles") with including [EJS templates](http://www.embeddedjs.com/ "<% Embedded JavaScript %>").
If you watch a directory, all \*.emap files will be rendering to \*.map files.

### Terminal
```
Options:
    -h, --help                   output usage information
    -V, --version                output the version number
    -d, --directory [type]       input directory with ejs mapfiles (*.emap) (default: current directory)
    -i, --inputEncoding [type]   encoding of input ejs mapfiles (default: utf8)
    -o, --outputEncoding [type]  encoding of output mapfiles (default: utf8)
    -r, --ignoreInitial          Ignore rendering of ejs mapfiles on initial (default: false)

    Examples:
       start watching with default options:
         $ mapfile-ejs

       start watching with custom options:
         $ mapfile-ejs -d ./examples -i iso-8859-1 -o iso-8859-1 -r
```


### JavaScript (Node.js)
```js
let MapfileRenderer = require('mapfile-ejs');

//create renderer
let r1 = new MapfileRenderer();
let r2 = new MapfileRenderer();

//watching and rendering in directory 1
r1.watch('./dirOfEjsMapfiles1');

//watching and rendering in directory 2
r2.watch('./dirOfEjsMapfiles2',{
  inputEncoding: 'utf8',
  outputEncoding: 'utf8',
  ignoreInitial: false
});

//stop watching and rendering after 15 sec
setTimeout(() => {
  r1.close();
  r2.close();
},15000);
```

### Mapfile example with EJS
```js
MAP

<%
  //loop to create 3 layers
  for(let i = 0; i < 3; i++) {
%>

LAYER
  NAME "layer_<%- i %>"
END

<%
  } //end of loop
%>

END

```

## License

MIT
