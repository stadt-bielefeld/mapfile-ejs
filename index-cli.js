#!/usr/bin/env node

//-- Modules -------------------------------------------------------------------
let program = require('commander'); //CLI support for node.js
let packageJson = require(__dirname + '/package.json'); //Package informations
let MapfileRenderer = require(__dirname + '/index.js'); //MapfileRenderer class
//-- Modules -------------------------------------------------------------------

//MapfileRenderer
let renderer = new MapfileRenderer();

//Set version of cli program
program.version(packageJson.version);

//CLI options
program.option('-d, --directory [type]', 'input directory with ejs mapfiles (*.emap) (default: current directory)');
program.option('-i, --inputEncoding [type]', 'encoding of input ejs mapfiles (default: utf8)');
program.option('-o, --outputEncoding [type]', 'encoding of output mapfiles (default: utf8)');
program.option('-r, --ignoreInitial', 'Ignore rendering of ejs mapfiles on initial (default: false)');

//Examples on help
program.on('--help', function() {
  console.log('  Examples:');
  console.log('');
  console.log('    start watching with default options:');
  console.log('      $ mapfile-ejs ');
  console.log('');
  console.log('    start watching with custom options:');
  console.log('      $ mapfile-ejs -d ./examples -i iso-8859-1 -o iso-8859-1 -r');
  console.log('');
});

//Header
console.log('###################################################');
console.log('## ' + packageJson.name + ' v' + packageJson.version + ' #############################');
console.log('###################################################');

//Parse cli options
program.parse(process.argv);

//Set directory
if (!program.directory) {
  program.directory = '.';
}
console.log('  watching at ' + program.directory);

//Set input encoding
if (!program.inputEncoding) {
  program.inputEncoding = 'utf8';
}
console.log('  input encoding: ' + program.inputEncoding);

//Set output encoding
if (!program.outputEncoding) {
  program.outputEncoding = 'utf8';
}
console.log('  output encoding: ' + program.outputEncoding);

//Set no rendering on start
if(!program.ignoreInitial){
  program.ignoreInitial = false;
}
console.log('  ignore rendering on initial: ' + program.ignoreInitial);

//Footer
console.log('###################################################');
console.log('## stop watching with Ctrl+C ######################');
console.log('###################################################');

//Watch and render
renderer.watch(program.directory, {
  inputEncoding: program.inputEncoding,
  outputEncoding: program.outputEncoding,
  ignoreInitial: program.ignoreInitial
});
