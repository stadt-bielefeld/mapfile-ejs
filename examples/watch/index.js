`use strict`;

//const watchDir = require(`mapfile-ejs`).watch;
const watch = require(`${__dirname}/../../index.js`).watch;

// watch a directory with default options
watch(`${__dirname}/dir1`);

// watch a directory with custom options
watch(`${__dirname}/dir2`, {
  inputEncoding: `utf8`,
  outputEncoding: `utf8`,
  eFiles: true,
  ignoreInitial: true
});
